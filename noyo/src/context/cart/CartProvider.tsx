import type { CartItem } from "@/api";
import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Save cart to localStorage when updated
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const updateCart = (data: CartItem[]) => {
        setCartItems(data)
        localStorage.setItem("cart", JSON.stringify(data));
    }

    // Get total
    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                getTotalPrice,
                updateCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
