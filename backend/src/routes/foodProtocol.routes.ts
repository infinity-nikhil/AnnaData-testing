// Target location: backend/src/routes/foodProtocol.routes.ts
import { Router } from "express";
import { protectRoute, requireType } from "../middleware/auth.middleware.js";
import {
  createFoodProtocol,
  getFoodProtocols,
  claimFoodProtocol,
} from "../controllers/foodProtocol.controller.js";

export const foodProtocolRouter = Router();

// foodProtocol.routes.ts — unchanged from before
foodProtocolRouter.get("/", protectRoute, getFoodProtocols);                                    // GET  /api/food-protocols
foodProtocolRouter.post("/", protectRoute, requireType("kitchen"), createFoodProtocol);          // POST /api/food-protocols
foodProtocolRouter.post("/:id/claim", protectRoute, requireType("ngo"), claimFoodProtocol);      // POST /api/food-protocols/:id/claim