import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { db, siteSettingsTable, contactsTable } from "@workspace/db";
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

  // Always save to DB first so the message is never lost
  try {
    await db.insert(contactsTable).values({ name, email, subject, message });
  } catch (dbErr) {
    req.log.error({ dbErr }, "Failed to save contact to database");
  }

  try {
    await resend.emails.send({
      from: "NorthWave Energy <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `[NorthWave Contact] ${subject}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NorthWave Energy Contact</title>
</head>
<body style="margin:0;padding:0;background-color:#e8edf5;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e8edf5;">
    <tr>
      <td align="center" style="padding:36px 16px 48px;">

        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;border-radius:14px;overflow:hidden;box-shadow:0 12px 48px rgba(5,15,40,0.35);">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="background-color:#050d1a;padding:30px 40px 0;">
              <!-- Wordmark -->
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:0.1em;line-height:1;">
                <span style="color:#ffffff;">NORTH</span><span style="color:#3474f4;">WAVE</span>
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:0.28em;color:rgba(255,255,255,0.38);text-transform:uppercase;margin-top:5px;">
                Energy Drilling
              </div>
              <!-- Blue accent rule -->
              <div style="height:2px;background:linear-gradient(90deg,#3474f4 0%,rgba(52,116,244,0.15) 75%,transparent 100%);margin-top:24px;"></div>
            </td>
          </tr>

          <!-- ═══ HERO BAND ═══ -->
          <tr>
            <td style="background:linear-gradient(160deg,#071224 0%,#0b1e3d 60%,#091929 100%);padding:28px 40px 30px;border-bottom:1px solid rgba(52,116,244,0.18);">
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#3474f4;margin-bottom:10px;">
                New Inquiry Received
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;margin-bottom:8px;">
                Incoming Transmission from the Field
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6;">
                A visitor submitted a contact request via your NorthWave secure web form. Details are below.
              </div>
            </td>
          </tr>

          <!-- ═══ BODY ═══ -->
          <tr>
            <td style="background-color:#f8fafc;padding:36px 40px 32px;">

              <!-- Field grid -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:10px;overflow:hidden;border:1px solid #dde3ed;margin-bottom:28px;">
                <tr>
                  <td style="padding:13px 18px;background-color:#f0f4f9;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7a8fa6;width:90px;border-bottom:1px solid #dde3ed;vertical-align:middle;">From</td>
                  <td style="padding:13px 18px;background-color:#ffffff;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#0f172a;border-bottom:1px solid #dde3ed;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;background-color:#f0f4f9;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7a8fa6;border-bottom:1px solid #dde3ed;vertical-align:middle;">Email</td>
                  <td style="padding:13px 18px;background-color:#ffffff;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;border-bottom:1px solid #dde3ed;"><a href="mailto:${email}" style="color:#3474f4;text-decoration:none;font-weight:500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:13px 18px;background-color:#f0f4f9;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#7a8fa6;vertical-align:middle;">Subject</td>
                  <td style="padding:13px 18px;background-color:#ffffff;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#0f172a;">${subject}</td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="background:#ffffff;border:1px solid #dde3ed;border-left:4px solid #3474f4;border-radius:10px;padding:22px 22px 22px 24px;margin-bottom:30px;">
                <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;color:#7a8fa6;margin-bottom:12px;">Message</div>
                <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#1e293b;line-height:1.8;white-space:pre-wrap;">${message}</div>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:7px;background-color:#3474f4;box-shadow:0 4px 14px rgba(52,116,244,0.35);">
                    <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject)}" style="display:inline-block;padding:13px 28px;font-family:'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.03em;">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background-color:#050d1a;padding:24px 40px;border-top:1px solid rgba(52,116,244,0.18);">
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,0.75);margin-bottom:4px;">
                NorthWave Energy Drilling
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:16px;">
                1400 Offshore Blvd, Suite 800 &nbsp;|&nbsp; Houston, TX 77002
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:16px;"></div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.22);line-height:1.6;">
                This inquiry was submitted via the NorthWave Energy Drilling secure contact form. Do not reply to this automated message directly — use the reply button above to respond to the sender.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    res.json({ message: "Your message has been sent successfully. We will get back to you shortly." });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

export default router;
