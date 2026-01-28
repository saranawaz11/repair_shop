import React from 'react'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/app/components/searchButton'

export default function TicketSearch() {
  return (
    <Form action={'/ticket'} className='flex gap-2'>
          <Input placeholder='Search ticket...' name='searchText' type='text' />
        <SearchButton/>
    </Form>
  )
}
