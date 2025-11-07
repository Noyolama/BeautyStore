import { useLogout, useUser } from "@/lib/auth/authConfig";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchCart, fetchWishlist } from "@/api";
import { useCart } from "@/hooks";
import { AuthContext, type CurrentUser } from "./AuthContext";
import { useWishlist } from "@/hooks/wishlist";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const { data: user, isLoading } = useUser({
    refetchOnWindowFocus: false, // don't refetch on tab change
    refetchOnReconnect: false,   // don't refetch on reconnect
    retry: false,
  })
  const { updateCart } = useCart()
  const { updateWishlist } = useWishlist()
  const logMeOut = useLogout({
    onSuccess: () => {
      toast.success('Logged out successfully.')
    }
  })

  const { data: wishlist, isLoading: isWishlistDataFetching } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => fetchWishlist(),
    enabled: !!user,
    refetchOnWindowFocus: false, // don't refetch on tab change
    refetchOnReconnect: false,   // don't refetch on reconnect
    retry: false,
  })

  const { data: cart, isLoading: isCartDataFetching } = useQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCart(),
    enabled: !!user,
    refetchOnWindowFocus: false, // don't refetch on tab change
    refetchOnReconnect: false,   // don't refetch on reconnect
    retry: false,
  })

  useEffect(() => {
    if (!isLoading && user) {
      setCurrentUser(user)
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (!isCartDataFetching && cart) {
      updateCart(cart?.cart || [])
    }
  }, [cart, isCartDataFetching, updateCart]);

  useEffect(() => {
    if (!isWishlistDataFetching && wishlist) {
      updateWishlist(wishlist)
    }
  }, [wishlist, isWishlistDataFetching, updateWishlist]);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    logMeOut.mutate({})
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

