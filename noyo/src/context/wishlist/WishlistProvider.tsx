import { useState, useEffect } from "react";
import { WishlistContext } from "./WishlistContext";

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Save cart to localStorage when updated
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const updateWishlist = (data?: Product[]) => {
        setWishlist(data || [])
        localStorage.setItem("wishlist", JSON.stringify(data));
    }

    const isWhislistedProduct = (id: string) => (wishlist || [])?.map(w => w?._id).includes(id)

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                isWhislistedProduct,
                updateWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
