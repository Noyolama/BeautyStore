import { createOrder, ShipingSchema } from "@/api";
import { SmartForm } from "@/components/custom/SmartForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks";
import { formatCurrency } from "@/utils";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Shiping = () => {
    const { cartItems, getTotalPrice } = useCart()
    const queryClient = useQueryClient()
    const itemsTotal = getTotalPrice()
    const navigate = useNavigate()

    const placeOrder = useMutation({
        mutationFn: (data: Partial<Order>) => createOrder(data),
        onSuccess: (data) => {
            console.log(data)
            toast.success('Order placed successfully.')
            queryClient.invalidateQueries({ queryKey: ['carts'] });
            navigate('/')
        }
    })
    const form = useForm({
        defaultValues: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
        },
        validators: {
            onSubmit: ShipingSchema
        },
        onSubmit: ({ value }) => {
            if(cartItems?.length <= 0) {
                toast.error('You need to add products in cart first.')
                return
            }
            const data = {
                shippingInfo: value,
                orderItems: cartItems.map((i) => {
                    return {
                        name: i?.product?.name,
                        quantity: i?.quantity,
                        image: i?.product?.images?.[0]?.url,
                        price: i?.product?.price,
                        product: i?.product?._id,
                    }
                }),
                // TODO:Integrate payment later on
                paymentInfo: {
                    id: 'Test',
                    status: 'Paid',
                },
                itemsPrice: itemsTotal,
                shippingPrice: 50,
            }

            placeOrder.mutate(data)
        },
        formId: 'shipping-info-form'
    })

    const orderDetailData = {
        subItems: [
            {
                label: `Items Total (${cartItems.length} Items)`,
                value: formatCurrency(itemsTotal),
            },
            {
                label: `Shipping Fee`,
                value: formatCurrency(50),
            },
        ],
        totalData: {
            label: 'Total:',
            value: formatCurrency(itemsTotal + 50)
        }
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>
                        Shiping Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SmartForm
                        form={form}
                        inputItems={[
                            {
                                key: 'address',
                                label: 'Address',
                            },
                            {
                                key: 'city',
                                label: 'City',
                            },
                            {
                                key: 'postalCode',
                                label: 'Postal Code',
                            },
                            {
                                key: 'country',
                                label: 'Country',
                            }
                        ]}
                    />
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" form="shipping-info-form">
                        Place Order
                    </Button>
                </CardFooter>
            </Card>
            <Card className="col-span-1 h-fit">
                <CardHeader>
                    <CardTitle>
                        Order Details
                    </CardTitle>
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
                </CardContent>
            </Card>
        </div>
    )
}

export default Shiping;
