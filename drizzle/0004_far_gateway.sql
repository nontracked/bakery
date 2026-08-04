CREATE TABLE "discount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promocode" text NOT NULL,
	"discount_percent" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "discount_promocode_unique" UNIQUE("promocode")
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "applied_promocode" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "discount_percent" integer DEFAULT 0;