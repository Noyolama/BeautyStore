import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { useDebounce } from "@/hooks";

type FilterTye = {
    keyword: string
}

interface PageHeaderInterface {
    children?: React.ReactNode;
    title: string;
    filter: FilterTye;
    onFilterUpdate: (_: FilterTye) => void
}

export default function PageHeader({ children, filter, onFilterUpdate }: PageHeaderInterface) {
    const [filterData, setFilterData] = useState(filter)
    const debouncedFilter = useDebounce(filterData)

    useEffect(() => {
        onFilterUpdate(debouncedFilter);
    }, [debouncedFilter, onFilterUpdate]);

    const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updated = { ...filterData, [name]: value };
        setFilterData(updated);
    }
    return (
        <div className="lg:flex lg:items-center lg:justify-between mb-2">
            <div className="min-w-0 flex-1">
                <Input
                    placeholder="Type to search products..."
                    type="text"
                    name="keyword"
                    value={filterData.keyword}
                    onChange={handleUpdate}
                    className="max-w-auto md:max-w-[20rem]"
                />
                {/* <h2 className="text-2xl/7 font-bold sm:truncate sm:text-xl sm:tracking-tight">
                    {title}
                </h2> */}
            </div>
            <div className="flex lg:mt-0 lg:ml-4">
                {children}
            </div>
        </div>
    )
}
