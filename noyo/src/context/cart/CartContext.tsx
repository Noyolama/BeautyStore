import type { CartItem } from "@/api";
import { createContext } from "react";

type CartContextType = {
    cartItems: CartItem[];
    updateCart: (_: CartItem[]) => void;
    getTotalPrice: () => number
}

export const CartContext = createContext<CartContextType>({
    cartItems: [] as CartItem[],
    updateCart: (_: CartItem[]) => { },
    getTotalPrice: () => 0
});
