import { fetchOrderById, updateOrderStatus } from "@/api"
import { ActionDropDown } from "@/components/atoms/ActionDropDown"
import DisplayValue from "@/components/atoms/DisplayValue"
import { DataTable } from "@/components/table/DataTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useConfirm } from "@/hooks"
import { formatCurrency, simplifyDate } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { toast } from "sonner"
import { useOrderDetailColumns } from "./components/columns"
import { useMemo } from "react"

const AdminOrderDetail = () => {
    const { orderId } = useParams()
    const { confirm } = useConfirm()
    const orderDetailColumns = useOrderDetailColumns()
    const queryClient = useQueryClient()
    const { data: order, isLoading } = useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: () => fetchOrderById(orderId!),
        enabled: !!orderId,
    })

    const updateOrderStatusMutation = useMutation({
        mutationFn: ({ orderId, status }: { orderId: string, status: OrderStatus }) => updateOrderStatus(orderId, status),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            queryClient.invalidateQueries({ queryKey: ['order-detail'] });
        }
    })

    const handleCancelOrder = async () => {
        const confirmed = await confirm({
            confirmQuestion: "Are you sure you want to cancel this order?",
        });

        if (confirmed) {
            updateOrderStatusMutation.mutate({ orderId: orderId!, status: 'Cancelled' })
        }

    }

    const handleOrderShipment = async () => {
        const confirmed = await confirm({
            confirmQuestion: "Are you sure you want to ship this order?",
        });

        if (confirmed) {
            updateOrderStatusMutation.mutate({ orderId: orderId!, status: 'Shipped' })
        }

    }

    const handleOrderDelivery = async () => {
        const confirmed = await confirm({
            confirmQuestion: "Are you sure you want to mark this order as delivered?",
        });

        if (confirmed) {
            updateOrderStatusMutation.mutate({ orderId: orderId!, status: 'Delivered' })
        }

    }

    const orderSummaryData = useMemo(() => {
        if (!order) return []
        return [
            { label: 'Order Total', value: formatCurrency(order?.itemsPrice) },
            { label: 'Delivery Fee', value: formatCurrency(order?.shippingPrice) },
        ]
    }, [order])

    const orderActions = useMemo(() => {
        const actionList = []

        if (order?.orderStatus === 'Processing') {
            actionList.push(
                {
                    label: 'Mark as shipped',
                    onClick: handleOrderShipment,
                },
                {
                    label: 'Cancel Order',
                    onClick: handleCancelOrder,
                }
            )
        } else if (order?.orderStatus === 'Shipped') {
            actionList.push(
                {
                    label: 'Mark as Delivered',
                    onClick: handleOrderDelivery,
                }
            )
        }

        return actionList
    }, [order, handleCancelOrder, handleOrderShipment, handleOrderDelivery])

    return (
        <>
            <div className="flex justify-between items-center border-y py-4 px-2">
                <div className="text-xl font-semibold uppercase">
                    Order No. #{order?._id}
                </div>
                <div>
                    <ActionDropDown
                        actionItems={orderActions}
                    />
                </div>
            </div>

            <Card className="py-4">
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <DisplayValue label="Order Status" value={order?.orderStatus} type="status" />
                    <DisplayValue label="Order Date" value={simplifyDate(order?.createdAt)} />
                    <DisplayValue label="Customer"
                        customValueDisplay={
                            (
                                <div>
                                    {order?.user?.name}<span className="truncate text-xs text-muted-foreground">({order?.user?.email})</span>
                                </div>
                            )
                        }
                    />
                    <DisplayValue label="Order Value" value={formatCurrency(order?.itemsPrice)} />
                </CardContent>
            </Card>

            {
                isLoading ? (
                    <div>Loading...</div>
                ) :
                    <Card className="py-4 gap-0">
                        <CardHeader className="px-2">
                            <h2 className="text-xl font-medium tracking-tight">
                                Order Details
                            </h2>
                        </CardHeader>
                        <CardContent className="px-0">
                            <DataTable columns={orderDetailColumns} data={order.orderItems} className="border-none rounded-none" />
                        </CardContent>
                    </Card>
            }

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
                                <div className="font-bold">
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
        </>

    )
}

export default AdminOrderDetail
