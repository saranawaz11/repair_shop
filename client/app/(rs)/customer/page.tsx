
import React from 'react'
import type { Metadata } from 'next'
import CustomerSearch from './customerSearch';
import getCustomerSearchResult from '@/lib/queries/getCustomerSearchResult';
import Sentry from '@sentry/nextjs'
export const metadata: Metadata = {
  title: 'Customer',
}

export default async function CustomerPage(
  {
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>
  }
) {
  const { searchText } = await searchParams;
  if (!searchText) return <CustomerSearch />

  // monitor duration
  const span = Sentry.startInactiveSpan({
    name: 'getCustomerSearchResult-1'
  })
  const result = await getCustomerSearchResult(searchText);
  span.end();
  return (

    <div>
      <CustomerSearch />
      <p>{JSON.stringify(result)}</p>
    </div>
  )
}
