import { addItemToWishlist, type WishlistEntryItem } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddtoWishlist = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: WishlistEntryItem) => addItemToWishlist(data),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    })
}