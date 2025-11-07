import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface ConfirmDialogProps {
    confirmQuestion?: string;
    triggerElement?: React.ReactNode;
    onConfirm?: () => void;
}

const DEFAULT_CONFIRMATON_QUESTION = "Are you sure you want to perform this action?"

export const ConfirmDialog = ({ confirmQuestion = DEFAULT_CONFIRMATON_QUESTION, triggerElement }: ConfirmDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {triggerElement}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            {confirmQuestion}
                        </Label>
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
