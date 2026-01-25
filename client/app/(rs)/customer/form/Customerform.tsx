'use client'
import { customerInsertSchema, customerInsertSchemaType, customerSelectSchemaType } from '@/app/zod-schemas/customer'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputWithLabel from '@/components/inputs/inputWithLabel';
import { Button } from '@/components/ui/button';
import TextAreaWithLabel from '@/components/inputs/textAreaWithLabel';
import { SelectWithLabel } from '@/components/inputs/selectWithLabel';
import { countryArray } from '@/app/constants/CityArray';
import { useUser } from '@clerk/nextjs';
import CheckboxWithLabel from '@/components/inputs/checkboxWithLabel';
import { saveCustomerAction } from '@/app/actions/saveCustomerAction';
import { useAction } from "next-safe-action/hooks";
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import { DisplayServerActionResponse } from '@/app/components/displayServerActionResponse';



type Props = {
  customer?: customerSelectSchemaType;
}

export default function Customerform(
  { customer }: Props
) {

  const { user, isLoaded } = useUser()
  const isManager = isLoaded && user?.publicMetadata?.role === 'manager';

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
    active: customer?.active || true
  }

  const form = useForm<customerInsertSchemaType>({
    mode: 'onBlur',
    resolver: zodResolver(customerInsertSchema),
    defaultValues,
  })

  const { execute, result, isExecuting, reset } = useAction(saveCustomerAction, {
    onSuccess: ({ data }) => {
      //toast user 
      toast(data?.message || 'information saved successfully', {
        description: 'Success',
        duration: 5000,
      })
    },
    onError: ({ error }) => {
      //toast user 
      toast('Saved failed', {
        description: 'Error',
        duration: 5000,
      })
    },

  }
  );


  async function onSubmit(data: customerInsertSchemaType) {
    console.log(data);
  }


  return (
    <div className='pt-10 w-[80%] mx-auto'>
      <DisplayServerActionResponse result={result} />
      <div className='text-start'>
        <h2 className='text-2xl font-bold'>
          {customer?.id ? "Edit" : 'New'} Customer {customer?.id ? `#${customer.id}` : 'Form'}
        </h2>
        {isManager && (
          <p className="text-sm text-muted-foreground">
            You are logged in as a manager
          </p>
        )}

      </div>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-10 p-4'>
          <div className='flex flex-col gap-4 w-full max-w-xs'>
            <InputWithLabel<customerInsertSchemaType> fieldTitle='First Name' nameInSchema='first_name' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Last Name' nameInSchema='last_name' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Address1' nameInSchema='address1' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Address2' nameInSchema='address2' />
            {/* <InputWithLabel<customerInsertSchemaType> fieldTitle='City' nameInSchema='city' /> */}
            <SelectWithLabel<customerInsertSchemaType> fieldTitle='City' nameInSchema='city' data={countryArray} />
          </div>
          <div className='flex flex-col gap-4 w-full max-w-xs'>
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Zip' nameInSchema='zip' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Email' nameInSchema='email' />
            <InputWithLabel<customerInsertSchemaType> fieldTitle='Phone' nameInSchema='phone' />
            <TextAreaWithLabel<customerInsertSchemaType> fieldTitle='Notes' nameInSchema='notes' className='h-36' />
            {isManager && customer?.id ? (
              <CheckboxWithLabel<customerInsertSchemaType> fieldTitle='Active' nameInSchema={'active'} message='Yes' />
            ) : null}

            <div className='flex gap-2'>
              <Button className='w-3/4' variant={'outline'} title='save' type='submit' disabled={isExecuting}>{isExecuting ? (
                <><LoaderCircle className='animate-spin' />Saving</>
              ) : 'Save'}</Button>
              <Button variant={'outline'} title='Reset' type='button' onClick={() => {
                form.reset(defaultValues)
                reset()
              }}>Reset</Button>
            </div>
          </div>
          {/* <p>{JSON.stringify(form.getValues())}</p> */}
        </form>
      </Form>
    </div>
  )
}
