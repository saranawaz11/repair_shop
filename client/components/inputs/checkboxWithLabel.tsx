'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Checkbox } from '../ui/checkbox';

type Props<S> = {
    nameInSchema: keyof S & string,
    fieldTitle: string,
    message: string
}


export default function CheckboxWithLabel<S>(
    { nameInSchema, fieldTitle, message }: Props<S>

) {
    const form = useFormContext()
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className='flex justify-center items-center gap-8'>
                    <FormLabel htmlFor={nameInSchema} className='text-base '>{fieldTitle}</FormLabel>
                    <FormControl>
                        <Checkbox id={nameInSchema} {...field} checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    {message}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

