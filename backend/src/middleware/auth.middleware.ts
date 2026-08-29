// Target location: backend/src/middleware/auth.middleware.ts
// ASSUMPTION: cookie name "jwt" and payload key "institutionId" — adjust to
// match your actual generateToken() implementation in lib/utils.js.
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../db/drizzle.js";
import { institutions, type Institution } from "../db/schema.js";

declare global {
  namespace Express {
    interface Request {
      institution?: Institution;
    }
  }
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      institutionId: string;
    };

    const [institution] = await db
      .select()
      .from(institutions)
      .where(eq(institutions.id, decoded.institutionId));

    if (!institution) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - institution not found" });
    }

    req.institution = institution;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
  }
};

// Restricts a route to one institution type, e.g. requireType("kitchen")
export const requireType = (type: "kitchen" | "ngo") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.institution?.type !== type) {
      return res.status(403).json({
        success: false,
        message: `Forbidden - only ${type} accounts can perform this action`,
      });
    }
    next();
  };
};