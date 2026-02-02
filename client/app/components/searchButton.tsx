'use client'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react'
import { useFormStatus } from "react-dom";

function SearchButton() {
    const status = useFormStatus();

  return (
    <Button disabled={status.pending} type='submit' className='w-25' variant={'default'}>
            {status.pending ? (
                <LoaderCircle className='animate-spin'/>
            ) : 'Search'}
    </Button>
  )
}

export default SearchButton