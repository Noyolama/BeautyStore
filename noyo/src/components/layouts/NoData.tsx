
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"

export function NoData() {
    return (
        <Empty>
            <EmptyHeader>
                    <img src="/images/no-data.jpg" alt="no-data" className="w-[200px]"/>
                <EmptyTitle>No any data.</EmptyTitle>
                <EmptyDescription>
                    There seems to be no data availabe yet. Please try again later.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
