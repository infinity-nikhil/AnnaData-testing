CREATE TABLE "food_protocols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dish" varchar(255) NOT NULL,
	"quantity" varchar(100) NOT NULL,
	"perishability" varchar(255) NOT NULL,
	"badge_class" varchar(255) NOT NULL,
	"cooling_rule" text NOT NULL,
	"segregation_alert" text NOT NULL,
	"safe_window" varchar(100) NOT NULL,
	"target_temp" varchar(100) NOT NULL,
	"vessel" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
