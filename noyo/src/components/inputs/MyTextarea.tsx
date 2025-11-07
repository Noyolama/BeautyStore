import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

interface MyCommonInputProps {
    name: string
    value: string
    onBlur: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    placeholder: string
    isInvalid: boolean
}

export const MyTextarea = ({ name, value, onBlur, onChange, placeholder, isInvalid }: MyCommonInputProps) => {
    return (
        <>
            <InputGroup>
                <InputGroupTextarea
                    id={name}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={isInvalid}
                />
                <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                        {value.length}/100 characters
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        </>
    )
}