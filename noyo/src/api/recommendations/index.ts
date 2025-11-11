import api from "@/api/axiosClient"

export const fetchRecommendationsBasedOnUser = async () => {
    const res = await api.get('/recommendation/user')
    return res?.data?.data
}

export const fetchRecommendationsBasedOnProduct = async (productId: string) => {
    const res = await api.get(`/recommendation/product/${productId}`)
    return res?.data?.data
}