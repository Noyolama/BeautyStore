import { deleteCategory, getAllCategory } from "@/api";
import { NoData } from "@/components/layouts/NoData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateCategoryDialog } from "./_components/CreateCategoryDialog";
import { CircleX } from "lucide-react";
import { useConfirm } from "@/hooks";
import { toast } from "sonner";

const Categories = () => {
    const { confirm } = useConfirm()
    const queryClient = useQueryClient()
    const { data: categories, isLoading } = useQuery({
        queryKey: ['all-categories'],
        queryFn: () => getAllCategory(),
    })

    const removeCategory = useMutation({
        mutationFn: (id: number) => deleteCategory(id),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            queryClient.invalidateQueries({ queryKey: ['all-categories'] });
        }
    })

    const handleRemoveCategory = async (id: number) => {
        const isConfirmed = await confirm({})

        if (isConfirmed) {
            removeCategory.mutate(id)
        }
    }

    if (isLoading) return <div>Loading...</div>
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-xl sm:tracking-tight">
                    Categories
                </h2>
                <CreateCategoryDialog
                    triggerElement={<Button>Add</Button>}
                />
            </div>
            {
                categories && categories?.length > 0 ?
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            categories?.map((cat, index) => (
                                <Card key={index} className="py-6">
                                    <CardContent className="px-4">
                                        <div className="flex justify-between">
                                            <div className="font-bold text-base flex items-center">
                                                {cat?.name}
                                            </div>
                                            <CircleX size={20} className="cursor-pointer" onClick={() => handleRemoveCategory(cat?._id)} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div> :

                    <NoData />
            }

        </>
    )
};

export default Categories;
