import React from 'react'
import type { Metadata } from 'next'
import TicketSearch from './ticketSearch';
import getOpenTickets from '@/lib/queries/getOpenTickets';
import getTicketSeaarchResult from '@/lib/queries/getTicketSeaarchResult';

export const metadata: Metadata = {
  title: 'Ticket',
}

export default async function TicketPage(
  {
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>
  }
) {
  const { searchText } = await searchParams;
  if (!searchText) {
    const result = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        <p>{JSON.stringify(result)}</p>
      </>
    )
  }
  const result = await getTicketSeaarchResult(searchText);

  return (
    <div>
      <TicketSearch />
      <p>{JSON.stringify(result)}</p>
    </div>
  )
}
