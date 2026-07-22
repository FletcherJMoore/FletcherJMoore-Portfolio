import type { Metadata } from "next";
import { login } from "../actions";

export const metadata: Metadata = { title: "Admin Login" };
export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5">
      <div className="w-full">
        <h1 className="font-display text-3xl font-bold">
          <span className="text-gradient">Admin</span> access
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Enter your admin password to manage your site content.
        </p>

        <form action={login} className="card mt-6 space-y-4 p-6">
          <input type="hidden" name="from" value={from ?? "/admin"} />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-2)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-violet)]"
            />
          </label>
          {error && (
            <p className="text-sm text-red-400">
              Incorrect password. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
