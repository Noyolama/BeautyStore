import { createContext } from "react";

type WishlistContextType = {
    wishlist: Product[];
    updateWishlist: (_?: Product[]) => void;
    isWhislistedProduct: (_: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType>({
    wishlist: [],
    updateWishlist: (_?: Product[]) => { },
    isWhislistedProduct: (_: string) => false
});
