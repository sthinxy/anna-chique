
-- 1. Settings: restrict to admins (server fns use service role, still works)
DROP POLICY IF EXISTS "public reads settings" ON public.settings;
CREATE POLICY "admins read settings" ON public.settings
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.settings FROM anon;

-- 2. user_roles: explicit admin-only write policies
CREATE POLICY "admins insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admins update roles" ON public.user_roles
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "admins delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. Revoke EXECUTE on SECURITY DEFINER trigger/internal functions from API roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- keep EXECUTE for authenticated since has_role is used in RLS policies
