import BackButton from '@/app/components/backButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import Customerform from './Customerform';
import { currentUser } from '@clerk/nextjs/server';

export async function generateMetadata(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
        }) {
    const { customerId } = await searchParams
    if (!customerId) return { title: 'New Customer' }
    return { title: 'Edit Customer' }
}

export default async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {

    try {
        const { customerId } = await searchParams;
        const user = await currentUser()
        const isManager = user?.publicMetadata?.role === 'manager'

        if (customerId) {
            const customer = await getCustomer(parseInt(customerId))

            if (!customer) {
                return (
                    <div>
                        <h2>Customer not found</h2>
                        <BackButton title='Return to previous page' variant='ghost' />
                    </div>
                )
            }

            return <Customerform key={customerId} isManager={isManager} customer={customer} />
        }
        return <Customerform key='new' isManager={isManager} />

    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
}
