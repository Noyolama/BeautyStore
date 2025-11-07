import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react"
import { Ban, Ship, Truck } from "lucide-react";

const parseStatusConfig = (status: string) => {
    if (!status) return null
    const cleanedText = status.toLowerCase().trim()

    switch (cleanedText) {
        case 'processing':
            return {
                label: 'Processing',
                icon: IconLoader,
            }
            break;

        case 'shipped':
            return {
                label: 'Shipped',
                icon: Ship,
                customClass: 'bg-cyan-400 text-white',
            }
            break;

        case 'delivered':
            return {
                label: 'Delivered',
                icon: Truck,
                customClass: 'bg-green-400 text-white',
            }
            break;

        case 'cancelled':
            return {
                label: 'Cancelled',
                icon: Ban,
                customClass: 'bg-red-500 text-white',
            }
            break;

        default:
            return {
                label: status,
                icon: IconLoader
            }
    }
}

const Status = ({ status }: { status: string }) => {
    const statusConfig = parseStatusConfig(status)

    if (!statusConfig) return null;
    return (
        <Badge variant="outline" className={cn("text-muted-foreground px-1.5", statusConfig?.customClass)}>
            <statusConfig.icon />
            {statusConfig.label}
        </Badge>
    )
}

export default Status;