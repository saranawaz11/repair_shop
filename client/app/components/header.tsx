'use client'
import { File, HomeIcon, LogOut, UsersRound } from 'lucide-react'
import React from 'react'
import NavButton from './navButton'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { SignOutButton, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


function Header() {
    const { signOut } = useClerk()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.push('/sign-in')
    }

    return (
        <header className='max-w-6xl mx-auto shadow-xl/20 sticky top-0 z-999 '>
            <div className='flex items-center justify-between h-20 mx-4'>
                <div className='flex gap-3 items-center justify-center'>
                    <NavButton label="Home" href="/home" icon={HomeIcon} />
                    <Link href='/' className='text-2xl'>Computer&apos;s Repair Shop</Link>
                </div>
                <div className='flex justify-center items-center gap-2'>
                    <NavButton label="Tickets" href="/ticket" icon={File} />
                    <NavButton label="Customers" href="/customer" icon={UsersRound} />
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="cursor-pointer"
                        aria-label="Sign out"
                    >
                        <LogOut />
                    </button>

                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header