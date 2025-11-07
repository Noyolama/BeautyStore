import { useQuery } from "@tanstack/react-query"
import { ProductFilter } from "./_components/ProductFilter"
import { ProductListCard, type Product } from "./_components/ProductListCard"
import { fetchPaginatedActiveProducts } from "@/api"
import { useState } from "react"
import { NoData } from "@/components/layouts/NoData"

const PublicProducts = () => {
    const [filters, setFilters] = useState<CommonFilter>({ keyword: "" })
    const { data: products, isLoading } = useQuery({
        queryKey: ['active-products', filters],
        queryFn: () => fetchPaginatedActiveProducts(filters),
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-12">
            <div className="col-span-1">
                <ProductFilter filters={filters} onChange={(data) => setFilters(data)} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <div className="text-2xl font-bold mb-2">All Products</div>
                {
                    !isLoading && products?.length > 0
                        ?
                        (
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products?.map((product: Product, index: number) => (
                                    <ProductListCard key={index} product={product} />
                                ))}
                            </div>
                        )
                        :
                        <NoData />
                }

            </div>
        </div>
    )
}

export default PublicProducts
