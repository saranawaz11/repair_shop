'use client'
import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useFormContext } from 'react-hook-form'


type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & InputHTMLAttributes<HTMLInputElement>

function InputWithLabel<S>(
    { fieldTitle, nameInSchema, className, ...props }: Props<S>
) {
    const form = useFormContext()
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={nameInSchema} className='text-base '>{fieldTitle}</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" id={nameInSchema} {...props} {...field} className={`w-full max-w-xs ${className} disabled:text-blue-800 dark:disabled:text-green-800 disabled:opacity-75`}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputWithLabel