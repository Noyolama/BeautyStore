import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
} from "@/components/ui/field"
import { skinTypes } from "@/constants"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchProductDetailById, updateProduct, type Product } from "@/api"
import { useNavigate, useParams } from "react-router"
import { SmartForm } from "@/components/custom/SmartForm"
import { useEffect } from "react"
import { transformApiImages } from "@/lib/utils"
import z from "zod"

const editProductFormSchema = z.object({
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
    files: z.array(z.any())
})

export default function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: product, isLoading } = useQuery({
        queryKey: ['product-detail', id],
        queryFn: () => fetchProductDetailById(id!),
        enabled: !!id,
        refetchOnWindowFocus: false, // don't refetch on tab change
        refetchOnReconnect: false,   // don't refetch on reconnect
        retry: false,
    })
    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: string, data: Product }) => updateProduct(id, data),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            navigate('/admin/products')
        }
    })

    const form = useForm({
        defaultValues: {
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price || 0,
            category: product?.category || '',
            brand: product?.brand || '',
            stock: product?.stock || 0,
            skinType: product?.skinType || [] as string[],
            files: transformApiImages(product?.images)
        },
        validators: {
            onSubmit: editProductFormSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            if (!id) return toast.error('ID not found')
            mutation.mutate({ id, data: value })
        },
        formId: 'edit-product-form',
    })

    useEffect(() => {
        if (!isLoading) {
            form.reset()
        }
    }, [isLoading, form])

    if(isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Edit Product</CardTitle>
                    <CardDescription>
                        Fill up all these details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SmartForm
                        className="grid gap-4 grid-cols-1 lg:grid-cols-2"
                        form={form}
                        inputItems={
                            [
                                {
                                    key: 'name',
                                    label: 'Product Name',
                                },
                                {
                                    key: 'brand',
                                    label: 'Brand',
                                },
                                {
                                    key: 'category',
                                    label: 'Product Category',
                                },
                                {
                                    key: 'skinType',
                                    label: 'Skin Type',
                                    type: 'multi-select',
                                    options: skinTypes,
                                },
                                {
                                    key: 'price',
                                    label: 'Price',
                                    type: 'number'
                                },
                                {
                                    key: 'stock',
                                    label: 'Stock',
                                    type: 'number'
                                },
                                {
                                    key: 'description',
                                    label: 'Description',
                                    type: 'html',
                                    className: 'col-span-1 lg:col-span-2'
                                },
                                {
                                    key: 'files',
                                    label: 'Images',
                                    type: 'multi-image',
                                    className: 'col-span-1 lg:col-span-2'
                                },
                            ]
                        }
                    />
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="edit-product-form">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </>
    )
}
