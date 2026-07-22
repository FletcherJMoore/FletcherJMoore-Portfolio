import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Emails allowed into the admin panel. Anyone else is rejected even after a
 * successful Google sign-in. Override with the ADMIN_EMAILS env var
 * (comma-separated) if you ever need to add accounts.
 */
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "fletcherjmoore14@gmail.com")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isAllowed(email?: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Railway isn't Vercel, so trust the deployment host for callback URLs.
  trustHost: true,
  providers: [Google],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    // Only let allowed emails complete sign-in.
    async signIn({ profile }) {
      return isAllowed(profile?.email);
    },
    // Belt-and-suspenders: reject tokens whose email isn't allowed.
    async jwt({ token }) {
      token.isAdmin = isAllowed(token.email);
      return token;
    },
    async session({ session, token }) {
      (session as { isAdmin?: boolean }).isAdmin = Boolean(
        (token as { isAdmin?: boolean }).isAdmin
      );
      return session;
    },
  },
});

/** True when the current request is an authenticated, allowed admin. */
export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return isAllowed(session?.user?.email);
}
