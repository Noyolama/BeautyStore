import { removeItemFromWishlist } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveWishlistItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (productId: string) => removeItemFromWishlist(productId),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    })
}