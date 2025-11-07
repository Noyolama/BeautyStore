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
import { useMutation } from "@tanstack/react-query"
import { createProduct } from "@/api"
import { useNavigate } from "react-router"
import { SmartForm } from "@/components/custom/SmartForm"
import z from "zod"

const createProductFormSchema = z.object({
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

export default function CreateProduct() {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            navigate('/admin/products')
        }
    })

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            category: "",
            brand: "",
            stock: 0,
            skinType: [] as string[],
            files: [] as any[]
        },
        validators: {
            onSubmit: createProductFormSchema,
        },
        onSubmit: async ({ value }) => {
            mutation.mutate(value)
        },
        formId: 'create-product-form'

    })

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Create Product</CardTitle>
                    <CardDescription>
                        Fill up all these details below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SmartForm
                        form={form}
                        className="grid gap-4 grid-cols-1 lg:grid-cols-2"
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
                        <Button type="submit" form="create-product-form">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </>
    )
}
