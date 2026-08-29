import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const telemetryRouter = Router();

// GET /api/telemetry
telemetryRouter.get('/', (_req: Request, res: Response) => {
  res.json(store.telemetry);
});
