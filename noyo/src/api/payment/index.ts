import api from "../axiosClient"

export const initializePayment = async (data: any) => {
    const res = await api.post('/payment/initiate-payment', data)
    return res?.data
}

export const verifyPaymentStatus = async (data: any) => {
    const res = await api.post('/payment/payment-status', data)
    return res?.data
}