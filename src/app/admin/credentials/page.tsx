import prisma from "@/lib/db";
import { createCredential, updateCredential, deleteCredential } from "../actions";
import { Field, Select, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

const TYPES = ["education", "certification"];

export default async function CredentialsAdmin() {
  const rows = await prisma.credential.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">
        Education &amp; Certifications
      </h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Degrees and professional certifications.
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((c) => (
          <div key={c.id} className="card p-5">
            <form action={updateCredential} className="space-y-3">
              <input type="hidden" name="id" value={c.id} />
              <Field label="Title" name="title" defaultValue={c.title} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Issuer / School" name="issuer" defaultValue={c.issuer} />
                <Field label="Year" name="year" defaultValue={c.year} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Select label="Type" name="type" defaultValue={c.type} options={TYPES} />
                <Field label="Order" name="order" type="number" defaultValue={c.order} />
              </div>
              <SaveButton />
            </form>
            <form action={deleteCredential} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={c.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createCredential} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a credential</h2>
        <Field label="Title" name="title" required />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Issuer / School" name="issuer" />
          <Field label="Year" name="year" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="Type" name="type" defaultValue="certification" options={TYPES} />
          <Field label="Order" name="order" type="number" defaultValue={rows.length} />
        </div>
        <SaveButton>Add credential</SaveButton>
      </form>
    </div>
  );
}
