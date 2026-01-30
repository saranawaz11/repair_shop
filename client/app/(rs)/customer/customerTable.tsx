'use client'
'use no memo'
import React, { useMemo } from 'react'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { customerSelectSchemaType } from '@/app/zod-schemas/customer'
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Props = {
    data: customerSelectSchemaType[],
}

const columnHeadersArray: Array<keyof customerSelectSchemaType> = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'city',
    'zip'
];
const columnHelper = createColumnHelper<customerSelectSchemaType>();

export default function CustomerTable({ data }: Props) {
    const router = useRouter();

    const columns = useMemo(() => {
        return columnHeadersArray.map((columnName) =>
            columnHelper.accessor(columnName, {
                id: columnName,
                header: columnName[0].toUpperCase() + columnName.slice(1),
                cell: info => info.getValue(),   // 👈 THIS
            })
        );
    }, []);


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
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
                                onClick={() => router.push(`/customer/form?customerId=${row.original.id}`)}
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
        </div>
    )
}
