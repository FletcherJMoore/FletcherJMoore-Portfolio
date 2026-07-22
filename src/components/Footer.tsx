import Link from "next/link";

export default function Footer({
  name,
  github,
  linkedin,
}: {
  name: string;
  github: string;
  linkedin: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink-2)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <p className="text-sm text-[var(--color-muted)]">
          © {year} {name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-5 text-sm">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[var(--color-muted)] hover:text-[var(--color-paper)]"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[var(--color-muted)] hover:text-[var(--color-paper)]"
          >
            LinkedIn
          </a>
          <Link
            href="/contact"
            className="link-underline text-[var(--color-muted)] hover:text-[var(--color-paper)]"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
