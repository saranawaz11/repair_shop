ALTER TABLE "tickets" DROP CONSTRAINT "tickets_customerId_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "customer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "customerId";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "updatedAt";