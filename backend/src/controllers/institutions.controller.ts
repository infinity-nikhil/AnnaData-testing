import { Request, Response } from "express";
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
      token: token,
    });
  } catch (error) {
    console.error("Error creating institution:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create institution",
    });
  }
};