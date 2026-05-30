import { Search } from 'lucide-react'
import { useTemplates } from '../../hooks/useTemplates.js'
import CategoryFilter from './CategoryFilter.jsx'
import TemplateCard from './TemplateCard.jsx'

export default function TemplateGallery() {
  const { filtered, category, setCategory, search, setSearch, categories } = useTemplates()

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
        <input
          className="form-input pl-9"
          placeholder="Search templates..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <CategoryFilter active={category} onSelect={setCategory} categories={categories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(t => <TemplateCard key={t.id} template={t} />)}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-sm text-slate py-8">No templates found.</p>
        )}
      </div>
    </div>
  )
}