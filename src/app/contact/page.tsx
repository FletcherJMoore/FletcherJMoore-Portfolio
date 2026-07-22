import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { contactMethods } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

/*
  UPGRADING THE FORM TO SEND SERVER-SIDE (optional):
  The form currently opens the visitor's mail client (zero setup).
  To send messages without leaving the page, the easiest path is
  Formspree — create a form, then in ContactForm.tsx replace the
  mailto with:

    await fetch("https://formspree.io/f/YOUR_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

  For full control, add a Next.js Route Handler at
  src/app/api/contact/route.ts that sends via Resend (needs an API key).
*/

function Icon({ name }: { name: string }) {
  const common = "h-5 w-5";
  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V24h-4V8Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={common}>
          <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7 0-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 5 18 5.3 18 5.3c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={common} stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-7-5.6-7-11a7 7 0 1 1 14 0c0 5.4-7 11-7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
  }
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        intro="Have a question, an opportunity, or just want to say hi? Send me a message below, or reach out through any of these channels."
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 pb-28 md:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-4">
            {contactMethods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card card-hover flex items-center gap-4 p-5"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-surface-2)] text-[var(--color-violet-bright)]">
                  <Icon name={m.icon} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                    {m.label}
                  </p>
                  <p className="truncate font-medium">{m.value}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
