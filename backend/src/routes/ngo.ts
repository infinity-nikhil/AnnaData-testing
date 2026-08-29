import { Router, Request, Response } from 'express';
import { store } from '../data/store.js';

export const ngoRouter = Router();

// GET /api/ngo/feed
ngoRouter.get('/feed', (_req: Request, res: Response) => {
  res.json(store.ngoFeed);
});

// POST /api/ngo/claim/:id
ngoRouter.post('/claim/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const item = store.ngoFeed.find((d) => d.id === id);

  if (!item) {
    res.status(404).json({ error: 'Donation card not found' });
    return;
  }

  item.status = 'CLAIMED';
  item.timeRemainingText = 'CLAIMED • Dispatch Active';
  item.claimedBy = 'Asha Kiran Rescue Team';
  item.claimedAt = new Date().toISOString();

  res.json({
    success: true,
    message: `Donation ${id} claimed successfully`,
    donation: item,
  });
});
