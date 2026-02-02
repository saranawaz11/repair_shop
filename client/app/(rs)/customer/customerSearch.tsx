import Form from 'next/form'
import { Input } from '@/components/ui/input'
import SearchButton from '@/app/components/searchButton'

export default function CustomerSearch() {
  return (
    <Form action={'/customer'} className='flex gap-2 w-3/4 mx-auto'>
      <Input placeholder='Search customer...' name='searchText' type='text' autoFocus />
        <SearchButton/>
    </Form>
  )
}
