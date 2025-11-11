import { fetchOrderById } from "@/api"
import DisplayValue from "@/components/atoms/DisplayValue"
import { DataTable } from "@/components/table/DataTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatCurrency, generateUniqueId, simplifyDate } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import { usePublicOrderDetailColumns } from "./_components/columns"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { initializePayment, verifyPaymentStatus } from "@/api/payment"
import { useAuth } from "@/hooks"
import { toast } from "sonner"
import { useEffect } from "react"
import { useLoading } from "@/context/LoadingContext"

const OrderDetail = () => {
    const { orderId } = useParams()
    const { currentUser } = useAuth()
    const { setLoading } = useLoading()
    const queryClient = useQueryClient()
    const orderDetailColumns = usePublicOrderDetailColumns()
    const { data: order, isLoading } = useQuery({
        queryKey: ['order-detail', orderId],
        queryFn: () => fetchOrderById(orderId!),
        enabled: !!orderId,
    })

    const proceedPayment = useMutation({
        mutationFn: (data: any) => initializePayment(data),
        onSuccess: (data) => {
            console.log(data)
            if (data?.url) {
                window.location.href = data.url;
            } else {
                toast.error('Something went wrong.')
            }
        }
    })

    const orderDetailData = {
        subItems: [
            {
                label: `Items Total (${order?.orderItems?.length} Items)`,
                value: formatCurrency(order?.itemsPrice),
            },
            {
                label: `Shipping Fee`,
                value: formatCurrency(50),
            },
        ],
        totalData: {
            label: 'Total:',
            value: formatCurrency(order?.itemsPrice + 50)
        }
    }

    const handlePayment = () => {
        const orderId = generateUniqueId(order?._id)
        sessionStorage.setItem("current_transaction_id", orderId);

        const data = {
            orderId,
            customerOrderId: order?._id,
            customerName: currentUser?.name,
            customerEmail: currentUser?.name,
            customerPhone: order?.shippingInfo?.phone,
            amount: order?.itemsPrice + order?.shippingPrice,
            paymentGateway: "esewa",
        }
        proceedPayment.mutate(data)
    }

    useEffect(() => {
        const verifyPayment = async () => {
            if (order?.paymentInfo?.transactionId && order?.paymentInfo?.status === 'PENDING') {
                try {
                    setLoading(true)
                    await verifyPaymentStatus({
                        order_id: order?.paymentInfo?.transactionId,
                        customer_order_id: order?._id,
                    })
                    setLoading(false)
                    queryClient.invalidateQueries({ queryKey: ['order-detail'] })
                    toast.success('Payment Done.')
                } catch (_) {
                    setLoading(false)
                    toast.success('Payment Failed.')
                }
            }
        }

        verifyPayment()
    }, [order])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <Card className="py-4 mb-4">
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <DisplayValue label="Order Status" value={order?.orderStatus} type="status" />
                            <DisplayValue label="Payment Status" value={order?.paymentInfo?.status || 'Pending'} type="status" />
                            <DisplayValue label="Order Date" value={simplifyDate(order?.createdAt)} />
                            <DisplayValue label="Order Value" value={formatCurrency(order?.itemsPrice)} />
                        </CardContent>
                    </Card>
                    <Card className="py-4 gap-0 mb-4">
                        <CardHeader>
                            <h2 className="text-xl font-medium tracking-tight">
                                Delivery Information
                            </h2>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                                <DisplayValue label="Name" value={order?.shippingInfo?.name} />
                                <DisplayValue label="Name" value={order?.shippingInfo?.phone} />
                                <DisplayValue label="Street Address" value={order?.shippingInfo?.address} />
                                <DisplayValue label="City" value={order?.shippingInfo?.city} />
                                <DisplayValue label="Country" value={order?.shippingInfo?.country} />
                                <DisplayValue label="Postal Code" value={order?.shippingInfo?.postalCode} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="py-4 gap-0 mb-4">
                        <CardHeader className="px-2">
                            <h2 className="text-xl font-medium tracking-tight">
                                Items
                            </h2>
                        </CardHeader>
                        <CardContent className="px-0">
                            <DataTable columns={orderDetailColumns} data={order.orderItems} className="border-none rounded-none" />
                        </CardContent>
                    </Card>
                </div>

                <Card className="gap-0 h-fit">
                    <CardHeader>
                        <h2 className="text-xl font-medium tracking-tight">
                            Order Details
                        </h2>
                    </CardHeader>
                    <CardContent>
                        {
                            orderDetailData.subItems.map(({ label, value }, index) => (
                                <div className="flex justify-between my-4" key={index}>
                                    <div className="text-[#757575]">
                                        {label}
                                    </div>
                                    <div>
                                        {value}
                                    </div>
                                </div>
                            ))
                        }
                        <Separator />
                        <div className="flex justify-between mt-4">
                            <div>
                                {orderDetailData?.totalData?.label}
                            </div>
                            <div>
                                {orderDetailData?.totalData?.value}
                            </div>
                        </div>
                        {
                            (!(order?.paymentInfo) || ['FAILED'].includes(order?.paymentInfo?.status)) && (
                                < Button className="w-full mt-8" onClick={handlePayment}>Proceed to Pay</Button>
                            )
                        }
                    </CardContent>
                </Card>
            </div >
        </>

    )
}

export default OrderDetail
