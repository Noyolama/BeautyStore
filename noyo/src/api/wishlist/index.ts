import api from "@/api/axiosClient"

export type WishlistEntryItem = {
    productId: string,
}

export const addItemToWishlist = async (wishlistEntryItem: WishlistEntryItem) => {
    const res = await api.post('users/wishlist', wishlistEntryItem)
    return res?.data
}

export const removeItemFromWishlist = async (productId: string) => {
    const res = await api.delete(`users/wishlist/${productId}`)
    return res?.data
}

// export const decreaseItemFromCart = async (productId: string) => {
//     const res = await api.put(`users/cart/${productId}/decrease`)
//     return res?.data
// }

export const fetchWishlist = async (): Promise<Product[]> => {
    const res = await api.get('users/wishlist')
    return res?.data?.data
}

