import prisma from "@/lib/db";
import { createContactMethod, updateContactMethod, deleteContactMethod } from "../actions";
import { Field, Select, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

const ICONS = ["mail", "linkedin", "github", "location"];

export default async function ContactAdmin() {
  const rows = await prisma.contactMethod.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Contact Info</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        The ways people can reach you, shown on the Contact page.
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((m) => (
          <div key={m.id} className="card p-5">
            <form action={updateContactMethod} className="space-y-3">
              <input type="hidden" name="id" value={m.id} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Label" name="label" defaultValue={m.label} />
                <Field label="Display value" name="value" defaultValue={m.value} />
              </div>
              <div className="grid gap-3 sm:grid-cols-[2fr_1fr_100px]">
                <Field label="Link (href)" name="href" defaultValue={m.href} placeholder="mailto:… or https://…" />
                <Select label="Icon" name="icon" defaultValue={m.icon} options={ICONS} />
                <Field label="Order" name="order" type="number" defaultValue={m.order} />
              </div>
              <SaveButton />
            </form>
            <form action={deleteContactMethod} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={m.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createContactMethod} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a contact method</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Label" name="label" required placeholder="Email" />
          <Field label="Display value" name="value" placeholder="you@example.com" />
        </div>
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr_100px]">
          <Field label="Link (href)" name="href" placeholder="mailto:… or https://…" />
          <Select label="Icon" name="icon" defaultValue="mail" options={ICONS} />
          <Field label="Order" name="order" type="number" defaultValue={rows.length} />
        </div>
        <SaveButton>Add method</SaveButton>
      </form>
    </div>
  );
}
