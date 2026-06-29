import { Router, type IRouter } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateSiteSettingsBody } from "@workspace/api-zod";

const router: IRouter = Router();

const SETTING_KEYS = ["contactEmail", "address", "phone1", "phone2", "ceoName", "ceoPhotoUrl"];

router.get("/settings", async (req, res): Promise<void> => {
  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string | null> = {};
  for (const key of SETTING_KEYS) map[key] = null;
  for (const row of rows) map[row.key] = row.value;

  res.json({
    contactEmail: map.contactEmail ?? "support@northwaveenergy.com",
    address: map.address ?? "",
    phone1: map.phone1 ?? "",
    phone2: map.phone2 ?? null,
    ceoName: map.ceoName ?? "",
    ceoPhotoUrl: map.ceoPhotoUrl ?? null,
    updatedAt: new Date().toISOString(),
  });
});

router.put("/settings", async (req, res): Promise<void> => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const parsed = UpdateSiteSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updates = parsed.data;
  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) continue;
    await db
      .insert(siteSettingsTable)
      .values({ key, value: value ?? "" })
      .onConflictDoUpdate({ target: siteSettingsTable.key, set: { value: value ?? "" } });
  }

  const rows = await db.select().from(siteSettingsTable);
  const map: Record<string, string | null> = {};
  for (const k of SETTING_KEYS) map[k] = null;
  for (const row of rows) map[row.key] = row.value;

  res.json({
    contactEmail: map.contactEmail ?? "support@northwaveenergy.com",
    address: map.address ?? "",
    phone1: map.phone1 ?? "",
    phone2: map.phone2 ?? null,
    ceoName: map.ceoName ?? "",
    ceoPhotoUrl: map.ceoPhotoUrl ?? null,
    updatedAt: new Date().toISOString(),
  });
});

export default router;
