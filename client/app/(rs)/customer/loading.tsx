import { LoaderCircle } from "lucide-react";

export default function Loading() {
    return <div className='fixed inset-0 z-50 bg-backround/80'>
        <div className='flex justify-center items-center h-dvh'>
            <LoaderCircle className='animate-spin size-40 text-primary' />
        </div>
    </div>
}