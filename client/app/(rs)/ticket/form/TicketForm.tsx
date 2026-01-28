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
import { useAction } from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/app/components/displayServerActionResponse";


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
    { customer, ticket, techs, isEditable = true }: Props
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

    const { execute, result, isExecuting, reset } = useAction(saveTicketAction, {
        onSuccess: ({ data }) => {
            //toast user 
            toast.success(data?.message || 'information saved successfully', {
                description: 'Success',
                duration: 5000,
            })

            // Reset form to empty if it's a new customer (id is 0)
            // Delay reset to allow DisplayServerActionResponse to be visible for 5 seconds
            // setTimeout(() => {
            //     if (!customer?.id || customer.id === 0) {
            //         form.reset({
            //             id: 0,
            //             first_name: '',
            //             last_name: '',
            //             address1: '',
            //             address2: '',
            //             city: '',
            //             zip: '',
            //             email: '',
            //             phone: '',
            //             notes: '',
            //             active: true
            //         })
            //     }
            //     // Reset the action result after message has been displayed
            //     reset()
            // }, 5000)
        },
        onError: ({ error }) => {
            //toast user 
            toast.error('Save failed', {
                description: error?.serverError || 'An error occurred',
                duration: 5000,
            })
        },

    }
    );

    async function onSubmit(data: ticketInsertSchemaType) {
        // console.log(data);
        execute(data);

    }


    return (
        <div className='pt-10 w-[80%] mx-auto'>
            <DisplayServerActionResponse result={result} />
            <div>
                <h2>{ticket?.id && isEditable ? `Edit ticket #${ticket.id}` : ticket?.id ? `View ticket #${ticket.id}` : 'New Ticket Form'} Ticket {ticket?.id ? `# ${ticket.id}` : 'Form'}</h2>
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
                        {ticket?.id ? (
                            <CheckboxWithLabel<ticketInsertSchemaType> fieldTitle="Completed" nameInSchema="completed" message="Yes" disabled={!isEditable} />
                        ) : null}
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
                        <TextAreaWithLabel fieldTitle="Description" nameInSchema={'description'} className="h-96" disabled={!isEditable} />
                        {isEditable && (
  <div className='flex gap-2'>
    <Button
      className='w-3/4'
      variant='outline'
      type='submit'
      disabled={isExecuting}
    >
      {isExecuting ? (
        <>
          <LoaderCircle className='animate-spin' />
          Saving
        </>
      ) : (
        'Save'
      )}
    </Button>

    <Button
      variant='outline'
      type='button'
      onClick={() => {
        form.reset(defaultValues)
        reset()
      }}
    >
      Reset
    </Button>
  </div>
)}


                    </div>
                    {/* <p>{JSON.stringify(form.getValues())}</p> */}
                </form>
            </Form>
        </div>
    )
}

export default TicketForm