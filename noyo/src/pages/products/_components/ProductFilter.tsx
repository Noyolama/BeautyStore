import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import z from "zod";

const filterFormSchema = z.object({
    keyword: z.string()
})

interface ProductFilterProps {
    filters: CommonFilter
    onChange: (_: z.infer<typeof filterFormSchema>) => void
}

export const ProductFilter = ({ filters, onChange }: ProductFilterProps) => {
    const form = useForm({
        defaultValues: {
            keyword: filters?.keyword || '',
        },
        validators: {
            onSubmit: filterFormSchema
        },
        onSubmit: ({ value }) => {
            onChange(value)
        },
        formId: 'client-product-filter'
    })
    return (
        <div className="w-full rounded-lg border p-6">
            <form id="client-product-filter" onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Filter</FieldLegend>
                        <FieldDescription>
                            Fill up these fields to filter products.
                        </FieldDescription>
                        <FieldGroup>
                            <form.Field
                                name="keyword"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor="keyword">
                                                Search
                                            </FieldLabel>
                                            <Input
                                                id="keyword"
                                                name="keyword"
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="Eg: Cetaphil toner"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            >

                            </form.Field>
                        </FieldGroup>
                    </FieldSet>

                    <Field orientation="horizontal">
                        <Button variant="outline" type="button" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit">Filter</Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}
