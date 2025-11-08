import api from "../axiosClient"

export const createCategory = async (data: Omit<Category, '_id'>) => {
    const res = await api.post('/category', data)
    return res?.data
}

export const deleteCategory = async (categoryId: number) => {
    const res = await api.delete(`/category/${categoryId}`)
    return res?.data
}

export const getAllCategory = async (): Promise<Category[]> => {
    const res = await api.get('/category')
    return res?.data?.data
}