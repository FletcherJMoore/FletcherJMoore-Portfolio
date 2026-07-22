import { auth } from "@/auth";

// Next.js 16 renamed "middleware" to "proxy". We wrap Auth.js's `auth` so the
// session is available on the request, then gate the /admin area.
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // The login page must stay public, otherwise you can never sign in.
  if (pathname === "/admin/login") return;

  const session = req.auth as { isAdmin?: boolean } | null;
  if (!session?.isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
