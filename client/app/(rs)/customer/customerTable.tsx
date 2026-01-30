'use client'
import React from 'react'
import { createColumnHelper } from '@tanstack/react-table';
import { customerSelectSchemaType } from '@/app/zod-schemas/customer'
import { useRouter } from 'next/navigation'

type Props = {
    data: customerSelectSchemaType[],
}

export default function CustomerTable({data} : Props) {
    const router = useRouter();
    const columnHeadersArray:Array<keyof customerSelectSchemaType> = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'city',
        'zip'
    ];
    const columnHelper = createColumnHelper<customerSelectSchemaType>();
    const columns = [
        columnHelper.accessor('first_name', {
            header: 'First Name',
          }),
    ]

  return (
    <div>C</div>
  )
}
