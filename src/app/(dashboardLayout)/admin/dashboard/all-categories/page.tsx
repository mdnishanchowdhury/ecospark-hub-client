"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import Link from "next/link";
import { getAllCategories, deleteCategory } from "@/services/admin/category.services";

export default function CategoryListPage() {
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

    const confirmDelete = (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            handleDelete(id);
        }
    };

    if (isLoading) return <div className="p-10 text-center font-bold text-[#009663]">Loading categories...</div>;
    if (isError) return <div className="p-10 text-center text-red-500 font-bold">Error loading categories!</div>;

    const categories = (data as any)?.data || [];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Categories</h1>
                    <p className="text-slate-500 italic">Total {categories.length} categories found</p>
                </div>
                <Link href="/admin/category/create">
                    <Button className="bg-[#009663] hover:bg-[#007b52] rounded-xl flex items-center gap-2">
                        <Plus size={18} /> Add Category
                    </Button>
                </Link>
            </div>

            <Card className="rounded-[24px] border-none shadow-sm overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                    <CardTitle className="text-lg font-bold text-slate-700">Category List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50/30">
                            <TableRow>
                                <TableHead className="font-bold text-slate-600">ID</TableHead>
                                <TableHead className="font-bold text-slate-600">Name</TableHead>
                                <TableHead className="text-right font-bold text-slate-600">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.length > 0 ? (
                                categories.map((category: any, index: number) => (
                                    <TableRow key={category.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-slate-400">#{index + 1}</TableCell>
                                        <TableCell className="font-bold text-slate-800">{category.name}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Link href={`/admin/category/edit/${category.id}`}>
                                                <Button variant="outline" size="icon" className="rounded-lg border-slate-200 text-blue-600 hover:bg-blue-50">
                                                    <Edit size={16} />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="rounded-lg border-slate-200 text-red-600 hover:bg-red-50"
                                                onClick={() => confirmDelete(category.id, category.name)}
                                                disabled={isDeleting}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center py-10 text-slate-400 italic">
                                        No categories found. Create one to get started!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}