'use client'

import {
    File,
    HomeIcon,
    LogOut,
    UsersRound,
    Menu,
    X,
} from 'lucide-react'
import { useState } from 'react'
import NavButton from '@/app/components/navButton'
import Link from 'next/link'
import { ModeToggle } from '@/app/components/mode-toggle'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import NavButtonMenu from '@/app/components/navButtonMenu'

function Header() {
    const { signOut } = useClerk()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        router.push('/sign-in')
    }

    return (
        <header
            className="max-w-6xl mx-auto sticky top-0 z-50 mb-10 mt-2 rounded-xl border bg-background/80 backdrop-blur">
            <div className="flex items-center justify-between h-20 px-4">
                <div className="flex items-center gap-3">
                    <NavButton
                        label="Home"
                        href="/ticket"
                        icon={HomeIcon}
                    />
                    <Link
                        href="/ticket"
                        className="text-lg md:text-2xl transition-transform duration-300 hover:scale-105">
                        Computer&apos;s Repair Shop
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <NavButton label="Tickets" href="/ticket" icon={File} />
                    <NavButtonMenu
                        icon={UsersRound}
                        label="Customers Menu"
                        choices={[
                            { title: 'Search Customers', href: '/customer' },
                            { title: 'New Customer', href: '/customer/form' },
                        ]}
                    />
                    <button
                        type="button"
                        onClick={handleSignOut}
                        aria-label="Sign out"
                    >
                        <LogOut />
                    </button>

                    <ModeToggle />
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="md:hidden"
                    aria-label="Toggle menu"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>

            {open && (
                <div
                    className="md:hidden relative z-50 px-4 pb-4 flex flex-row justify-end gap-4"
                >
                    <NavButton label="Tickets" href="/ticket" icon={File} />

                    <NavButtonMenu
                        icon={UsersRound}
                        label="Customers Menu"
                        choices={[
                            { title: 'Search Customers', href: '/customer' },
                            { title: 'New Customer', href: '/customer/form' },
                        ]}
                    />

                    <button
                        type="button"
                        onClick={handleSignOut}
                    >
                        <LogOut size={18} />
                    </button>

                    <ModeToggle />
                </div>
            )}
        </header>
    )
}

export default Header
