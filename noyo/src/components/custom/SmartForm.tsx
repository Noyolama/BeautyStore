
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { MultiSelect, type MultiSelectOption } from "@/components/inputs/MultiSelect"
import { MyTextarea } from "@/components/inputs/MyTextarea"
import { MultipleImageUpload } from "../uploader/MultipleImageUpload"
import { cn } from "@/lib/utils"
import { SimpleEditor } from "../tiptap-templates/simple/simple-editor"
import type { AnyFieldApi } from "@tanstack/react-form"


type InputTypes = "text" | "number" | "textarea" | "custom" | "multi-select" | "multi-image" | "password" | "html"

interface inputItem {
    key: string
    label: string
    placeholder?: string
    type?: InputTypes
    render?: (field: any) => React.ReactNode
    options?: MultiSelectOption[]
    colSpan?: number // Tailwind supports 1-12
    rowSpan?: number
    className?: string
}

interface SmartFormProps {
    form: any
    inputItems: inputItem[]
    className?: string
}

interface RenderInputFieldProps {
    type?: InputTypes
    field: any
    item: inputItem
}

const renderInputField = ({ type, field, item }: RenderInputFieldProps) => {
    const commonProps = {
        id: field.name,
        name: field.name,
        value: field.state.value,
        onBlur: field.handleBlur,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            field.handleChange(type === 'number' ? parseFloat(e.target.value) : e.target.value),
        placeholder: item.placeholder || item.label,
        'aria-invalid': field.state.meta.isTouched && !field.state.meta.isValid,
        autoComplete: "off"
    }

    switch (type) {
        case "textarea":
            return <MyTextarea {...commonProps} isInvalid={field.state.meta.isTouched && !field.state.meta.isValid} />
        case "number":
            return <Input {...commonProps} type="number" />
        case "password":
            return <Input {...commonProps} type="password" />
        case "multi-select":
            return <MultiSelect
                options={item?.options || []}
                defaultValue={field.state.value || [] as string[]}
                onBlur={field.handleBlur}
                onValueChange={(value) => field.handleChange(value)}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
                placeholder={item.placeholder || item.label}
            />
        case "html":
            return <SimpleEditor
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                placeholder={item.placeholder}
            />
        case "multi-image":
            return <MultipleImageUpload
                name={field.name}
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                maxImages={5}
                aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
            />
        case "text":
        default:
            return <Input {...commonProps} type="text" />
    }
}

export const SmartForm = ({ form, inputItems, className }: SmartFormProps) => {
    return (
        <form
            id={form?._formId}
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <div className={cn('grid grid-cols-1 gap-4', className)}>
                    {
                        inputItems.map((item, index) => (
                            <form.Field
                                key={index}
                                name={item.key}
                                children={(field: AnyFieldApi) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <div className={
                                            cn('col-span-1',
                                                item?.colSpan && `sm:col-span-${item?.colSpan || 1}`,
                                                item?.rowSpan && `row-span-${item.rowSpan}`,
                                                item.className
                                            )}>
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>{item?.label}</FieldLabel>
                                                {
                                                    item?.render ? item?.render(field) : renderInputField({
                                                        type: item?.type,
                                                        field,
                                                        item
                                                    })
                                                }
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        </div>
                                    )
                                }}
                            />
                        ))

                    }
                </div>
            </FieldGroup>
        </form>
    )
}