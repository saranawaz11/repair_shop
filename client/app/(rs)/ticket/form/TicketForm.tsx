'use client'
import { customerInsertSchema, type customerSelectSchemaType } from "@/app/zod-schemas/customer"
import { ticketInsertSchema, type ticketInsertSchemaType } from "@/app/zod-schemas/ticket"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { Form } from "@/components/ui/form";


type Props = {
    customer: customerSelectSchemaType,
    ticket?: ticketInsertSchemaType
}

function TicketForm(
    { customer, ticket }: Props
) {
    const defaultValues: ticketInsertSchemaType = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech ?? 'example@gmail.com'
    }
    const form = useForm<ticketInsertSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(ticketInsertSchema),
        defaultValues,
    })

    async function onSubmit(data: ticketInsertSchemaType) {
        console.log(data);
    }

    return (
        <div>
            <div>
                <h2>{ticket?.id ? 'Edit' : 'New'} Ticket {ticket?.id ? `# ${ticket.id}` : 'Form'}</h2>
            </div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <p>{JSON.stringify(form.getValues())}</p>
                </form>
            </Form>
        </div>
    )
}

export default TicketForm