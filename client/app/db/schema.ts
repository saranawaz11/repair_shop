import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    first_name: varchar().notNull(),
    last_name: varchar().notNull(),
    email: varchar().notNull().unique(),
    phone: varchar().notNull().unique(),
    address1: varchar().notNull(),
    address2: varchar(),
    city: varchar().notNull(),
    zip: varchar({length: 10}).notNull(),
    notes: text(),
    active: boolean().notNull().default(true),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow().$onUpdate(() => new Date())
});
