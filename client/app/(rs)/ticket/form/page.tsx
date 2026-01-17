import BackButton from '@/app/components/backButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import { getTicket } from '@/lib/queries/getTicket';
import React from 'react'
import TicketForm from './TicketForm';

async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }
) {

    try {
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
            
            return <TicketForm customer={customer} ticket={ticket} />
        }


    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }

    return (
        <div>page</div>
    )
}

export default page