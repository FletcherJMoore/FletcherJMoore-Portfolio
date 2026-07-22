import prisma from "@/lib/db";
import { createSkillGroup, updateSkillGroup, deleteSkillGroup } from "../actions";
import { Field, Area, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function SkillsAdmin() {
  const groups = await prisma.skillGroup.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Skills</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Group your skills by category. Each group becomes a card.
      </p>

      <div className="mt-6 space-y-4">
        {groups.map((g) => (
          <div key={g.id} className="card p-5">
            <form action={updateSkillGroup} className="space-y-3">
              <input type="hidden" name="id" value={g.id} />
              <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                <Field label="Category" name="category" defaultValue={g.category} />
                <Field label="Order" name="order" type="number" defaultValue={g.order} />
              </div>
              <Area label="Skills" name="skills" defaultValue={g.skills.join("\n")} rows={4} hint="one per line" />
              <SaveButton />
            </form>
            <form action={deleteSkillGroup} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={g.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createSkillGroup} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a skill group</h2>
        <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
          <Field label="Category" name="category" required placeholder="Languages" />
          <Field label="Order" name="order" type="number" defaultValue={groups.length} />
        </div>
        <Area label="Skills" name="skills" rows={4} hint="one per line" />
        <SaveButton>Add group</SaveButton>
      </form>
    </div>
  );
}
