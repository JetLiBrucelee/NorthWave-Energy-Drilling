import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { PatchContactInquiryParams, PatchContactInquiryBody, DeleteContactInquiryParams } from "@workspace/api-zod";

const router: IRouter = Router();

const requireAdmin = (req: any, res: any, next: any) => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  next();
};

router.get("/admin/contacts", requireAdmin, async (_req, res): Promise<void> => {
  const contacts = await db
    .select()
    .from(contactsTable)
    .orderBy(desc(contactsTable.createdAt));
  res.json(contacts);
});

router.patch("/admin/contacts/:id", requireAdmin, async (req, res): Promise<void> => {
  const paramsParsed = PatchContactInquiryParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const bodyParsed = PatchContactInquiryBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: bodyParsed.error.message });
    return;
  }

  const [contact] = await db
    .update(contactsTable)
    .set({ isRead: bodyParsed.data.isRead })
    .where(eq(contactsTable.id, paramsParsed.data.id))
    .returning();

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.json(contact);
});

router.delete("/admin/contacts/:id", requireAdmin, async (req, res): Promise<void> => {
  const paramsParsed = DeleteContactInquiryParams.safeParse(req.params);
  if (!paramsParsed.success) {
    res.status(400).json({ error: paramsParsed.error.message });
    return;
  }

  const [contact] = await db
    .delete(contactsTable)
    .where(eq(contactsTable.id, paramsParsed.data.id))
    .returning();

  if (!contact) {
    res.status(404).json({ error: "Contact not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
