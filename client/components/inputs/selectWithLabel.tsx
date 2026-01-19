import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"

type DataObj = {
    id: string,
    description: string
}

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    className?: string,
    data: DataObj[]
}

export function SelectWithLabel<S>(
    { fieldTitle, nameInSchema, data, className }: Props<S>
) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={nameInSchema} className='text-base '>{fieldTitle}</FormLabel>
                    <Select {...field} onValueChange={field.onChange}>
                        <FormControl>
                            <SelectTrigger className={`w-full max-w-xs${className}`} id={nameInSchema}>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                        </FormControl>

                        <SelectContent className="light:bg-gray-500" position="item-aligned" side="left">
                            {data.map((item) => (
                                <SelectItem value={item.id} key={`${nameInSchema}_${item.id}`}>
                                    {item.description}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}
