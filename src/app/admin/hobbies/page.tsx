import prisma from "@/lib/db";
import { createHobby, updateHobby, deleteHobby } from "../actions";
import { Field, Area, SaveButton, DeleteButton } from "@/components/admin/Fields";

export const dynamic = "force-dynamic";

export default async function HobbiesAdmin() {
  const rows = await prisma.hobby.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Hobbies</h1>
      <p className="mt-2 text-[var(--color-muted)]">
        Your interests, shown as cards on the Personal page.
      </p>

      <div className="mt-6 space-y-4">
        {rows.map((h) => (
          <div key={h.id} className="card p-5">
            <form action={updateHobby} className="space-y-3">
              <input type="hidden" name="id" value={h.id} />
              <div className="grid gap-3 sm:grid-cols-[80px_1fr_100px]">
                <Field label="Emoji" name="emoji" defaultValue={h.emoji} />
                <Field label="Title" name="title" defaultValue={h.title} />
                <Field label="Order" name="order" type="number" defaultValue={h.order} />
              </div>
              <Area label="Description" name="description" defaultValue={h.description} rows={2} />
              <SaveButton />
            </form>
            <form action={deleteHobby} className="mt-3 flex justify-end border-t border-[var(--color-border)] pt-3">
              <input type="hidden" name="id" value={h.id} />
              <DeleteButton />
            </form>
          </div>
        ))}
      </div>

      <form action={createHobby} className="card mt-6 space-y-3 border-dashed p-5">
        <h2 className="font-display text-lg font-bold">Add a hobby</h2>
        <div className="grid gap-3 sm:grid-cols-[80px_1fr_100px]">
          <Field label="Emoji" name="emoji" placeholder="🎸" />
          <Field label="Title" name="title" required />
          <Field label="Order" name="order" type="number" defaultValue={rows.length} />
        </div>
        <Area label="Description" name="description" rows={2} />
        <SaveButton>Add hobby</SaveButton>
      </form>
    </div>
  );
}
