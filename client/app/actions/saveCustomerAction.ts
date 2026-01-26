"use server";

import { actionClient } from "@/lib/safe-action";
import { customerInsertSchema, type customerInsertSchemaType} from "@/app/zod-schemas/customer";
import db from "@/app/db";
import { customers } from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { auth } from "@clerk/nextjs/server";

export const saveCustomerAction = actionClient
    .metadata({ actionName: "saveCustomerAction" })
    .inputSchema(customerInsertSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput: customer } : {parsedInput: customerInsertSchemaType}) => {
        const { isAuthenticated, redirectToSignIn } = await auth();
        if (!isAuthenticated) {
            redirectToSignIn();
            return;
        }
        //throwing error on purpose to check error message
        // throw Error('Test error')

        // test database error
        // const query = sql.raw('SELECT * FROM Sara')
        // const newData = await db.execute(query)
        // Extract id and prepare data for insert/update
        const { id, ...data } = customer;

        // Existing customer - update
        if (id && id > 0) {
            await db.update(customers).set({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                address1: data.address1,
                ...(data.address2?.trim() ? { address2: data.address2 } : {}),
                city: data.city,
                zip: data.zip,
                active: data.active,
                ...(data.notes?.trim() ? { notes: data.notes } : {}),
            }).where(eq(customers.id, id)).returning({updatedId: customers.id});
            return { message: `Customer ID# ${id} updated successfully` };
        }

        // New customer - insert
        const [inserted] = await db.insert(customers).values({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            address1: data.address1,
            ...(data.address2?.trim() ? { address2: data.address2 } : {}),
            city: data.city,
            zip: data.zip,
            active: data.active,
            ...(data.notes?.trim() ? { notes: data.notes } : {}),
        }).returning({ id: customers.id });
        
        return { message: `Customer ID# ${inserted.id} created successfully` };
    });
