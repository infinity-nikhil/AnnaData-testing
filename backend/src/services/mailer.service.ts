import nodemailer from "nodemailer";
import { google } from "googleapis";
import { eq, and, isNotNull } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { institutions } from "../db/schema.js";
import type { FoodProtocol, Institution } from "../db/schema.js";

// ---- plain Gmail sender, lifted out of the Agent tool, no LLM involved ----
async function sendGmail({ toMail, subject, body }: { toMail: string; subject: string; body: string }) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_EMAIL } = process.env;

  let accessToken: string | null | undefined;

  try {
    const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    const tokenResponse = await oauth2Client.getAccessToken();
    accessToken = tokenResponse.token;
  } catch (err) {
    console.error(`[mailer] Failed to refresh OAuth access token for ${toMail}:`, err);
    throw err;
  }

  const transportOptions = {
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: GOOGLE_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken ?? undefined,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  try {
    const transporter = nodemailer.createTransport(transportOptions);
    const info = await transporter.sendMail({ from: GOOGLE_EMAIL, to: toMail, subject, text: body });
    console.log(`[mailer] Sent to ${toMail} — messageId: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`[mailer] Failed to send mail to ${toMail}:`, err);
    throw err;
  }
}

function buildEmail(foodProtocol: FoodProtocol, kitchen: Institution) {
  const subject = `New surplus food available: ${foodProtocol.dish}`;
  const body = `
A new food listing has just been posted on AnnaData.

Kitchen: ${kitchen.organizationName} (${kitchen.location})
Dish: ${foodProtocol.dish}
Quantity: ${foodProtocol.quantity}
Perishability: ${foodProtocol.perishability}
Safe window: ${foodProtocol.safeWindow}
Storage: ${foodProtocol.targetTemp}, ${foodProtocol.vessel}
Segregation note: ${foodProtocol.segregationAlert}

Log in to AnnaData to claim this listing before it's gone.
`.trim();

  return { subject, body };
}

export async function handleMail(foodProtocol: FoodProtocol, kitchen: Institution) {
  const ngos = await db
    .select({ id: institutions.id, contactEmail: institutions.contactEmail })
    .from(institutions)
    .where(and(eq(institutions.type, "ngo"), isNotNull(institutions.contactEmail)));

  const { subject, body } = buildEmail(foodProtocol, kitchen);

  const results = await Promise.allSettled(
    ngos.map((ngo) => sendGmail({ toMail: ngo.contactEmail as string, subject, body }))
  );

  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`Failed to notify NGO ${ngos[i].id}:`, r.reason);
  });
}

function buildClaimEmail(foodProtocol: FoodProtocol, kitchen: Institution) {
  const subject = `You claimed: ${foodProtocol.dish} — kitchen contact details`;
  const body = `
You've successfully claimed this listing on AnnaData.

Dish: ${foodProtocol.dish}
Quantity: ${foodProtocol.quantity}
Safe window: ${foodProtocol.safeWindow}

Kitchen contact details for pickup coordination:
Name: ${kitchen.organizationName}
Location: ${kitchen.location}
Phone: ${kitchen.contactPhone}
Email: ${kitchen.contactEmail ?? "Not provided"}

Please reach out to arrange pickup within the safe window above.
`.trim();

  return { subject, body };
}

export async function handleClaimMail(foodProtocol: FoodProtocol, ngo: Institution) {
  if (!ngo.contactEmail) {
    console.error(`[mailer] NGO ${ngo.id} has no contactEmail — skipping claim notification`);
    return;
  }

  try {
    const [kitchen] = await db
      .select()
      .from(institutions)
      .where(eq(institutions.id, foodProtocol.institutionId));

    if (!kitchen) {
      console.error(`[mailer] Kitchen ${foodProtocol.institutionId} not found for listing ${foodProtocol.id}`);
      return;
    }

    const { subject, body } = buildClaimEmail(foodProtocol, kitchen);
    await sendGmail({ toMail: ngo.contactEmail, subject, body });
    console.log(`[mailer] Claim notification sent to ${ngo.contactEmail}`);
  } catch (err) {
    console.error(`[mailer] Failed to send claim notification for listing ${foodProtocol.id}:`, err);
  }
}