'use client'

import { useEffect } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Error occurred',
    description: '...',
}


export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className='fixed inset-0 z-50 bg-backround/80'>
            <div className='grid place-content-center h-dvh'>

                <h2>Something went wrong!</h2>
                <button
                    onClick={
                        () => reset()
                    }
                >
                    Try again
                </button>
            </div>
        </div>
    )
}