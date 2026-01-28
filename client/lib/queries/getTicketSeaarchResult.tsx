import db from '@/app/db';
import { customers, tickets } from '@/app/db/schema';
import { eq, ilike, or } from 'drizzle-orm';
import React from 'react'

export default async function getTicketSeaarchResult(searchText: string) {
    const results = await db.select({
        ticketDate: tickets.createdAt,
        title: tickets.title,
        first_name: customers.first_name,
        last_name: customers.last_name,
        email: customers.email,
        tech: tickets.tech,
    })
        .from(tickets)
        .leftJoin(customers, eq(tickets.customerId, customers.id))
        .where(or(
            ilike(tickets.title, `%${searchText}%`),
            ilike(tickets.description, `%${searchText}%`),
            ilike(tickets.tech, `%${searchText}%`),
            ilike(customers.first_name, `%${searchText}%`),
            ilike(customers.last_name, `%${searchText}%`),
            ilike(customers.phone, `%${searchText}%`),
            ilike(customers.email, `%${searchText}%`),
            ilike(customers.city, `%${searchText}%`),
            ilike(customers.zip, `%${searchText}%`),
            ilike(customers.address1, `%${searchText}%`),
            ilike(customers.address2, `%${searchText}%`),
            ilike(customers.notes, `%${searchText}%`),
        ));
    return results;
}
