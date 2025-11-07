import Status from "../table/columns/StatusColumn";

interface DisplayValueProps {
    value?: string | number | null | undefined;
    label: string;
    type?: 'text' | 'date' | 'number' | 'status';
    customValueDisplay?: React.ReactNode;
}

const DisplayValue = ({ value, label, type = 'text', customValueDisplay }: DisplayValueProps) => {
    return (
        <div>
            <div className="text-xs text-muted-foreground">
                {label}:
            </div>
            <div className="text-sm font-medium">
                {
                    customValueDisplay ? customValueDisplay :
                        type === 'status' ?
                            <Status status={value as string} />
                            : value ?? 'N/A'
                }
            </div>
        </div>
    )
}

export default DisplayValue;