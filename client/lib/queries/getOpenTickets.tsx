import db from '@/app/db'
import { customers, tickets } from '@/app/db/schema'
import { eq, asc } from 'drizzle-orm'
import React from 'react'

export default async function getOpenTickets() {
    const results = await db.select({
        id: tickets.id,
        ticketDate : tickets.createdAt,
        title: tickets.title,
        first_name: customers.first_name,
        last_name: customers.last_name,
        email: customers.email,
        tech: tickets.tech,
        completed: tickets.completed
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(eq(tickets.completed, false))
        .orderBy(asc(tickets.createdAt));
    return results;
}
