CREATE TABLE "tickets" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerId" integer NOT NULL,
	"title" varchar NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false NOT NULL,
	"tech" varchar DEFAULT 'unassigned' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;