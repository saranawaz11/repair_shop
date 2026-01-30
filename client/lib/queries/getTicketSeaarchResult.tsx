import db from '@/app/db';
import { customers, tickets } from '@/app/db/schema';
import { asc, eq, ilike, or, sql } from 'drizzle-orm';
import React from 'react'

export default async function getTicketSeaarchResult(searchText: string) {
    const results = await db.select({
        id: tickets.id,
        ticketDate: tickets.createdAt,
        title: tickets.title,
        first_name: customers.first_name,
        last_name: customers.last_name,
        email: customers.email,
        tech: tickets.tech,
        completed: tickets.completed
    })
        .from(tickets)
        .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(or(
            ilike(tickets.title, `%${searchText}%`),
            ilike(tickets.tech, `%${searchText}%`),
            ilike(customers.first_name, `%${searchText}%`),
            ilike(customers.last_name, `%${searchText}%`),
            ilike(customers.phone, `%${searchText}%`),
            ilike(customers.email, `%${searchText}%`),
            ilike(customers.city, `%${searchText}%`),
            ilike(customers.zip, `%${searchText}%`),
            sql`lower(concat(${customers.first_name}, ' ', ${customers.last_name})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`

        ))
        .orderBy(asc(tickets.createdAt))

    return results;
}

export type TicketSearchResultsType = Awaited<ReturnType<typeof getTicketSeaarchResult>>
