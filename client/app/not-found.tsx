import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='fixed inset-0 z-50 bg-backround/80'>
      <div className='grid place-content-center h-dvh'>
        <h2 className='text-4xl text-bold'>Page Not Found</h2>
        <Link href="/ticket" className='hover:underline mt-2'>Return Home</Link>
      </div>
    </div>
  )
}