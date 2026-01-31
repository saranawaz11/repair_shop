import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function usePolling(ms: number = 60000, searchParam: string | null) {

    const router = useRouter()
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('interval running');
            if (!searchParam) {
                console.log('Refreshing data');
                router.refresh();
            }

        }, ms);
        return () => clearInterval(intervalId)
    }, [searchParam, ms]) //eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>usePollingms:number = 60000, </div>
    )
}
