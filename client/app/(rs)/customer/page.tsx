
import React from 'react'
import type { Metadata } from 'next'
import CustomerSearch from './customerSearch';
import getCustomerSearchResult from '@/lib/queries/getCustomerSearchResult';

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

  const result = await getCustomerSearchResult(searchText);
  return (

    <div>
      <CustomerSearch />
      <p>{JSON.stringify(result)}</p>
    </div>
  )
}
