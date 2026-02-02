'use client'
import { type customerSelectSchemaType } from "@/app/zod-schemas/customer"
import { ticketInsertSchema, type ticketInsertSchemaType } from "@/app/zod-schemas/ticket"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form";
import InputWithLabel from "@/components/inputs/inputWithLabel";
import CheckboxWithLabel from "@/components/inputs/checkboxWithLabel";
import TextAreaWithLabel from "@/components/inputs/textAreaWithLabel";
import { Button } from "@/components/ui/button";
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
    isManager?: boolean | undefined,
}

function TicketForm(
    { customer, ticket, techs, isEditable = true, isManager = false }: Props
) {

    const defaultValues: ticketInsertSchemaType = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech.toLowerCase() ?? 'example@gmail.com'
    }
    const form = useForm<ticketInsertSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(ticketInsertSchema),
        defaultValues,
    })

    const { execute, result, isExecuting, reset } = useAction(saveTicketAction, {
        onSuccess: ({ data }) => {
            toast.success(data?.message || 'Information saved successfully', {
                description: 'Success',
                duration: 5000,
            });
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
        execute(data);
    }


    return (
        <div className='w-[80%] mx-auto mb-10'>
            <DisplayServerActionResponse result={result} />
            <div>
                <h2 className='text-2xl font-bold'>{ticket?.id && isEditable ? `Edit` : ticket?.id ? `View` : 'New'} Ticket {ticket?.id ? `# ${ticket.id}` : 'Form'}</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10 p-4'">
                    <div className='flex flex-col gap-4 w-full max-w-xs'>
                        <InputWithLabel<ticketInsertSchemaType> fieldTitle='Title' nameInSchema='title' />
                        {isManager && techs ? (
                            <SelectWithLabel<ticketInsertSchemaType> fieldTitle="Tech ID" nameInSchema="tech" data={[{ id: 'mmmexample@gmail.com', description: 'example@gmail.com' }, ...techs]} />
                        ) : (
                            <InputWithLabel<ticketInsertSchemaType> fieldTitle='Tech' nameInSchema='tech' disabled={true} />

                        )}
                        {ticket?.id ? (
                            <CheckboxWithLabel<ticketInsertSchemaType> fieldTitle="Completed" nameInSchema="completed" message="Yes" disabled={!isEditable} />
                        ) : null}
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
                        <TextAreaWithLabel fieldTitle="Description" nameInSchema={'description'} className="h-76" disabled={!isEditable} />
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
                                    variant='destructive'
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