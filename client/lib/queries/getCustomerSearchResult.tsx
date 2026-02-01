import db from '@/app/db'
import { customers } from '@/app/db/schema'
import { ilike, or, sql } from 'drizzle-orm'

export default async function getCustomerSearchResult(searchText: string) {

    const result = await db.select().from(customers)
        .where(or(
    // ilike(customers.first_name, `%${searchText}%`),
    // ilike(customers.last_name, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.city, `%${searchText}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`),
        sql`lower(concat(${customers.first_name}, ' ', ${customers.last_name})) LIKE ${`%${searchText.toLowerCase().replace(' ', '%')}%`}`,
        )).orderBy(customers.first_name)
    return result
}
