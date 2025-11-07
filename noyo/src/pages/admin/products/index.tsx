import { fetchPaginatedProductsForAdmin } from "@/api"
import PageHeader from "@/components/atoms/PageHeader"
import { DataTable, type Meta } from "@/components/table/DataTable"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { useProductColumns } from "@/pages/admin/products/components/columns"
import { useState } from "react"

const AdminProducts = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [filter, setFilter] = useState<{ keyword: string }>({
        keyword: ''
    })
    const productColumns = useProductColumns()
    const { data, isLoading } = useQuery({
        queryKey: ['admin-products', page, filter, itemsPerPage],
        queryFn: () => fetchPaginatedProductsForAdmin(page, itemsPerPage, filter),
    })

    const handleRefetch = (metaData: Meta) => {
        setPage(metaData.currentPage)
        setItemsPerPage(metaData.itemsPerPage)
    }

    const handleCreateAction = () => {
        navigate('/admin/products/create')
    }

    return (
        <div>
            <PageHeader title="Products" filter={filter} onFilterUpdate={(val) => setFilter(val)}>
                <Button onClick={handleCreateAction}>Add</Button>
            </PageHeader>
            {
                !isLoading &&
                <DataTable columns={productColumns} data={data?.data || []} meta={data?.meta} onChange={handleRefetch} />
            }
        </div>
    )
}

export default AdminProducts
