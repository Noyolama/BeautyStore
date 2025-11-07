import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionBodyColumn, ActionHeaderColumn } from "@/components/table/columns/ActionColumn"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProductById } from "@/api"
import { toast } from "sonner"
import { useConfirm } from "@/hooks"
import { formatCurrency } from "@/utils"

export const useProductColumns = (): ColumnDef<Product>[] => {
    const navigate = useNavigate()
    const { confirm } = useConfirm()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => deleteProductById(id),
        onSuccess: data => {
            toast.success(data?.message || 'Sucess')
            queryClient.invalidateQueries({
                queryKey: ['admin-products']
            });
        }
    })

    return [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "category",
            size: 50,
            header: "Category",
        },
        {
            accessorKey: "brand",
            size: 50,
            header: "Brand",
        },
        {
            accessorKey: "price",
            size: 50,
            header: "Price",
            cell: ({ row }) => formatCurrency(row.original.price)
        },
        {
            id: "actions",
            size: 25,
            header: () => <ActionHeaderColumn />,
            cell: ({ row }) => {
                const product = row?.original;

                const handleDelete = async () => {
                    const confirmed = await confirm({});

                    if (confirmed) {
                        mutation.mutate(product?._id)
                    }
                }

                return (
                    <ActionBodyColumn
                        actionItems={[
                            {
                                label: 'Edit',
                                onClick: () => navigate(`/admin/products/${product?._id}/edit`),
                            },
                            {
                                label: 'Delete',
                                onClick: handleDelete
                            },
                        ]}
                    />
                )
            }
        }
    ]
}
