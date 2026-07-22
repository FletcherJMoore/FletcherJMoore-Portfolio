import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = () =>
  new TextEncoder().encode(
    process.env.AUTH_SECRET || "dev-insecure-secret-change-me"
  );

// Next.js 16 renamed "middleware" to "proxy" — same functionality.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page must stay public, otherwise you can never sign in.
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  let ok = false;
  if (token) {
    try {
      await jwtVerify(token, secret());
      ok = true;
    } catch {
      ok = false;
    }
  }

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
