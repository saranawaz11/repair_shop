'use client'
import { TextareaHTMLAttributes } from "react";
import React from 'react'
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>



export default function TextAreaWithLabel<S>(
    { nameInSchema, fieldTitle, className, ...props }: Props<S>
) {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={nameInSchema} className='text-base '>{fieldTitle}</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Type your note here." id={nameInSchema} className={className} {...props} {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
