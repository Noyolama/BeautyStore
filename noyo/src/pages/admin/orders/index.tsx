import { fetchPaginatedOrdersForAdmin } from "@/api"
import { DataTable, type Meta } from "@/components/table/DataTable"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useOrderColumns } from "./components/columns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type OrderFilter = {
    keyword?: string;
    orderStatus?: OrderStatus | 'all';
}

const AdminOrders = () => {
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filter, setFilter] = useState<OrderFilter>({
        keyword: '',
        orderStatus: 'all'
    })
    const orderColumns = useOrderColumns()
    const { data, isLoading } = useQuery({
        queryKey: ['admin-orders', page, filter, itemsPerPage],
        queryFn: () => {
            const updatedFilter = {
                ...filter,
                orderStatus: filter?.orderStatus == 'all' ? undefined : filter.orderStatus
            }
            return fetchPaginatedOrdersForAdmin(page, itemsPerPage, updatedFilter)
        },
    })

    const handleRefetch = (metaData: Meta) => {
        setPage(metaData.currentPage)
        setItemsPerPage(metaData.itemsPerPage)
    }

    const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

    return (
        <div>
            <div className="lg:flex lg:items-center lg:justify-between mb-2">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-xl sm:tracking-tight">
                        All Orders
                    </h2>
                </div>
                <div className="flex lg:mt-0 lg:ml-4">
                    <Select value={filter.orderStatus} onValueChange={(value: OrderStatus) => setFilter({ ...filter, orderStatus: value })}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value='all' className="rounded-lg">
                                All
                            </SelectItem>
                            {
                                statusOptions.map((opt, index) => (
                                    <SelectItem value={opt} key={index} className="rounded-lg">
                                        {opt}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {
                !isLoading &&
                <DataTable columns={orderColumns} data={data?.data || []} meta={data?.meta} onChange={handleRefetch} />
            }
        </div>
    )
}

export default AdminOrders
