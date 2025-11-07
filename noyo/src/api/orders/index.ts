import api from "@/api/axiosClient"
import z from "zod"

export const ShipingSchema = z.object({
    address: z.string().min(1, 'Required'),
    city: z.string().min(1, 'Required'),
    postalCode: z.string().min(1, 'Required'),
    country: z.string().min(1, 'Required'),
})

export const createOrder = async (data: Partial<Order>) => {
    const res = await api.post('/orders', data)
    return res?.data
}

export const fetchPaginatedOrdersForAdmin = async (page: number, itemsPerPage: number, filter: FilterType) => {
    const addons = {
        params: {
            page,
            limit: itemsPerPage || 10,
            ...filter
        }
    }
    const res = await api.get('/orders', addons)
    return res?.data
}

export const fetchOrderById = async (orderId: string) => {
    const res = await api.get(`/orders/${orderId}`)
    return res?.data?.data
}

export const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const res = await api.put(`/orders/${orderId}`, { status })
    return res?.data?.data
}

export const fetchMyOrders = async (addons?: Addons): Promise<Order[]> => {
    const params = {
        ...addons,
        status: addons?.status?.join(',')
    };
    const res = await api.get('/orders/myorders', { params })
    return res?.data?.data
}