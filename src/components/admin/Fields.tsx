import type { ReactNode } from "react";

const base =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-ink-2)] px-3 py-2 text-sm outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-violet)]";

export function Field({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={base}
      />
    </label>
  );
}

export function Area({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 3,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
        {label}
        {hint && <span className="ml-2 opacity-70">{hint}</span>}
      </span>
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`${base} resize-y`}
      />
    </label>
  );
}

export function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-[var(--color-muted)]">
        {label}
      </span>
      <select name={name} defaultValue={defaultValue} className={base}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SaveButton({ children = "Save" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-gradient-to-r from-[var(--color-violet-bright)] to-[var(--color-magenta)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
    >
      {children}
    </button>
  );
}

export function DeleteButton() {
  return (
    <button
      type="submit"
      className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-muted)] transition-colors hover:border-red-500/60 hover:text-red-400"
    >
      Delete
    </button>
  );
}
