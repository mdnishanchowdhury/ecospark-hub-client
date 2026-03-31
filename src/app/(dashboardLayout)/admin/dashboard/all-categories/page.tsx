import CategoryList from '@/components/modules/Admin/Category/CategoryList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function CategoryPage() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-50/50 p-8 rounded-[32px] border border-emerald-100/50">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Category <span className="text-emerald-600 font-black">Management</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">
            Organize and manage your eco-spark hub project categories efficiently.
          </p>
        </div>
        
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-6 font-bold shadow-lg shadow-emerald-100 gap-2 w-fit">
          <Plus size={20} />
          Add New Category
        </Button>
      </div>

      {/* Table Section */}
      <div className="min-h-[400px]">
        <CategoryList />
      </div>
    </div>
  )
}

export default CategoryPage