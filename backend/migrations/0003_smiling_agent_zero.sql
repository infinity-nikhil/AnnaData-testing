ALTER TABLE "food_protocols" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "food_protocols" ALTER COLUMN "status" SET DEFAULT 'available'::text;--> statement-breakpoint
DROP TYPE "public"."listing_status";--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('available', 'claimed');--> statement-breakpoint
ALTER TABLE "food_protocols" ALTER COLUMN "status" SET DEFAULT 'available'::"public"."listing_status";--> statement-breakpoint
ALTER TABLE "food_protocols" ALTER COLUMN "status" SET DATA TYPE "public"."listing_status" USING "status"::"public"."listing_status";--> statement-breakpoint
ALTER TABLE "food_protocols" DROP COLUMN "distributed_at";