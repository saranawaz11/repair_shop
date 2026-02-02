import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
type NavButtonProps = {
    icon: LucideIcon
    label: string
    href?: string
}


function NavButton({ label, href, icon: Icon }: NavButtonProps) {
    return (
        <Button
            variant='ghost'
            asChild
            aria-label={label}
            className='rounded-lg block text-2xl'
        >
            {
                href ? (
                    <Link href={href}>
                        <Icon className='h-6 w-6 shrink-0'/>
                    </Link>
                ) : (
                <Icon />
            )}
            
        </Button>
    )
}

export default NavButton