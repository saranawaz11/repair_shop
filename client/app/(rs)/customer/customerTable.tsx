'use client'
'use no memo'
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender, CellContext } from '@tanstack/react-table';
import { customerSelectSchemaType } from '@/app/zod-schemas/customer'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, TableOfContents } from 'lucide-react';
import Link from 'next/link';

type Props = {
    data: customerSelectSchemaType[],
}


export default function CustomerTable({ data }: Props) {
    const columnHeadersArray: Array<keyof customerSelectSchemaType> = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'city',
        'zip'
    ];
    const columnHelper = createColumnHelper<customerSelectSchemaType>();

    const ActionsCell = ({ row }: CellContext<customerSelectSchemaType, unknown>) => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='h-8 w-8 rounded-full p-0 cursor-pointer' variant={'ghost'}>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={`/ticket/form?customerId=${row.original.id}`} prefetch={false} className='w-full'>
                            New Ticket
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={`/customer/form?customerId=${row.original.id}`} prefetch={false} className='w-full'>
                            Edit Customer
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    ActionsCell.displayName = 'ActionsCell'
    const columns = [
        columnHelper.display({
            id: 'actions',
            header: () => <TableOfContents />,
            cell: ActionsCell
        }),
        ...columnHeadersArray.map((columnName) => {
            return columnHelper.accessor(columnName, {
                id: columnName,
                header: columnName[0].toUpperCase() + columnName.slice(1)
            })
        })
    ]


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    console.log('table data:', data, Array.isArray(data));

    return (
        <div className="overflow-hidden rounded-md w-[90%] mx-auto my-5">
            <Table className='border'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className={`bg-secondary ${header.id === 'actions' ? 'w-12' : ''}`}>
                                        <div className={`${header.id === 'actions' ? 'flex justify-center items-center' : ''}`}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
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
                                // onClick={() => router.push(`/customer/form?customerId=${row.original.id}`)}
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
