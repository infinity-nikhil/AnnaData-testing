import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
  jsonb,
  text
} from 'drizzle-orm/pg-core';

// ---------- Enums ----------

// Discriminator between the two registration flows in the modal
export const institutionTypeEnum = pgEnum('institution_type', [
  'kitchen',
  'ngo',
]);

export const verificationStatusEnum = pgEnum('verification_status', [
  'pending',
  'verified',
  'rejected',
]);

// Lifecycle of a single surplus food listing
export const listingStatusEnum = pgEnum('listing_status', [
  'available',
  'claimed',
]);

// ---------- Table ----------

export const institutions = pgTable('institutions', {
  id: uuid('id').defaultRandom().primaryKey(),

  // Determines which portal the user is redirected to after onSuccess()
  type: institutionTypeEnum('type').notNull(),

  // "Kitchen / Mess Name" (kitchen) or "NGO Organization Name" (ngo)
  organizationName: varchar('organization_name', { length: 255 }).notNull(),

  // "Campus / City"
  location: varchar('location', { length: 255 }).notNull(),

  // "Daily Capacity" (meals/day, kitchen) or "Volunteers" (headcount, ngo).
  // Unit is implied by `type` — no need to store it separately unless you
  // expect capacity semantics to diverge further later.
  capacityValue: integer('capacity_value').notNull(),

  // "Contact Phone"
  contactPhone: varchar('contact_phone', { length: 20 }).notNull(),

  // Present in the component's formData but not currently rendered as an
  // input. Nullable for now — add form fields or populate from session auth.
  contactName: varchar('contact_name', { length: 255 }),
  contactEmail: varchar('contact_email', { length: 255 }),

  isVerified: boolean('is_verified').default(false).notNull(),
  verificationStatus: verificationStatusEnum('verification_status')
    .default('pending')
    .notNull(),

  // Room for extras later without a migration: FSSAI license no.,
  // NGO registration no., operating hours, etc.
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Institution = typeof institutions.$inferSelect;
export type NewInstitution = typeof institutions.$inferInsert;

export const foodProtocols = pgTable("food_protocols", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Which kitchen posted this listing — required for display and for the
  // kitchen's own "my listings" view.
  institutionId: uuid("institution_id")
    .notNull()
    .references(() => institutions.id),

  dish: varchar("dish", { length: 255 }).notNull(),

  quantity: varchar("quantity", { length: 100 }).notNull(),

  perishability: varchar("perishability", { length: 255 }).notNull(),

  badgeClass: varchar("badge_class", { length: 255 }).notNull(),

  coolingRule: text("cooling_rule").notNull(),

  segregationAlert: text("segregation_alert").notNull(),

  safeWindow: varchar("safe_window", { length: 100 }).notNull(),

  targetTemp: varchar("target_temp", { length: 100 }).notNull(),

  vessel: varchar("vessel", { length: 255 }).notNull(),

  // ---- Claim / distribute lifecycle ----

  status: listingStatusEnum("status").default("available").notNull(),

  // Which NGO claimed it. Nullable until claimed.
  claimedByInstitutionId: uuid("claimed_by_institution_id").references(
    () => institutions.id
  ),

  claimedAt: timestamp("claimed_at", { withTimezone: true }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type FoodProtocol = typeof foodProtocols.$inferSelect;
export type NewFoodProtocol = typeof foodProtocols.$inferInsert;