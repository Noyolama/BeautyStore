import type { ColumnDef } from "@tanstack/react-table"
import { ActionBodyColumn, ActionHeaderColumn } from "@/components/table/columns/ActionColumn"
import { formatCurrency, getInitials, simplifyDate } from "@/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Status from "@/components/table/columns/StatusColumn"
import { useNavigate } from "react-router"


type User = {
    _id: string;
    name: string;
    email: string;
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SavedOrder = Order & {
    _id: string;
    user: User;
    createdAt: Date;
    orderStatus: string;
}

export const useOrderColumns = (): ColumnDef<SavedOrder>[] => {
    const navigate = useNavigate()
    // const queryClient = useQueryClient()
    // const mutation = useMutation({
    //     mutationFn: (id: string) => deleteProductById(id),
    //     onSuccess: data => {
    //         toast.success(data?.message || 'Sucess')
    //         queryClient.invalidateQueries({
    //             queryKey: ['admin-products']
    //         });
    //     }
    // })

    return [
        {
            accessorKey: 'orderStatus',
            header: 'Status',
            cell: ({ row }) => {
                return (
                    <Status status={row.original.orderStatus} />
                )
            },
            size: 50,
        },
        {
            accessorKey: "createdAt",
            header: 'Order Date',
            size: 50,
            cell: ({ row }) => simplifyDate(row?.original?.createdAt)
        },
        {
            id: "user",
            header: "Customer",
            cell: ({ row }) => {
                const { name, email } = row.original.user
                return (
                    <div className="flex gap-2">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg bg-primary">{getInitials(name)}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{name}</span>
                            <span className="truncate text-xs text-muted-foreground">{email}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: "itemsPrice",
            header: "Order Value",
            size: 50,
            cell: ({ row }) => {
                return (
                    <div>{formatCurrency(row.original.itemsPrice)}</div>
                )
            }
        },
        {
            id: "products",
            header: "Products",
            size: 50,
            cell: ({ row }) => `${row.original.orderItems.length} product(s)`
        },
        {
            id: "qty",
            header: "Qty",
            size: 30,
            cell: ({ row }) => `${row.original.orderItems.reduce((sum: number, i) => sum + (i?.quantity || 0), 0)} pcs`
        },
        {
            id: "actions",
            size: 30,
            header: () => <ActionHeaderColumn />,
            cell: ({ row }) => {
                const order = row?.original;
                return (
                    <ActionBodyColumn
                        actionItems={[
                            {
                                label: 'View',
                                onClick: () => { navigate(`/admin/orders/${order._id}/detail`) }
                            },
                        ]}
                    />
                )
            }
        }
    ]
}

export const useOrderDetailColumns = (): ColumnDef<any>[] => {
    return [
        {
            accessorKey: 'name',
            header: 'Product Name',
            cell: ({ row }) => {
                const orderItem = row.original
                return (
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={orderItem?.image} alt="product-image" />
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{orderItem?.name}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'quantity',
            header: 'Quantity',
            cell: ({ row }) => `${row.original.quantity} pcs`,
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => formatCurrency(row.original.price)
        },
        {
            accessorKey: 'total',
            header: 'Total',
            cell: ({ row }) => formatCurrency(row.original.price * row.original.quantity)
        }
    ]
}
