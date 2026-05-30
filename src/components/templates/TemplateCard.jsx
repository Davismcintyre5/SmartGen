import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { ArrowRight } from 'lucide-react'

export default function TemplateCard({ template, compact = false }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/editor/${template.id}`)}
      className={clsx(
        'group bg-white border border-mist rounded-2xl cursor-pointer transition-all duration-150',
        'hover:border-slate hover:shadow-md hover:-translate-y-0.5',
        compact ? 'p-3' : 'p-4'
      )}
    >
      <div className="flex items-start gap-3">
        <span className={clsx('text-2xl shrink-0', compact && 'text-xl')}>{template.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-ink truncate text-sm">{template.name}</h4>
          {!compact && <p className="text-xs text-slate mt-0.5 line-clamp-2">{template.description}</p>}
          <span className="inline-block mt-1 text-[10px] font-medium uppercase tracking-wide text-slate">
            {template.category}
          </span>
        </div>
        <ArrowRight size={14} className="text-slate/40 group-hover:text-slate shrink-0 transition mt-1" />
      </div>
    </div>
  )
}