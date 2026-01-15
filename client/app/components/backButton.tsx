'use client'

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string,
    className?: string,
    variant?: 'ghost' | 'default' | 'outline'
} 


function BackButton(
    {title, variant, className, ...props} : Props
) {
    const router = useRouter()
  return (
    <Button title={title} className={className} variant={variant} {...props} onClick={() => router.back()}>
        {title}
    </Button>
  )
}

export default BackButton