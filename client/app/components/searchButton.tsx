'use client'
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import React from 'react'
import { useFormStatus } from "react-dom";

function SearchButton() {
    const status = useFormStatus();

  return (
    <div>
        <Button disabled={status.pending} type='button' className='w-25'>
            {status.pending ? (
                <LoaderCircle className='animate-spin'/>
            ) : 'Search'}
        </Button>
    </div>
  )
}

export default SearchButton