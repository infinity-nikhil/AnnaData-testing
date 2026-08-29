import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { institutions } from './schema.js';

// Validates the form payload before it hits the database.
// Use this inside handleSubmit to safeParse formData before calling your
// server action / API route.
export const insertInstitutionSchema = createInsertSchema(institutions, {
  organizationName: (schema) => schema.min(2, 'Organization name is required'),
  location: (schema) => schema.min(2, 'Campus / city is required'),
  contactPhone: (schema) =>
    schema.regex(/^\+?[0-9\s-]{7,15}$/, 'Enter a valid phone number'),
  contactEmail: (schema) => schema.email('Enter a valid email').optional(),
  capacityValue: (schema) => schema.min(1, 'Capacity must be greater than 0'),
}).omit({
  id: true,
  isVerified: true,
  verificationStatus: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertInstitutionInput = z.infer<typeof insertInstitutionSchema>;