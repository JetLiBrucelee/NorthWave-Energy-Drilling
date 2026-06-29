import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { db, siteSettingsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  // Get contact email from settings
  const rows = await db.select().from(siteSettingsTable);
  const emailSetting = rows.find(r => r.key === "contactEmail");
  const toEmail = emailSetting?.value ?? "support@northwaveenergy.com";

  if (!process.env.RESEND_API_KEY) {
    req.log.error("RESEND_API_KEY not configured");
    res.status(500).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "NorthWave Energy <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `[NorthWave Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151; width: 100px;">From:</td>
              <td style="padding: 8px; color: #111827;">${name}</td>
            </tr>
            <tr style="background: #f9fafb;">
              <td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 8px; color: #111827;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #374151;">Subject:</td>
              <td style="padding: 8px; color: #111827;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9fafb; border-left: 4px solid #0ea5e9; border-radius: 4px;">
            <p style="font-weight: bold; color: #374151; margin: 0 0 8px;">Message:</p>
            <p style="color: #111827; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            This message was sent via the NorthWave Energy Drilling contact form.
          </p>
        </div>
      `,
    });

    res.json({ message: "Your message has been sent successfully. We will get back to you shortly." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
