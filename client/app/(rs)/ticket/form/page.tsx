import BackButton from '@/app/components/backButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import { getTicket } from '@/lib/queries/getTicket';
import React from 'react'
import TicketForm from './TicketForm';
import { clerkClient, currentUser } from '@clerk/nextjs/server';

async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }
) {
    try {
        const user = await currentUser()
        const isManager = user?.publicMetadata?.role === 'manager'


        const { ticketId, customerId } = await searchParams;

        if (!ticketId && !customerId) {
            return (
                <div>
                    <h2>Customer Id and ticket Id is required to load the form.</h2>
                </div>
            )
        }

        // new ticket form
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));
            if (!customer) {
                return (
                    <div>
                        <h2>The Customer details for customer Id: {customerId} not found.</h2>
                        <BackButton title='Return to previous page' variant='ghost' />
                    </div>
                )
            }

            if (!customer.active) {
                return (
                    <div>
                        <h2>The Customer for Id: {customerId} is not active.</h2>
                        <BackButton title='Return to previous page' variant='ghost' />
                    </div>
                )
            }
            // console.log('User is:', JSON.stringify(user, null, 2));

            if (isManager) {
                const clerk = await clerkClient()
                const { data: users } = await clerk.users.getUserList()

                const techs = users.map(user => ({
                    id: user.emailAddresses[0]?.emailAddress ?? user.id,
                    description: user.emailAddresses[0]?.emailAddress ?? 'No email',
                }))

                return (
                    <TicketForm
                        customer={customer}
                        techs={techs}
                    // isManager={isManager}
                    />
                )
            }
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));
            if (!ticket) {
                return (
                    <div>
                        <h2>The ticket details for Id: {ticketId} not found.</h2>
                        <BackButton title='Return to previous page' variant='ghost' />
                    </div>
                )
            }

            const customer = await getCustomer(ticket.customerId);

            // get details
            console.log('Ticket: ', ticket);
            console.log('Customer: ', customer);

            if (isManager) {
                const clerk = await clerkClient()
                const { data: users } = await clerk.users.getUserList()

                const techs = users.map(user => ({
                    id: user.emailAddresses[0]?.emailAddress ?? user.id,
                    description: user.emailAddresses[0]?.emailAddress ?? 'No email',
                }))

                return <TicketForm customer={customer} ticket={ticket} techs={techs}
                />

            }
            else {
                const isEditable = user?.emailAddresses[0].emailAddress.toLowerCase() === ticket.tech.toLowerCase()
                return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />
            }

        }


    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}

export default page