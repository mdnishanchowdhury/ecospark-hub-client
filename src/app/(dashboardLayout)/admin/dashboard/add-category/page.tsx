import CategoryForm from "@/components/forms/CategoryForm";



export default function CategoryFormPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Manage Categories</h1>
        <p className="text-slate-500 mt-2">Create and organize categories for EcoSpark ideas</p>
      </div>

      <CategoryForm />
    </div>
  );
}