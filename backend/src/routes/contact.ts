import { Router, Request, Response } from 'express';

export const contactRouter = Router();

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  inquiryType: string;
  message: string;
  submittedAt: string;
}

const contactSubmissions: ContactSubmission[] = [];

// POST /api/contact
contactRouter.post('/', (req: Request, res: Response) => {
  const { fullName, email, phone, organization, inquiryType, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: fullName, email, and message are mandatory.',
    });
  }

  const submission: ContactSubmission = {
    id: `CNT-${Date.now().toString().slice(-4)}`,
    fullName,
    email,
    phone: phone || '',
    organization: organization || 'Bhubaneswar Community',
    inquiryType: inquiryType || 'General Inquiry',
    message,
    submittedAt: new Date().toISOString(),
  };

  contactSubmissions.unshift(submission);

  console.log(`📩 [AnnaData Contact Form] Received inquiry from ${fullName} (${email}) - ${inquiryType}`);

  return res.status(201).json({
    success: true,
    message: 'Inquiry registered successfully with Bhubaneswar Dispatch Desk.',
    submissionId: submission.id,
  });
});

// GET /api/contact/list (for administrative review)
contactRouter.get('/list', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: contactSubmissions.length,
    submissions: contactSubmissions,
  });
});
