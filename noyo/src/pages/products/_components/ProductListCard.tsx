import { Button } from "@/components/ui/button";
import { useAddtoCart, useAuth } from "@/hooks";
import { formatCurrency } from "@/utils";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import NoImage from '/images/no-image.jpg'
import { HeartIcon } from "lucide-react";
import { useAddtoWishlist, useWishlist } from "@/hooks/wishlist";
import { cn } from "@/lib/utils";
import { useRemoveWishlistItem } from "@/hooks/wishlist/use-remove-wishlist-item";
import { CustomImage } from "@/components/atoms/CustomImage";

type ProductImage = {
    _id: string;
    public_id: string;
    url: string;
}

export type Product = {
    _id: string;
    images: ProductImage[];
    name: string;
    price: number;
}

interface ProductListCardProps {
    product: Product
}

export function ProductListCard({ product }: ProductListCardProps) {
    const { currentUser } = useAuth()
    const { isWhislistedProduct } = useWishlist()
    const addProductToCart = useAddtoCart()
    const removeProductFromWishlist = useRemoveWishlistItem()
    const addProductToWishlist = useAddtoWishlist()
    const navigate = useNavigate()

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!currentUser) {
            toast.error('You need to login first.')
            navigate('/auth')
            return
        }

        addProductToCart.mutate({
            productId: product?._id,
            quantity: 1
        })
    }

    const handleAddToWishlist = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
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

    return (
        <div className="rounded-md border transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] p-2 cursor-pointer"
            onClick={() => product?._id && navigate(`/products/${product?._id}/detail`)}
        >
            <CustomImage
                src={product?.images?.[0]?.url || NoImage}
                alt={product?._id}
                className="object-cover rounded-md border w-full min-h-[225px] max-h-[225px]"
            />
            <div className="my-2 h-[30px] leading-none">
                {product?.name || 'N/A'}
            </div>
            <div className="flex justify-between">
                <div className="text-lg font-bold">
                    {formatCurrency(product?.price)}
                </div>
                <div className={cn(isWhislistedProduct(product?._id) && "*:[svg]:fill-primary *:[svg]:stroke-primary")} onClick={handleAddToWishlist}>
                    <HeartIcon />
                </div>
            </div>
            <Button className="w-full rounded-sm mt-2 p-2 text-balance cursor-pointer" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
