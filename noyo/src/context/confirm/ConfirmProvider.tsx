import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { ConfirmContext } from "./ConfirmContext";

const DEFAULT_CONFIRMATON_QUESTION = "Are you sure you want to perform this action?"

type ConfirmOptions = {
    confirmQuestion?: string;
    confirmText?: string;
    cancelText?: string;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({ confirmQuestion: DEFAULT_CONFIRMATON_QUESTION });
    const resolveRef = useRef<(value: boolean) => void>(() => { });

    const confirm: ConfirmFn = useCallback((opts) => {
        setOptions({
            confirmQuestion: DEFAULT_CONFIRMATON_QUESTION,
            confirmText: "Confirm",
            cancelText: "Cancel",
            ...opts
        })

        setOpen(true)

        return new Promise<boolean>((resolve) => {
            resolveRef.current = resolve
        })
    }, []);

    const handleClose = (confirmed: boolean) => {
        setOpen(false)
        resolveRef.current?.(confirmed)
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-full sm:w-[400px]">
                    <DialogTitle>Confirm</DialogTitle>
                    <DialogDescription className="sr-only">Confirm</DialogDescription>
                    <div>
                        {options?.confirmQuestion}
                    </div>
                    <DialogFooter className="justify-start!">
                        <Button variant="outline" onClick={() => handleClose(false)}>
                            {options.cancelText}
                        </Button>
                        <Button onClick={() => handleClose(true)}>
                            {options.confirmText}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ConfirmContext.Provider>
    )
}
