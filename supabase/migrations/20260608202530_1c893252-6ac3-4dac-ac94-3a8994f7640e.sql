
-- Lock down SECURITY DEFINER funcs
ALTER FUNCTION public.tg_set_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Tighten INSERT policies (was USING true)
DROP POLICY IF EXISTS "anyone creates order" ON public.orders;
CREATE POLICY "anyone creates order" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "anyone inserts events" ON public.cart_events;
CREATE POLICY "anyone inserts events" ON public.cart_events FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());

DROP POLICY IF EXISTS "anyone inserts chat" ON public.chat_logs;
CREATE POLICY "anyone inserts chat" ON public.chat_logs FOR INSERT TO anon, authenticated
  WITH CHECK (user_id IS NULL OR user_id = auth.uid());
