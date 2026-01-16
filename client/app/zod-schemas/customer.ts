import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { customers } from '../db/schema';
import { z } from 'zod/v4';

export const customerInsertSchema = createInsertSchema(customers, {
    first_name: (schema) => schema.min(1, { message: 'First name is required' }),
    last_name: (schema) => schema.min(1, { message: 'Last name is required' }),
    address1: (schema) => schema.min(1, { message: 'Address is required' }),
    city: (schema) => schema.min(1, { message: 'City is required' }),
    email: (schema) => schema.refine(
        (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        { message: 'Invalid email address' }
    ),
    zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code'),
    phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, 'Invalid number format. use XXX-XXX-XXXX')
});

export const customerSelectSchema = createSelectSchema(customers);
export type customerInsertSchemaType = z.infer<typeof customerInsertSchema>;
export type customerSelectSchemaType = z.infer<typeof customerSelectSchema>;
