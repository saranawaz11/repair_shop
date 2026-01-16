import { customerInsertSchemaType, customerSelectSchemaType } from '@/app/zod-schemas/customer'
import React from 'react'

type Props = {
    customer?: customerSelectSchemaType;
}

export default function Customerform(
    { customer } : Props
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

  return (
    <div>Customerform</div>
  )
}
