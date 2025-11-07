import { addItemToCart, type CartEntryItem } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddtoCart = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: CartEntryItem) => addItemToCart(data),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    })
}