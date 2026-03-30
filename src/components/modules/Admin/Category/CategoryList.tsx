"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { getAllCategories, deleteCategory } from "@/services/admin/category.services";

export default function CategoryList() {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
    });

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: (result: any) => {
            if (result?.success) {
                toast.success("Category deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["categories"] });
            } else {
                toast.error(result?.message || "Failed to delete");
            }
        },
    });

    if (isLoading) return <div className="p-10 text-center font-bold text-[#009663] animate-pulse">Loading categories...</div>;
    if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading categories!</div>;

    const categories = (data as any)?.data || [];

    return (
        <Table>
            <TableHeader className="bg-slate-50/50">
                <TableRow>
                    <TableHead className="w-[100px] font-bold text-slate-600">SL</TableHead>
                    <TableHead className="font-bold text-slate-600">Category Name</TableHead>
                    <TableHead className="text-right font-bold text-slate-600">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.length > 0 ? (
                    categories.map((category: any, index: number) => (
                        <TableRow key={category.id} className="hover:bg-slate-50/30 transition-colors">
                            <TableCell className="font-medium text-slate-400">{index + 1}</TableCell>
                            <TableCell className="font-bold text-slate-800">{category.name}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Link href={`/admin/category/edit/${category.id}`}>
                                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 text-blue-600 hover:bg-blue-50">
                                        <Edit size={16} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9 rounded-xl border-slate-200 text-red-600 hover:bg-red-50"
                                    onClick={() => {
                                        if (confirm("Are you sure?")) handleDelete(category.id)
                                    }}
                                    disabled={isDeleting}
                                >
                                    <Trash2 size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center py-12 text-slate-400 italic">
                            No categories found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}