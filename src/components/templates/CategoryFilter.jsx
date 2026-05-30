import clsx from 'clsx'

const LABELS = {
  all: 'All',
  certificate: 'Certificates',
  letter: 'Letters',
  receipt: 'Receipts',
  legal: 'Legal/HR',
  cv: 'CV/Resume',
  finance: 'Finance',
}

export default function CategoryFilter({ active, onSelect, categories }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={clsx(
            'px-3 py-1.5 text-xs font-medium rounded-full border transition-all',
            active === cat
              ? 'bg-ink text-white border-ink shadow-sm'
              : 'bg-white text-slate border-mist hover:border-slate'
          )}
        >
          {LABELS[cat] || cat}
        </button>
      ))}
    </div>
  )
}