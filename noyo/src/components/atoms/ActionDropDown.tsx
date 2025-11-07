import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import React from "react"


interface ActionItem {
    label: string;
    customComponent?: React.ReactNode;
    onClick?: () => void;
}

interface ActionDropDownProps {
    actionItems: ActionItem[]
}

export const ActionDropDown = ({ actionItems }: ActionDropDownProps) => {
    return actionItems?.length > 0 && (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        actionItems?.length > 0 && (
                            <>
                                {actionItems.map((item, index) => (
                                    item?.customComponent ? (
                                        <React.Fragment key={index}>
                                            {item.customComponent}
                                        </React.Fragment>
                                    ) : (
                                        <DropdownMenuItem key={index} onClick={item?.onClick}>
                                            {item.label}
                                        </DropdownMenuItem>
                                    )
                                ))
                                }
                            </>
                        )
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}