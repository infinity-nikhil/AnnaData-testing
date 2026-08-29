CREATE TYPE "public"."listing_status" AS ENUM('available', 'claimed', 'distributed');--> statement-breakpoint
ALTER TABLE "food_protocols" ADD COLUMN "institution_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD COLUMN "status" "listing_status" DEFAULT 'available' NOT NULL;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD COLUMN "claimed_by_institution_id" uuid;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD COLUMN "claimed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD COLUMN "distributed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD CONSTRAINT "food_protocols_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "food_protocols" ADD CONSTRAINT "food_protocols_claimed_by_institution_id_institutions_id_fk" FOREIGN KEY ("claimed_by_institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;