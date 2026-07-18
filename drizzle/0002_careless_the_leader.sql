ALTER TABLE "categories" RENAME COLUMN "name" TO "label";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "imgSrc" TO "img_src";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "weight" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "weight" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "rating" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "out_of_stock" boolean DEFAULT false;