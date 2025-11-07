import { createContext } from "react";

type ConfirmOptions = {
    confirmQuestion?: string;
    confirmText?: string;
    cancelText?: string;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

interface ConfirmContextType {
    confirm: ConfirmFn
}

export const ConfirmContext = createContext<ConfirmContextType>({
    confirm: async (_: ConfirmOptions) => false
})
