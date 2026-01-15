// Have to keep it server component


// get customer id through searchparams
// then get customer all data from query of getCustomer
// use id from searchparams to match with id to id got from getCustomer

import BackButton from '@/app/components/backButton';
import { getCustomer } from '@/lib/queries/getCustomer';
import React from 'react'

export default async function page(
    {
        searchParams,
    }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {

    try {
        const { customerId } = await searchParams;
        console.log( `customer id is:- ${customerId}` );

        if(customerId){
            const customer = await getCustomer(parseInt(customerId))
            console.log('Customer is: \n', customer);
            

            if(!customer){
                return(
                    <div>
                        <h2>Customer not found</h2>
                        <BackButton title='Return to previous page' variant='ghost'/>
                    </div>
                )
            }

            // if customer details present
        } 
        // if not customerId, then new form

    } catch (e) {
        if (e instanceof Error) {
            throw e;
        }
    }
    return (
        <div>page</div>
    )
}
