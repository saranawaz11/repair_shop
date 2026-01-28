import db from '@/app/db'
import { customers, tickets } from '@/app/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function getOpenTickets() {
    const results = await db.select({
        ticketDate : tickets.createdAt,
        title: tickets.title,
        first_name: customers.first_name,
        last_name: customers.last_name,
        email: customers.email,
        tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(eq(tickets.completed, false));
    return results;
}
