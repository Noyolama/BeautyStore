import { getAllCategory } from "@/api";
import { SmartForm } from "@/components/custom/SmartForm";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import z from "zod";

const filterFormSchema = z.object({
    keyword: z.string(),
    categories: z.array(z.string())
})

interface ProductFilterProps {
    filters: CommonFilter
    onChange: (_: z.infer<typeof filterFormSchema>) => void
}

export const ProductFilter = ({ filters, onChange }: ProductFilterProps) => {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['all-filter-categories'],
        queryFn: () => getAllCategory(),
    })

    const form = useForm({
        defaultValues: {
            keyword: filters?.keyword || '',
            categories: filters?.categories || '',
        },
        validators: {
            onSubmit: filterFormSchema
        },
        onSubmit: ({ value }) => {
            onChange(value)
        },
        formId: 'client-product-filter'
    })

    if(isLoading) {
        return <div>Loading...</div>
    }
    return (
        <div className="w-full rounded-lg border p-6">
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Filter</FieldLegend>
                        <FieldDescription>
                            Fill up these fields to filter products.
                        </FieldDescription>
                        <SmartForm
                            form={form}
                            inputItems={[
                                {
                                    key: 'keyword',
                                    label: 'Search',
                                    placeholder: "Eg: Cetaphil toner"
                                },
                                {
                                    key: 'categories',
                                    label: 'Categories',
                                    placeholder: 'Select Categories',
                                    items: categories,
                                    labelKey: 'name',
                                    valueKey: '_id',
                                    type: 'multi-select',
                                }
                            ]}
                        />
                    </FieldSet>

                    <Field orientation="horizontal">
                        <Button variant="outline" type="button" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="client-product-filter">Filter</Button>
                    </Field>
                </FieldGroup>
        </div>
    )
}
