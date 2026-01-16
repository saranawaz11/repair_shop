import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tickets } from "../db/schema";
import { z } from "zod/v4";


export const ticketInsertSchema = createInsertSchema(tickets, {
    id: z.union([z.number(), z.literal('New')]),
    title: (schema) => schema.min(1, 'Title is required'),
    description: (schema) => schema.min(1, 'Description is reqquired'),
    tech: (schema) =>
        schema.refine(
            (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
            { message: 'Invalid email address' }
        ),

});
export const ticketSelectSchema = createSelectSchema(tickets);
export type ticketInsertSchemaType = z.infer<typeof ticketInsertSchema>
export type ticketSelectSchemaType = z.infer<typeof ticketSelectSchema>