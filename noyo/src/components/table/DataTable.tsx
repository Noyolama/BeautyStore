import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
// import { Label } from "../ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export type Meta = {
  count: number;
  currentPage: number;
  total: number;
  totalPages: number;
  itemsPerPage: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  meta?: Meta
  onChange?: (meta: Meta) => void
  className?: string
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  onChange,
  className
}: DataTableProps<TData, TValue>) {

  const [sorting,] = useState<SortingState>([])
  const [paginationData,] = useState<Meta | undefined>(meta)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  return (
    <div>

      <div className={cn("overflow-hidden rounded-md border", className)}>
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{
                      minWidth: header.column.columnDef.size,
                      width: header.column.columnDef.size,
                      maxWidth: header.column.columnDef.size,
                    }}>
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}
                      style={{
                        minWidth: cell.column.columnDef.size,
                        width: cell.column.columnDef.size,
                        maxWidth: cell.column.columnDef.size,
                      }}
                    >
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
      {
        paginationData && meta &&
        <div className="flex items-center justify-end mt-4">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            {/* <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${meta.itemsPerPage}`}
              onValueChange={(value) => onChange({
                ...paginationData,
                itemsPerPage: Number(value)
              })}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {meta.currentPage} of{" "}
              {meta.totalPages}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => onChange?.({
                  ...paginationData,
                  currentPage: 1
                })}
                disabled={meta?.currentPage === 1}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => onChange?.({
                  ...paginationData,
                  currentPage: Math.max(paginationData.currentPage - 1, 1)
                })}
                disabled={meta?.currentPage === 1}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => onChange?.({
                  ...paginationData,
                  currentPage: Math.min(paginationData.currentPage + 1, meta.totalPages)
                })}
                disabled={meta?.currentPage === meta.totalPages}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => onChange?.({
                  ...paginationData,
                  currentPage: meta.totalPages
                })}
                disabled={meta?.currentPage === meta.totalPages}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}