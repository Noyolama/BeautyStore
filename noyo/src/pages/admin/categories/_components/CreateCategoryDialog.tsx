import { createCategory } from "@/api";
import { SmartForm } from "@/components/custom/SmartForm";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

interface CreateCategoryDialogProps {
    triggerElement?: React.ReactNode;
}
const creatCategoryFormSchema = z.object({
    name: z.string().min(1, 'Required')
})

export const CreateCategoryDialog = ({ triggerElement }: CreateCategoryDialogProps) => {
     const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        defaultValues: {
            name: ''
        },
        validators: {
            onSubmit: creatCategoryFormSchema
        },
        onSubmit: ({ value }) => {
            categoryCreate.mutate(value)
        },
        formId: 'create-category'
    })

    const queryClient = useQueryClient()

    const categoryCreate = useMutation({
        mutationFn: (data: Omit<Category, '_id'>) => createCategory(data),
        onSuccess: (data) => {
            toast.success(data?.message || 'Success')
            form.reset()
            setIsOpen(false)
            queryClient.invalidateQueries({ queryKey: ['all-categories'] });
        }
    })
    return (
        <Dialog  open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    {triggerElement}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <SmartForm
                            form={form}
                            inputItems={[
                                {
                                    key: 'name',
                                    label: 'Name',
                                },
                            ]}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" form="create-category">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
