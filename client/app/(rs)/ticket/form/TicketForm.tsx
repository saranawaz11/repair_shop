'use client'
import { customerInsertSchema, type customerSelectSchemaType } from "@/app/zod-schemas/customer"
import { ticketInsertSchema, type ticketInsertSchemaType } from "@/app/zod-schemas/ticket"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { Form } from "@/components/ui/form";
import InputWithLabel from "@/components/inputs/inputWithLabel";
import CheckboxWithLabel from "@/components/inputs/checkboxWithLabel";
import TextAreaWithLabel from "@/components/inputs/textAreaWithLabel";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SelectWithLabel } from "@/components/inputs/selectWithLabel";


type Props = {
    customer: customerSelectSchemaType,
    ticket?: ticketInsertSchemaType,
    techs?: {
        id: string,
        description: string,
    }[],
    isEditable?: boolean,
}

function TicketForm(
    { customer, ticket, techs }: Props
) {

    const isManager = Array.isArray(techs)
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
        <div className='pt-10 w-[80%] mx-auto'>
            <div>
                <h2>{ticket?.id ? 'Edit' : 'New'} Ticket {ticket?.id ? `# ${ticket.id}` : 'Form'}</h2>
            </div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10 p-4'">
                    <div className='flex flex-col gap-4 w-full max-w-xs'>
                        <InputWithLabel<ticketInsertSchemaType> fieldTitle='Title' nameInSchema='title' />
                        {isManager ? (
                            <SelectWithLabel<ticketInsertSchemaType> fieldTitle="Tech ID" nameInSchema="tech" data={[{ id: 'mmmexample@gmail.com', description: 'example@gmail.com' }, ...techs]} />
                        ) : (
                            <InputWithLabel<ticketInsertSchemaType> fieldTitle='Tech' nameInSchema='tech' disabled={true} />

                        )}
                        <CheckboxWithLabel nameInSchema={'completed'} fieldTitle="Completed" message="Yes" />
                        <div>
                            <h2>Customer Info</h2>
                            <hr />
                            <p>{customer.first_name} {customer.last_name}</p>
                            <p>{customer.address1}</p>
                            {customer.address2 ? <p>{customer.address1}</p> : null}
                            <hr />
                            <p>Email: {customer.email}</p>
                            <p>Phone: {customer.phone}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <TextAreaWithLabel fieldTitle="Description" nameInSchema={'description'} className="h-96" />
                        <div className='flex gap-2'>
                            <Button className='w-3/4' variant={'outline'} title='save' type='submit'>Save</Button>
                            <Button variant={'outline'} title='Reset' type='button' onClick={() => form.reset(defaultValues)}>Reset</Button>
                        </div>
                    </div>
                    {/* <p>{JSON.stringify(form.getValues())}</p> */}
                </form>
            </Form>
        </div>
    )
}

export default TicketForm