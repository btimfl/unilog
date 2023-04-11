import { Center, Text } from '@chakra-ui/react'
import { ColumnDef, Row, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { Fragment, ReactNode, useMemo, useRef } from 'react'

import styles from './TanstackTable.module.scss'

type Props<K> = {
    data: K[]
    columns: ColumnDef<K>[]
    headerRowHeight?: number
    dataRowHeight?: number
    getRowCanExpand?: (row: Row<K>) => boolean
    renderSubComponent?: (row: Row<K>) => ReactNode
}

export default function TanstackTable<K>({
    data,
    columns,
    getRowCanExpand,
    renderSubComponent,
    headerRowHeight = 2,
    dataRowHeight = 4,
}: Props<K>) {
    const memoizedProps = useMemo(() => ({ data, columns }), [data, columns])

    const table = useReactTable<K>({
        data: memoizedProps.data,
        columns: memoizedProps.columns,
        getRowCanExpand,
        getCoreRowModel: getCoreRowModel(),
    })

    const tableContainerRef = useRef<HTMLDivElement>(null)
    const { rows } = table.getRowModel()
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    })
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0

    return (
        <div className={styles.container} ref={tableContainerRef}>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} style={{ height: `${headerRowHeight}rem` }}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    style={{
                                        width: header.getSize(),
                                        verticalAlign: 'top',
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {paddingTop > 0 && (
                        <tr>
                            <td style={{ height: `${paddingTop}px` }} />
                        </tr>
                    )}
                    {virtualRows.map((virtualRow) => {
                        const row = rows[virtualRow.index]
                        return (
                            <Fragment key={row.id}>
                                <tr style={{ height: `${dataRowHeight}rem` }}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                style={{
                                                    width: cell.column.getSize(),
                                                }}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })}
                                </tr>
                                {row.getIsExpanded() ? (
                                    <tr>
                                        <td colSpan={row.getVisibleCells().length}>{renderSubComponent?.(row)}</td>
                                    </tr>
                                ) : (
                                    <></>
                                )}
                            </Fragment>
                        )
                    })}
                    {paddingBottom > 0 && (
                        <tr>
                            <td style={{ height: `${paddingBottom}px` }} />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map((footerGroup) => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.footer, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            {table.getRowModel().rows.length === 0 ? (
                <Center h={`500px`}>
                    <Text textAlign={`center`} fontSize="xs" color="gray.500">
                        No records found.
                    </Text>
                </Center>
            ) : (
                <></>
            )}
        </div>
    )
}
