import { fetchMyOrders } from "@/api"
import { useQuery } from "@tanstack/react-query"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import DisplayValue from "@/components/atoms/DisplayValue"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, simplifyDate } from "@/utils"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/table/DataTable"
import { useOrderDetailColumns } from "./admin/orders/components/columns"
import { useMemo, useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NoData } from "@/components/layouts/NoData"


const OrderCard = ({ order }: { order: Order }) => {
    const orderDetailColumns = useOrderDetailColumns()
    const orderSummaryData = useMemo(() => {
        if (!order) return []
        return [
            { label: 'Order Total', value: formatCurrency(order?.itemsPrice) },
            { label: 'Delivery Fee', value: formatCurrency(order?.shippingPrice) },
        ]
    }, [order])

    return (
        <div>
            <DataTable columns={orderDetailColumns} data={order.orderItems} className="border-none rounded-none" />
            <Card className="py-4 gap-0">
                <div className="flex justify-between">
                    <div>
                        <CardHeader>
                            <h2 className="text-xl font-medium tracking-tight">
                                Delivery Information
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                <DisplayValue label="Street Address" value={order?.shippingInfo?.address} />
                                <DisplayValue label="City" value={order?.shippingInfo?.city} />
                                <DisplayValue label="Country" value={order?.shippingInfo?.country} />
                                <DisplayValue label="Postal Code" value={order?.shippingInfo?.postalCode} />
                            </div>
                        </CardContent>
                    </div>
                    <div>
                        <CardHeader>
                            <h2 className="text-xl font-medium tracking-tight">
                                Order Summary
                            </h2>
                        </CardHeader>
                        <CardContent>
                            {
                                orderSummaryData.map((item, index) => (
                                    <div className="flex min-w-50 justify-between" key={index}>
                                        <div className="text-xs text-muted-foreground">
                                            {item.label}:
                                        </div>
                                        <div className="text-sm font-medium">
                                            {item.value}
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex justify-between mt-4">
                                <div className="font-bold flex items-end">
                                    Grand Total:
                                </div>
                                <div className="font-bold text-xl">
                                    {formatCurrency(order?.itemsPrice + order?.shippingPrice)}
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </div>

            </Card>

        </div >
    )
}

const MyOrders = () => {
    const [filterStatus, setFilterStatus] = useState('All')

    const { data: orders } = useQuery({
        queryKey: ['my-orders', filterStatus],
        queryFn: () => {
            const status = []
            if (filterStatus === 'Pending') {
                status.push('Processing', 'Shipped')
            } else if (filterStatus === 'Completed') {
                status.push('Delivered')
            } else if (filterStatus === 'Cancelled') {
                status.push('Cancelled')
            }
            return fetchMyOrders({ status })
        },
        initialData: []
    })

    const statusOptions = [
        {
            label: 'Pending',
            value: 'Pending',
        },
        {
            label: 'Completed',
            value: 'Completed',
        },
        {
            label: 'Cancelled',
            value: 'Cancelled',
        },
        {
            label: 'All',
            value: 'All',
        },
    ]
    return (
        <>
            <CardHeader className="px-0 mb-4">
                <CardTitle>My Orders</CardTitle>
                <CardDescription>
                    <span className="hidden lg:block">
                        All your orders are listed below.
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type="single"
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                        variant="outline"
                        className="hidden *:data-[slot=toggle-group-item]:!px-4 lg:flex"
                    >
                        {
                            statusOptions.map(opt => (
                                <ToggleGroupItem value={opt.value} key={opt.value}>{opt.label}</ToggleGroupItem>
                            ))
                        }
                    </ToggleGroup>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger
                            className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate lg:hidden"
                            size="sm"
                            aria-label="Select a value"
                        >
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            {
                                statusOptions.map(opt => (
                                    <SelectItem value={opt.value} key={opt.value} className="rounded-lg">
                                        {opt.label}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>

            {
                orders?.length > 0 ?
                    <Accordion
                        type="multiple"
                        className="w-full"
                    >
                        {
                            (orders || []).map((o, index: number) => (
                                <AccordionItem value={o?._id} key={index} className="border! rounded-md px-2 mb-4">
                                    <AccordionTrigger>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                                            <DisplayValue label="Order Status" value={o?.orderStatus} type="status" />
                                            <DisplayValue label="Order Date" value={simplifyDate(o?.createdAt)} />
                                            <DisplayValue label="Items" value={o?.orderItems?.length || 0} />
                                            <DisplayValue label="Order Value" value={formatCurrency(o?.itemsPrice)} />
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <Separator />
                                        <OrderCard order={o} />
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                    :
                    <NoData />
            }
        </>
    )
}

export default MyOrders
