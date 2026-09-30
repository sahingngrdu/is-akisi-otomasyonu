export function isAdminEmail(email: string | undefined | null) {
  if (!email) return false;
  const allowlist = (process.env.SUPABASE_ADMIN_EMAILS ?? "")
    .split(/[\s,;]+/)
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return allowlist.length > 0 && allowlist.includes(email.trim().toLowerCase());
}
