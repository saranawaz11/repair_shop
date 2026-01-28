import React from 'react'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/app/components/searchButton'

export default function CustomerSearch() {
  return (
    <Form action={'/customer'} className='flex gap-2'>
        <Input placeholder='Search customer...' title='searchText' type='text' />
        <SearchButton/>
    </Form>
  )
}
