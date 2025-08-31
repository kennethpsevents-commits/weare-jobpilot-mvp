export function checkAdminToken(token: string | null | undefined): boolean {
  const expected = process.env.ADMIN_DASH_TOKEN?.trim();
  if (!expected) return false;
  return token === expected;
}
