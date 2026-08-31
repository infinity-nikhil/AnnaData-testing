// Target location: backend/src/controllers/foodProtocol.controller.ts
import { Request, Response } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { foodProtocols, institutions } from "../db/schema.js";

import { handleMail, handleClaimMail } from "../services/mailer.service.js";

// ---------- Kitchen: create a listing ----------

export const createFoodProtocol = async (req: Request, res: Response) => {
  try {
    const {
      dish,
      quantity,
      perishability,
      badgeClass,
      coolingRule,
      segregationAlert,
      safeWindow,
      targetTemp,
      vessel,
    } = req.body;

    // req.institution comes from protectRoute — never trust an institutionId
    // sent in the body, or any kitchen could post as another kitchen.
    const [foodProtocol] = await db
      .insert(foodProtocols)
      .values({
        institutionId: req.institution!.id,
        dish,
        quantity,
        perishability,
        badgeClass,
        coolingRule,
        segregationAlert,
        safeWindow,
        targetTemp,
        vessel,
      })
      .returning();

    // fire-and-forget: don't make the kitchen wait on NGO emails
    handleMail(foodProtocol, req.institution!).catch((err) =>
      console.error("Notify NGOs failed:", err)
    );

    return res.status(201).json({
      success: true,
      message: "Food protocol created successfully",
      data: foodProtocol,
    });
  } catch (error) {
    console.error("Error creating food protocol:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create food protocol",
    });
  }
};

// ---------- NGO: browse available listings ----------

export const getFoodProtocols = async (req: Request, res: Response) => {
  try {
    const listings = await db
      .select({
        id: foodProtocols.id,
        dish: foodProtocols.dish,
        quantity: foodProtocols.quantity,
        perishability: foodProtocols.perishability,
        badgeClass: foodProtocols.badgeClass,
        coolingRule: foodProtocols.coolingRule,
        segregationAlert: foodProtocols.segregationAlert,
        safeWindow: foodProtocols.safeWindow,
        targetTemp: foodProtocols.targetTemp,
        vessel: foodProtocols.vessel,
        status: foodProtocols.status,
        claimedByInstitutionId: foodProtocols.claimedByInstitutionId,
        createdAt: foodProtocols.createdAt,
        kitchenName: institutions.organizationName,
        kitchenLocation: institutions.location,
      })
      .from(foodProtocols)
      .innerJoin(institutions, eq(foodProtocols.institutionId, institutions.id))
      .orderBy(desc(foodProtocols.createdAt));

    return res.status(200).json({ success: true, data: listings });
  } catch (error) {
    console.error("Error fetching food protocols:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch listings" });
  }
};

// ---------- NGO: claim a listing ----------

export const claimFoodProtocol = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ngoId = req.institution!.id;

    // Atomic conditional update — the WHERE status = 'available' is what
    // actually prevents two NGOs from both winning the claim.
    const [claimed] = await db
      .update(foodProtocols)
      .set({
        status: "claimed",
        claimedByInstitutionId: ngoId,
        claimedAt: new Date(),
      })
      .where(and(eq(foodProtocols.id, id), eq(foodProtocols.status, "available")))
      .returning();

    if (!claimed) {
      return res.status(409).json({
        success: false,
        message: "This listing has already been claimed by another NGO.",
      });
    }

    handleClaimMail(claimed, req.institution!).catch((err) =>
      console.error("Claim notification failed:", err)
    );

    return res.status(200).json({
      success: true,
      message: "Food rescue claimed successfully",
      data: claimed,
    });
  } catch (error) {
    console.error("Error claiming food protocol:", error);
    return res.status(500).json({ success: false, message: "Failed to claim listing" });
  }
};