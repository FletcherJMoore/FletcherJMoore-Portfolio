"use client";

import { useState } from "react";
import { site } from "@/lib/data";

/*
  This form opens the visitor's email client with a pre-filled message
  addressed to you — it works with zero backend setup.

  Want messages to send without leaving the page? Swap the handleSubmit
  body for a fetch() to a service like Formspree, or a Next.js API route
  backed by Resend. See /src/app/contact/page.tsx notes.
*/

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink-2)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-violet)]";

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update}
            placeholder="Jane Doe"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={update}
            placeholder="jane@example.com"
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={update}
          placeholder="Tell me a bit about what's on your mind…"
          className={`${field} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
      >
        Send message
      </button>
      {sent && (
        <p className="text-center text-sm text-[var(--color-lime)]">
          Your email app should have opened with the message ready to send. If
          not, email me directly at {site.email}.
        </p>
      )}
    </form>
  );
}
