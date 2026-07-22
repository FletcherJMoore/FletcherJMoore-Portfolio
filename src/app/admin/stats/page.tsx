import prisma from "@/lib/db";
import { createStat, updateStat, deleteStat } from "../actions";
import { Field, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function StatsAdmin() {
  const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Home Stats</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        The headline numbers on your home page (e.g. &ldquo;5+ years&rdquo;).
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((s) => (
          <div key={s.id} className="card p-5">
            <form action={updateStat} className="space-y-3">
              <input type="hidden" name="id" value={s.id} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Value" name="value" defaultValue={s.value} placeholder="5+" />
                <Field label="Label" name="label" defaultValue={s.label} placeholder="Years experience" />
                <Field label="Order" name="order" type="number" defaultValue={s.order} />
              </div>
              <SaveButton />
            </form>
            <form action={deleteStat} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={s.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createStat} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a stat</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Value" name="value" required placeholder="5+" />
          <Field label="Label" name="label" required placeholder="Years experience" />
          <Field label="Order" name="order" type="number" defaultValue={rows.length} />
        </div>
        <SaveButton>Add stat</SaveButton>
      </form>
    </div>
  );
}
