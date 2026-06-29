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

  const { name, email, phone, address, subject, message } = parsed.data;

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
    await db.insert(contactsTable).values({ name, email, phone: phone || null, address: address || null, subject, message });
  } catch (dbErr) {
    req.log.error({ dbErr }, "Failed to save contact to database");
  }

  const phoneRow = phone ? `
                <tr>
                  <td style="padding:12px 18px;background-color:#0d1a2e;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);width:90px;border-bottom:1px solid rgba(52,116,244,0.1);vertical-align:top;">Phone</td>
                  <td style="padding:12px 18px;background-color:#0b1728;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);border-bottom:1px solid rgba(52,116,244,0.1);">${phone}</td>
                </tr>` : "";

  const addressRow = address ? `
                <tr>
                  <td style="padding:12px 18px;background-color:#0d1a2e;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);width:90px;border-bottom:1px solid rgba(52,116,244,0.1);vertical-align:top;">Company</td>
                  <td style="padding:12px 18px;background-color:#0b1728;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);border-bottom:1px solid rgba(52,116,244,0.1);">${address}</td>
                </tr>` : "";

  try {
    await resend.emails.send({
      from: "NorthWave Energy <support@northwaveenergy.com>",
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
<body style="margin:0;padding:0;background-color:#07101e;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#07101e;">
    <tr>
      <td align="center" style="padding:36px 16px 48px;">

        <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 24px 80px rgba(0,0,0,0.7);border:1px solid rgba(52,116,244,0.2);">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#050c18;padding:28px 36px 22px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;width:46px;">
                    <svg width="36" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 2 L36 36 L4 36 Z" stroke="#ffffff" stroke-width="2.2" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
                      <line x1="13.5" y1="16" x2="26.5" y2="16" stroke="#3474f4" stroke-width="1.8" stroke-linecap="round"/>
                      <line x1="9" y1="26" x2="31" y2="26" stroke="#3474f4" stroke-width="1.8" stroke-linecap="round"/>
                      <line x1="17" y1="5" x2="23" y2="5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                      <line x1="2" y1="36" x2="38" y2="36" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
                      <path d="M2 40 Q8.5 36.5 14 40 Q19.5 43.5 26 40 Q31.5 36.5 38 40" stroke="#3474f4" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                    </svg>
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;">
                    <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:22px;font-weight:800;letter-spacing:0.08em;line-height:1;">
                      <span style="color:#ffffff;">NORTH</span><span style="color:#3474f4;">WAVE</span>
                    </div>
                    <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:0.3em;color:rgba(255,255,255,0.35);text-transform:uppercase;margin-top:3px;">
                      ENERGY DRILLING
                    </div>
                  </td>
                </tr>
              </table>
              <div style="height:1px;background:linear-gradient(90deg,#3474f4 0%,rgba(52,116,244,0.2) 60%,transparent 100%);margin-top:22px;"></div>
            </td>
          </tr>

          <!-- OFFSHORE IMAGE BANNER -->
          <tr>
            <td style="padding:0;line-height:0;font-size:0;">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=620&h=200&fit=crop&q=85" alt="NorthWave offshore operations" width="620" style="display:block;width:100%;height:200px;object-fit:cover;" />
            </td>
          </tr>

          <!-- HERO BAND -->
          <tr>
            <td style="background:linear-gradient(160deg,#071224 0%,#0c1e3a 60%,#091929 100%);padding:26px 36px 24px;border-bottom:1px solid rgba(52,116,244,0.15);">
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#3474f4;margin-bottom:9px;">
                NEW INQUIRY
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:21px;font-weight:700;color:#ffffff;line-height:1.3;margin-bottom:7px;">
                Incoming Transmission
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.42);line-height:1.6;">
                A visitor submitted a contact request via your NorthWave secure web form. Details are below.
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#0b1728;padding:32px 36px 28px;">

              <!-- Field table -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:10px;overflow:hidden;border:1px solid rgba(52,116,244,0.12);margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 18px;background-color:#0d1a2e;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);width:90px;border-bottom:1px solid rgba(52,116,244,0.1);vertical-align:top;">From</td>
                  <td style="padding:12px 18px;background-color:#0b1728;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);border-bottom:1px solid rgba(52,116,244,0.1);">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 18px;background-color:#0d1a2e;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);width:90px;border-bottom:1px solid rgba(52,116,244,0.1);vertical-align:top;">Email</td>
                  <td style="padding:12px 18px;background-color:#0b1728;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;border-bottom:1px solid rgba(52,116,244,0.1);"><a href="mailto:${email}" style="color:#3474f4;text-decoration:none;font-weight:500;">${email}</a></td>
                </tr>
                ${phoneRow}
                ${addressRow}
                <tr>
                  <td style="padding:12px 18px;background-color:#0d1a2e;font-family:'Segoe UI',Arial,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.35);vertical-align:top;">Subject</td>
                  <td style="padding:12px 18px;background-color:#0b1728;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);">${subject}</td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="background-color:#0d1a2e;border:1px solid rgba(52,116,244,0.12);border-left:4px solid #3474f4;border-radius:10px;padding:20px 20px 20px 22px;margin-bottom:28px;">
                <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:rgba(255,255,255,0.35);margin-bottom:12px;">Message</div>
                <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.82);line-height:1.8;white-space:pre-wrap;">${message}</div>
              </div>

              <!-- Reply CTA -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px;background-color:#3474f4;box-shadow:0 4px 18px rgba(52,116,244,0.45);">
                    <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject)}" style="display:inline-block;padding:13px 28px;font-family:'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:0.03em;">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#050c18;padding:22px 36px;border-top:1px solid rgba(52,116,244,0.15);">
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);margin-bottom:3px;">
                NorthWave Energy Drilling
              </div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.3);margin-bottom:14px;">
                1400 Offshore Blvd, Suite 800 &nbsp;|&nbsp; Houston, TX 77002
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:14px;"></div>
              <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.2);line-height:1.6;">
                This inquiry was submitted via the NorthWave Energy Drilling secure contact form. Use the reply button above to respond directly to the sender.
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
