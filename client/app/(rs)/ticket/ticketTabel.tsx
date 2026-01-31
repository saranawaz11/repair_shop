'use client'
'use no memo'
import React, { useMemo, useState } from 'react'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, ColumnFiltersState, getFacetedUniqueValues, getFilteredRowModel, SortingState, getSortedRowModel } from '@tanstack/react-table';
import { customerSelectSchemaType } from '@/app/zod-schemas/customer'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TicketSearchResultsType } from '@/lib/queries/getTicketSeaarchResult';
import { ArrowDown, ArrowUp, ArrowUpDown, CircleCheckIcon, CircleXIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Filter from '@/app/components/react-table/filter';

type Props = {
    data: TicketSearchResultsType,
}

type RowType = TicketSearchResultsType[0];

const columnHeadersArray: Array<keyof RowType> = [
    'ticketDate',
    'title',
    'tech',
    'first_name',
    'last_name',
    'email',
    'completed'
];
const columnHelper = createColumnHelper<RowType>();

export default function TicketTabel({ data }: Props) {
    const router = useRouter();
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([
        {
            id: 'ticketDate',
            desc: false
        }
    ])

    const columns = useMemo(() => {
        return columnHeadersArray.map((columnName) =>
            columnHelper.accessor((row) => {
                const value = row[columnName]
                if(columnName === 'ticketDate' && value instanceof Date){
                    return value.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })
                }
                if(columnName === 'completed'){
                    return value ? 'COMPLETED' : 'OPEN'
                }
                return value
            }, {
                id: columnName,
                header: ({ column }) => {
                    return (
                        <Button variant={'ghost'} className='p-1 w-full flex justify-between' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                            {columnName[0].toUpperCase() + columnName.slice(1)}

                            {column.getIsSorted() === 'asc' && (
                                <ArrowUp className='ml-2 h-4 w-4' />
                            )}

                            {column.getIsSorted() === 'desc' && (
                                <ArrowDown className='ml-2 h-4 w-4' />
                            )}
                            {column.getIsSorted() !== 'desc' && column.getIsSorted() !== 'asc' && (
                                <ArrowUpDown className='ml-2 h-4 w-4' />
                            )}
                        </Button>
                    )
                },
                cell: ({ getValue}) => {
                    const value = getValue()
                    if(columnName === 'completed'){
                        return (
                            <div className='grid place-content-center'>
                                {value === 'OPEN' ? <CircleXIcon className='opacity-255'/> : <CircleCheckIcon className='text-green-600'/>}
                            </div>
                        )
                    }
                    return value;
                } 
            })
        );
    }, []);


    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(), 
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getSortedRowModel: getSortedRowModel(),
    });


    console.log('table data:', data, Array.isArray(data));

    return (
        <div className="overflow-hidden rounded-md border mt-6">
            <Table className='border'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className='bg-secondary'>
                                        <div>

                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                            {header.column.getCanFilter() ? (
                                                <div className='grid place-content-center'>
                                                    <Filter column={header.column}/>
                                                </div>
                                            ): null}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className='cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40'
                                onClick={() => router.push(`/ticket/form?ticketId=${row.original.id}`)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className='border'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center">
                <div className="flex basis-1/3 items-center">
                    <p className='whitespace-nowrap font-bold'>
                        {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}  {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? 'total results' : 'results'}]`}
                    </p>
                </div>
                <div className="space-x-1">
                    <Button variant={'outline'} onClick={() => table.resetSorting()}>
                        Reset Sorting
                    </Button>
                    <Button variant={'outline'} onClick={() => table.resetColumnFilters()}>
                        Reset Filters
                    </Button>
                    <Button variant={'outline'} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant={'outline'} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next 
                    </Button>
                </div>
            </div>
        </div>
    )
}
