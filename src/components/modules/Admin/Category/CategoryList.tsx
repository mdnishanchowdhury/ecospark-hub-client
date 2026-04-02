"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash2, Edit, Loader2, Layers } from "lucide-react";
import { getAllCategories, deleteCategory, updateCategory } from "@/services/admin/category.services";
import { useState } from "react";

export default function CategoryList() {
    const queryClient = useQueryClient();

    // States for Edit Modal
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<{ id: string, name: string } | null>(null);
    const [newName, setNewName] = useState("");

    const { data, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
    });

    // Delete Mutation
    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: (result: any) => {
            if (result?.success) {
                toast.success("Category deleted!");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            } else {
                toast.error(result?.message || "Failed to delete");
            }
        },
    });

    // Update Mutation
    const { mutate: handleUpdate, isPending: isUpdating } = useMutation({
        mutationFn: () => updateCategory(selectedCategory!.id, { name: newName }),
        onSuccess: (result: any) => {
            if (result?.success) {
                toast.success("Category updated successfully!");
                setIsEditOpen(false);
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            } else {
                toast.error(result?.message || "Update failed");
            }
        },
    });

    const openEditModal = (category: any) => {
        setSelectedCategory(category);
        setNewName(category.name);
        setIsEditOpen(true);
    };

    if (isError) return <div className="p-10 text-center text-red-500">Error loading categories!</div>;

    const categories = (data as any)?.data || [];

    return (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            
      <div className="bg-emerald-50/50 p-8 rounded-[32px] border border-emerald-100/50">
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
          Category <span className="text-emerald-600 font-black">Management</span>
        </h1>
        <p className="text-slate-500 font-medium mt-1 text-sm max-w-2xl">
          Organize and manage your eco-spark hub project categories efficiently. 
          Use this panel to oversee all innovation niches available in the system.
        </p>
      </div>

            <Table>
                <TableHeader className="bg-slate-50/50">
                    <TableRow>
                        <TableHead className="w-[100px] pl-8 py-5 font-bold text-slate-600 uppercase text-[12px]">SL</TableHead>
                        <TableHead className="py-5 font-bold text-slate-600 uppercase text-[12px]">Category Name</TableHead>
                        <TableHead className="text-right pr-8 py-5 font-bold text-slate-600 uppercase text-[12px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.length > 0 ? (
                        categories.map((category: any, index: number) => (
                            <TableRow key={category.id} className="group hover:bg-slate-50/40 transition-colors">
                                <TableCell className="pl-8 py-5 font-medium text-slate-400">{index + 1}</TableCell>
                                <TableCell className="py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                                            <Layers size={18} className="text-emerald-600" />
                                        </div>
                                        <span className="font-bold text-slate-800">{category.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8 py-5 space-x-2">
                                    {/* Edit Button Triggers Pop-up */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-full text-blue-600 hover:bg-blue-50"
                                        onClick={() => openEditModal(category)}
                                    >
                                        <Edit size={18} />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-full text-red-600 hover:bg-red-50"
                                        onClick={() => confirm("Delete this category?") && handleDelete(category.id)}
                                        disabled={isDeleting}
                                    >
                                        <Trash2 size={18} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center py-20 text-slate-400">No categories found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Edit Category Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[400px] rounded-[24px] p-8 bg-white outline-none">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                            Edit Category
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Name</label>
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="rounded-xl border-slate-200 h-12 font-bold focus:ring-emerald-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1 rounded-xl h-12 font-bold" onClick={() => setIsEditOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => handleUpdate()}
                                disabled={isUpdating || !newName.trim()}
                                className="flex-[2] h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold text-white shadow-lg shadow-emerald-100"
                            >
                                {isUpdating ? <Loader2 className="animate-spin" /> : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}