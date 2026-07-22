import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/data";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="The one-pager"
        title="Resume"
        intro="Here's my most up-to-date resume. Preview it below, or download the PDF to keep a copy."
      />

      <div className="mx-auto max-w-6xl px-5 pb-28">
        <Reveal>
          <div className="mb-6 flex flex-wrap gap-3">
            <a
              href={site.resumeUrl}
              download
              className="rounded-full bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              ↓ Download PDF
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold transition-colors hover:border-[var(--color-violet)]"
            >
              Open in new tab ↗
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card overflow-hidden p-2">
            <object
              data={site.resumeUrl}
              type="application/pdf"
              className="h-[80vh] min-h-[560px] w-full rounded-xl"
            >
              {/* Fallback for browsers that can't inline-render PDFs */}
              <div className="grid place-items-center gap-4 p-16 text-center">
                <span className="text-5xl">📄</span>
                <p className="text-[var(--color-muted)]">
                  Your browser can&apos;t preview PDFs inline.
                </p>
                <a
                  href={site.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--color-violet)] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Open the resume
                </a>
              </div>
            </object>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
            Replace{" "}
            <code className="rounded bg-[var(--color-surface-2)] px-1.5 py-0.5 text-xs">
              public/resume.pdf
            </code>{" "}
            with your own file to update this page.
          </p>
        </Reveal>
      </div>
    </>
  );
}
