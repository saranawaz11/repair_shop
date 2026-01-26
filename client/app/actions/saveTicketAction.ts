"use server";

import { actionClient } from "@/lib/safe-action";
import { ticketInsertSchema, type ticketInsertSchemaType } from "@/app/zod-schemas/ticket";
import db from "@/app/db";
import { tickets } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { auth } from "@clerk/nextjs/server";

export const saveTicketAction = actionClient
    .metadata({ actionName: "saveTicketAction" })
    .inputSchema(ticketInsertSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({ parsedInput: ticket } : {parsedInput: ticketInsertSchemaType}) => {
        const { isAuthenticated, redirectToSignIn } = await auth();
        if (!isAuthenticated) {
            redirectToSignIn();
            return;
        }

        // Extract id and prepare data for insert/update
        const { id, ...data } = ticket;

        // Existing ticket - update
        if (id && id !== '(New)' && typeof id === 'number' && id > 0) {
            await db.update(tickets).set({
                customerId: data.customerId,
                title: data.title,
                description: data.description,
                completed: data.completed,
                tech: data.tech
            }).where(eq(tickets.id, id));
            return { message: `Ticket ID# ${id} updated successfully` };
        }

        // New ticket - insert
        const [inserted] = await db.insert(tickets).values({
            customerId: data.customerId,
            title: data.title,
            description: data.description,
            tech: data.tech,
        }).returning({ id: tickets.id });
        
        return { message: `Ticket ID# ${inserted.id} created successfully` };
    });
