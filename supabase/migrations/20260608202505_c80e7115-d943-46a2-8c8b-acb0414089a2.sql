
-- =========================================
-- ANNA CHIQUE — Schema completo
-- =========================================

-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "own profile upsert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Trigger: criar profile + role customer automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT DO NOTHING;

  -- Bootstrap admin: se email = acadmin@annachique.com, dá role admin
  IF NEW.email = 'acadmin@annachique.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated at helper
CREATE OR REPLACE FUNCTION public.tg_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'vestido', -- vestido | conjunto
  fabric TEXT,
  colors TEXT[] NOT NULL DEFAULT '{}',
  price NUMERIC(10,2) NOT NULL DEFAULT 25.00,
  image_url TEXT,
  is_hit BOOLEAN NOT NULL DEFAULT false,
  is_bestseller BOOLEAN NOT NULL DEFAULT false,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active products" ON public.products FOR SELECT TO anon, authenticated
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin writes products" ON public.products FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_city TEXT,
  delivery_method TEXT NOT NULL DEFAULT 'transportadora',
  items JSONB NOT NULL DEFAULT '[]',
  total_qty INT NOT NULL DEFAULT 0,
  items_total NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'separando',
  whatsapp_clicked BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone creates order" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "user reads own orders" ON public.orders FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin updates orders" ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Reviews
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT,
  stars INT NOT NULL DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads active reviews" ON public.reviews FOR SELECT TO anon, authenticated
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admin writes reviews" ON public.reviews FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Settings (singleton)
CREATE TABLE public.settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  store_name TEXT NOT NULL DEFAULT 'Anna Chique',
  whatsapp TEXT NOT NULL DEFAULT '558594374066',
  instagram TEXT NOT NULL DEFAULT 'https://www.instagram.com/annachique_/',
  email TEXT NOT NULL DEFAULT 'annachiqueloja@gmail.com',
  location TEXT NOT NULL DEFAULT 'Rua José Avelino, Fortaleza - CE',
  unit_price NUMERIC(10,2) NOT NULL DEFAULT 25.00,
  min_pieces INT NOT NULL DEFAULT 12,
  color_choice_min INT NOT NULL DEFAULT 20,
  shipping_fee NUMERIC(10,2) NOT NULL DEFAULT 10.00,
  pix_key TEXT NOT NULL DEFAULT 'annachiqueloja@gmail.com',
  pix_code TEXT NOT NULL DEFAULT '00020126850014BR.GOV.BCB.PIX0124annachiqueloja@gmail.com0235Altere o valor conforme seu pedido!5204000053039865802BR592559.326.204 ANA CLEA DE SO6009SAO PAULO62140510rYCnLy2PCp63042450',
  nubank_link TEXT NOT NULL DEFAULT 'https://nubank.com.br/cobrar/biyxq0/6a2718e8-5fed-4746-9e30-1a12a1d670bf',
  hero_title TEXT NOT NULL DEFAULT 'Roupas femininas no atacado para revender',
  hero_subtitle TEXT NOT NULL DEFAULT 'Vestidos e conjuntos por R$25 cada, a partir de 12 peças.',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT UPDATE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public reads settings" ON public.settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admin updates settings" ON public.settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- Cart events (abandoned cart tracking)
CREATE TABLE public.cart_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.cart_events TO anon, authenticated;
GRANT SELECT ON public.cart_events TO authenticated;
GRANT ALL ON public.cart_events TO service_role;
ALTER TABLE public.cart_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone inserts events" ON public.cart_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin reads events" ON public.cart_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Chat logs
CREATE TABLE public.chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.chat_logs TO anon, authenticated;
GRANT SELECT ON public.chat_logs TO authenticated;
GRANT ALL ON public.chat_logs TO service_role;
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone inserts chat" ON public.chat_logs FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin reads chat" ON public.chat_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
