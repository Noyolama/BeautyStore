import { fetchProductDetailForPublic } from "@/api";
import GalleryMode from "@/components/carousel/GalleryMode";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAddtoCart, useAuth } from "@/hooks";
import { useAddtoWishlist, useWishlist } from "@/hooks/wishlist";
import { useRemoveWishlistItem } from "@/hooks/wishlist/use-remove-wishlist-item";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const ProductDetail = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { data: product, isLoading: isDataFetching } = useQuery({
        queryKey: ['product-detail', productId],
        queryFn: () => fetchProductDetailForPublic(productId!),
        enabled: !!productId,
        refetchOnWindowFocus: false, // don't refetch on tab change
        refetchOnReconnect: false,   // don't refetch on reconnect
        retry: false,
    })

    const [quantity, setQuantity] = useState(1)
    const addItemToCart = useAddtoCart()
    const addProductToWishlist = useAddtoWishlist()
    const removeProductFromWishlist = useRemoveWishlistItem()
    const { isWhislistedProduct } = useWishlist()

    const handleAddToCart = () => {
        if (!currentUser) {
            toast.error('You need to login first.')
            navigate('/auth')
            return
        }
        const data = {
            productId: product?._id,
            quantity,
        }
        addItemToCart.mutate(data)
    }

    const handleAddToWishlist = () => {
        if (!currentUser) {
            toast.error('You need to login first.')
            navigate('/auth')
            return
        }

        if (isWhislistedProduct(product?._id)) {
            removeProductFromWishlist.mutate(product?._id)
        } else {
            addProductToWishlist.mutate({
                productId: product?._id,
            })
        }
    }

    if (isDataFetching) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <GalleryMode
                        images={product?.images || []}
                    />
                </div>
                <div>
                    <div className="text-3xl antialiased font-bold font-stretch-extra-expanded tracking-wide">
                        {product?.name}
                    </div>
                    <div className="flex gap-2 my-2">
                        <Label className="font-light">Brand:</Label>
                        <div className="font-medium">
                            {product?.brand}
                        </div>
                        |
                        <Label className="font-light">Category:</Label>
                        <div className="font-medium">
                            {product?.category}
                        </div>
                    </div>

                    <Separator className="my-4" />
                    <div className="flex justify-between">
                        <div className="font-bold text-2xl tracking-widest text-primary">
                            {formatCurrency(product?.price)}
                        </div>
                        <div
                            className={cn("cursor-pointer", isWhislistedProduct(product?._id) && "*:[svg]:fill-primary *:[svg]:stroke-primary")}
                            onClick={handleAddToWishlist}>
                            <HeartIcon />
                        </div>
                    </div>

                    <div className="flex gap-4 h-[48px] mt-4">
                        <div className="flex items-center w-fit text-xl">
                            <Button
                                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                                variant="ghost"
                                className="rounded-none hover:rounded-none cursor-pointer p-6 border-y border-l h-full"
                            >
                                -
                            </Button>
                            <div className="w-[25px] border-y h-full flex items-center text-center justify-center p-6">
                                {quantity}
                            </div>
                            <Button
                                onClick={() => setQuantity(quantity + 1)}
                                variant="ghost"
                                className="rounded-none hover:rounded-none cursor-pointer p-6 border-y border-r"
                            >
                                +
                            </Button>
                        </div>
                        <Button className="flex-1 rounded-none h-[48px] text-xl cursor-pointer" size="lg" onClick={handleAddToCart}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>

            <div className="pl-4 border-y">
                <div className="py-2">
                    <h1 className="font-bold underline mb-2">Product Details</h1>
                    <div className="ProseMirror simple-editor-content">
                        <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;
