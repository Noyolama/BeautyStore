import { WishlistContext } from "@/context/wishlist/WishlistContext";
import { useContext } from "react";

export const useWishlist = () => useContext(WishlistContext);