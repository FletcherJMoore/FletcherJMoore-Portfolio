import prisma from "@/lib/db";
import { createFunFact, updateFunFact, deleteFunFact } from "../actions";
import { Field, Area, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function FactsAdmin() {
  const rows = await prisma.funFact.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Fun Facts</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Quick one-liners about you on the Personal page.
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((f) => (
          <div key={f.id} className="card p-5">
            <form action={updateFunFact} className="space-y-3">
              <input type="hidden" name="id" value={f.id} />
              <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
                <Area label="Fact" name="text" defaultValue={f.text} rows={2} />
                <Field label="Order" name="order" type="number" defaultValue={f.order} />
              </div>
              <SaveButton />
            </form>
            <form action={deleteFunFact} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={f.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createFunFact} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a fact</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_100px]">
          <Area label="Fact" name="text" rows={2} />
          <Field label="Order" name="order" type="number" defaultValue={rows.length} />
        </div>
        <SaveButton>Add fact</SaveButton>
      </form>
    </div>
  );
}
