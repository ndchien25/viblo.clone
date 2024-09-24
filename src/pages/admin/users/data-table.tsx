import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React from "react"

import { DataTablePagination } from "@/components/table/DataTablePagination"
import { DataTableViewOptions } from "@/components/table/DataTableViewOptions"
import { PaginationState } from "@/models/Pagination"

interface DataTableProps<TData, TValue> {
  userColumns: ColumnDef<TData, TValue>[]
  data: TData[]
  rowCount: number
  last_page: number
  pagination: PaginationState
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
}

export function DataTable<TData, TValue>({ userColumns, data, rowCount, last_page, pagination, setPagination }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnSizing, setColumnSizing] = React.useState({})

  const table = useReactTable({
    data,
    columns: userColumns,
     defaultColumn: {
      minSize: 60,
      maxSize: 800,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: rowCount,
    pageCount: last_page,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: pagination,
      columnSizing,
    },
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
  })
  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes: { [key: string]: number } = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    }
    return colSizes
  }, [table.getState().columnSizingInfo, table.getState().columnSizing])
  
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />

      </div>
      <div className="rounded-md border">
        <Table className="overflow-hidden" style={{ ...columnSizeVars}}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    className="relative items-center"
                    style={{
                      width: `calc(var(--header-${header?.id}-size) * 1px)`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                    <div
                      {...{
                        className: "absolute top-0 -right-2 h-full cursor-col-resize touch-none select-none px-2",
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                    >
                      <div
                        {... {
                          className: `w-[2px] h-full bg-black/50 ${header.column.getIsResizing() ? 'bg-blue-500/100' : ''
                            }`
                        }}
                      />
                    </div>

                  </TableHead>
                ))}
              </TableRow>

            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow className="w-fit" key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
