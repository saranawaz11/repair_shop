'use client'
import { customerInsertSchema, customerInsertSchemaType, customerSelectSchemaType } from '@/app/zod-schemas/customer'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputWithLabel from '@/components/inputs/inputWithLabel';
import { Button } from '@/components/ui/button';

type Props = {
  customer?: customerSelectSchemaType;
}

export default function Customerform(
  { customer }: Props
) {

  const defaultValues: customerInsertSchemaType = {
    id: customer?.id || 0,
    first_name: customer?.first_name || '',
    last_name: customer?.last_name || '',
    address1: customer?.address1 || '',
    address2: customer?.address2 || '',
    city: customer?.city || '',
    zip: customer?.zip || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    notes: customer?.notes || '',
  }

  const form = useForm<customerInsertSchemaType>({
    resolver: zodResolver(customerInsertSchema),
    defaultValues,
  })

  async function onSubmit(data: customerInsertSchemaType) {
    console.log(data);
  }


  return (
    <div className='pt-10 w-[80%] mx-auto'>
      <div className='text-start'>
        <h2 className='text-2xl font-bold'>
          {customer?.id ? "Edit" : 'New'} customer form
        </h2>
      </div>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-10 p-4'>
          <div className='flex flex-col gap-4 w-full max-w-xs'>
            <InputWithLabel<customerInsertSchemaType> fieldTitle='First Name' nameInSchema='first_name' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Last Name' nameInSchema='last_name' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Address1' nameInSchema='address1' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Address2' nameInSchema='address2' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='City' nameInSchema='city' />
          </div>
          <div className='flex flex-col gap-4 w-full max-w-xs'>
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Zip' nameInSchema='zip' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Email' nameInSchema='email' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Phone' nameInSchema='phone' />

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
