import { Column } from "@tanstack/react-table"
import DebouncedInput from "./debounceInput"

type Props<T> = {
    column: Column<T, unknown>,
    filteredRows: string[],
}

export default function Filter<T>({ column, filteredRows }: Props<T>) {
    const columnFilterValue = column.getFilterValue();
    const uniqueFilteredValues = new Set(filteredRows)
    // const sortedUniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
    const sortedUniqueValues = Array.from(uniqueFilteredValues).sort()

    return (
        <div className='mb-2'>
        <datalist id={column.id + 'list'}>
            {sortedUniqueValues.map((value, index) => (
                <option key={`${index}-${column.id}`} value={value}/>
            ))}
        </datalist>
        <DebouncedInput
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={value => column.setFilterValue(value)}
                placeholder={`Search... (${uniqueFilteredValues.size})`}
            className="w-full border shadow rounded bg-card"
            list={column.id + 'list'}
        />
        </div>
    )
}