import { Router, type IRouter } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { email, password } = parsed.data;
  const [admin] = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, email));

  if (!admin) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  (req.session as any).adminId = admin.id;
  (req.session as any).adminEmail = admin.email;

  res.json({ message: "Login successful", admin: { email: admin.email } });
});

router.post("/auth/logout", (req, res): void => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

router.get("/auth/me", (req, res): void => {
  const session = req.session as any;
  if (!session.adminId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ authenticated: true, email: session.adminEmail });
});

export default router;
