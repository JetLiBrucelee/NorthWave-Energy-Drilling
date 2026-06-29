import bcrypt from "bcryptjs";
import { db, adminUsersTable, workersTable, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./lib/logger";

export async function seedDatabase() {
  try {
    // Seed admin user
    const existing = await db.select().from(adminUsersTable).where(eq(adminUsersTable.email, "support@northwaveenergy.com"));
    if (existing.length === 0) {
      const passwordHash = await bcrypt.hash("Northwave2026!!", 10);
      await db.insert(adminUsersTable).values({
        email: "support@northwaveenergy.com",
        passwordHash,
      });
      logger.info("Seeded admin user: support@northwaveenergy.com");
    }

    // Seed default site settings
    const defaultSettings = [
      { key: "contactEmail", value: "support@northwaveenergy.com" },
      { key: "address", value: "1200 Offshore Drive, Suite 400, Houston, TX 77002" },
      { key: "phone1", value: "9042224690" },
      { key: "phone2", value: "9048556246" },
      { key: "ceoName", value: "Micah Oakley" },
      { key: "ceoPhotoUrl", value: "" },
    ];
    for (const setting of defaultSettings) {
      await db.insert(siteSettingsTable).values(setting).onConflictDoNothing();
    }

    // Seed workers
    const existingWorkers = await db.select().from(workersTable);
    if (existingWorkers.length === 0) {
      const workers = [
        { name: "Iluna Morrison", phone: "2569142066", role: "Field Technician", sortOrder: 1 },
        { name: "Kendra Pottskay", phone: "5167170888", role: "Dive Supervisor", sortOrder: 2 },
        { name: "Phillip Meier", phone: "6182609751", role: "Drilling Engineer", sortOrder: 3 },
        { name: "Chris Alderman Kinard", phone: "7034365720", role: "Operations Manager", sortOrder: 4 },
        { name: "Bobby Collins", phone: "9708448269", role: "Platform Inspector", sortOrder: 5 },
        { name: "Melissa Goddard", phone: "3109652435", role: "Safety Officer", sortOrder: 6 },
      ];
      await db.insert(workersTable).values(workers);
      logger.info("Seeded 6 workers");
    }

    logger.info("Database seeding complete");
  } catch (err) {
    logger.error({ err }, "Database seeding failed");
  }
}
