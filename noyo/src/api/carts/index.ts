import api from "@/api/axiosClient"

export type CartEntryItem = {
    productId: string,
    quantity: number,
}

export type CartItem = {
    _id: string,
    product: Product,
    quantity: number,
}

export const addItemToCart = async (cartEntryItem: CartEntryItem) => {
    const res = await api.post('users/cart', cartEntryItem)
    return res?.data
}

export const removeItemFromCart = async (productId: string) => {
    const res = await api.delete(`users/cart/${productId}`)
    return res?.data
}

export const decreaseItemFromCart = async (productId: string) => {
    const res = await api.put(`users/cart/${productId}/decrease`)
    return res?.data
}

export const fetchCart = async () => {
    const res = await api.get('users/cart')
    return res?.data
}

