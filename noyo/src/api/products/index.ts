import api from "@/api/axiosClient"
import { appendFormData } from "@/lib/utils";
import z from "zod";

export const productFormSchema = z.object({
    name: z.string().min(2, 'Required'),
    description: z.string().min(10, 'Required'),
    price: z
        .number()
        .positive('Price cannot be negative.')
        .refine(value => {
            console.log(value)
            const decimalPlaces = (value.toString().split('.')[1] || '').length;
            return decimalPlaces <= 2;
        }),
    category: z.string().min(2, 'Required'),
    brand: z.string().min(2, 'Required'),
    skinType: z.array(z.string()).nonempty("Select at least one."),
    stock: z.number()
        .positive('Stock cannot be negative.')
        .int({ message: 'Value cannot be in decimal.' }),
    files: z.array(z.any()).optional()
})

const _processProductData = (formData: FormData, data: Product) => {
    const fileData = data?.files

    delete data.files

    appendFormData(formData, data, true)

    let i = 0;

    fileData?.forEach((file) => {
        if (file?.file && file?.file instanceof File) {
            formData.append("images", file?.file);
        } else {
            formData.append(`files[${i}][_id]`, file._id);
            formData.append(`files[${i}][preview]`, file.preview);
            formData.append(`files[${i}][uploaded]`, file.uploaded);
            formData.append(`files[${i}][public_id]`, file.public_id);
            i = i + 1;
        }
    });
}

export type Product = z.infer<typeof productFormSchema>

export const fetchPaginatedProductsForAdmin = async (page: number, itemsPerPage: number, filter: FilterType) => {
    const addons = {
        params: {
            page,
            limit: itemsPerPage || 10,
            ...filter
        }
    }
    const res = await api.get('/products', addons)
    return res?.data
}

export const fetchPaginatedActiveProducts = async (filters: FilterType) => {
    const addons = {
        params: filters
    }
    const res = await api.get('/products/active', addons)
    return res?.data?.data
}

export const createProduct = async (data: Product) => {
    const formData = new FormData();
    _processProductData(formData, data);

    const res = await api.post('/products/create', formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    return res?.data
}

export const updateProduct = async (id: string, data: Product) => {
    const formData = new FormData();

    _processProductData(formData, data)

    const res = await api.put(`/products/${id}`, formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    )
    return res?.data
}

export const fetchProductDetailById = async (id: string) => {
    const res = await api.get(`/products/${id}/detail`)
    return res?.data?.data
}

export const fetchProductDetailForPublic = async (id: string) => {
    const res = await api.get(`/products/${id}`)
    return res?.data?.data
}

export const deleteProductById = async (id: number | string) => {
    const res = await api.delete(`/products/${id}`)
    return res?.data
}