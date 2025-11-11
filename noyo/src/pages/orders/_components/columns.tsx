import type { ColumnDef } from "@tanstack/react-table"
import { formatCurrency } from "@/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NoImage from '/images/no-image.jpg'

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

export const usePublicOrderDetailColumns = (): ColumnDef<any>[] => {
    return [
        {
            accessorKey: 'name',
            header: 'Product',
            cell: ({ row }) => {
                const orderItem = row.original
                return (
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={orderItem?.image || NoImage} alt="product-image" />
                            <AvatarFallback className="rounded-lg">N/A</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{orderItem?.name}</span>
                            <span className="font-light italic">({orderItem?.quantity} pcs)</span>
                        </div>
                    </div>
                )
            }
        },
        {
            accessorKey: 'price',
            header: 'Rate',
            size: 50,
            cell: ({ row }) => formatCurrency(row.original.price)
        },
    ]
}
