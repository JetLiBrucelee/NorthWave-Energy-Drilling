import { Router, type IRouter } from "express";
import { db, workersTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import { CreateWorkerBody, UpdateWorkerBody, UpdateWorkerParams, DeleteWorkerParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/workers", async (_req, res): Promise<void> => {
  const workers = await db.select().from(workersTable).orderBy(asc(workersTable.sortOrder), asc(workersTable.id));
  res.json(workers);
});

router.post("/workers", async (req, res): Promise<void> => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const parsed = CreateWorkerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [worker] = await db.insert(workersTable).values({
    name: parsed.data.name,
    phone: parsed.data.phone,
    role: parsed.data.role ?? null,
    sortOrder: parsed.data.sortOrder ?? 0,
  }).returning();

  res.status(201).json(worker);
});

router.put("/workers/:id", async (req, res): Promise<void> => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const paramsParsed = UpdateWorkerParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const bodyParsed = UpdateWorkerBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const [worker] = await db
    .update(workersTable)
    .set({
      name: bodyParsed.data.name,
      phone: bodyParsed.data.phone,
      role: bodyParsed.data.role ?? null,
      sortOrder: bodyParsed.data.sortOrder ?? 0,
    })
    .where(eq(workersTable.id, paramsParsed.data.id))
    .returning();

  if (!worker) {
    res.status(404).json({ error: "Worker not found" });
    return;
  }

  res.json(worker);
});

router.delete("/workers/:id", async (req, res): Promise<void> => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const paramsParsed = DeleteWorkerParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const [worker] = await db
    .delete(workersTable)
    .where(eq(workersTable.id, paramsParsed.data.id))
    .returning();

  if (!worker) {
    res.status(404).json({ error: "Worker not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
