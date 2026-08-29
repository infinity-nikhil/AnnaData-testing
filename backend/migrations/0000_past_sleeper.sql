CREATE TYPE "public"."institution_type" AS ENUM('kitchen', 'ngo');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'verified', 'rejected');--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "institution_type" NOT NULL,
	"organization_name" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"capacity_value" integer NOT NULL,
	"contact_phone" varchar(20) NOT NULL,
	"contact_name" varchar(255),
	"contact_email" varchar(255),
	"is_verified" boolean DEFAULT false NOT NULL,
	"verification_status" "verification_status" DEFAULT 'pending' NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
