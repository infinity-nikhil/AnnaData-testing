// Target location: backend/src/controllers/institutions.controller.ts
import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { institutions } from "../db/schema.js";
import { generateToken } from "../lib/utils.js";

export const createInstitution = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      type,
      organizationName,
      location,
      capacityValue,
      contactPhone,
      contactName,
      contactEmail,
      metadata,
    } = req.body;

    // email is the identity anchor for this endpoint — without it we have
    // no reliable way to tell a re-registration apart from a new institution
    if (!contactEmail) {
      return res.status(400).json({
        success: false,
        message: "contactEmail is required to register or sign in.",
      });
    }

    // Already registered with this email? Treat this call as a login —
    // return the existing row as-is, ignoring whatever name/type/etc.
    // was submitted this time around.
    const [existingInstitution] = await db
      .select()
      .from(institutions)
      .where(eq(institutions.contactEmail, contactEmail))
      .limit(1);

    if (existingInstitution) {
      const token = generateToken(existingInstitution.id, res);

      return res.status(200).json({
        success: true,
        message: "Welcome back — logged in with existing institution",
        data: existingInstitution,
        token,
      });
    }

    // No match — genuinely new institution, create it
    const [institution] = await db
      .insert(institutions)
      .values({
        type,
        organizationName,
        location,
        capacityValue,
        contactPhone,
        contactName,
        contactEmail,
        metadata,
      })
      .returning();

    const token = generateToken(institution.id, res);

    return res.status(201).json({
      success: true,
      message: "Institution created successfully",
      data: institution,
      token,
    });
  } catch (error) {
    console.error("Error creating institution:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create institution",
    });
  }
};