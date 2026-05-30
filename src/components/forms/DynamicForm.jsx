import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { getAISuggestions } from '../../services/aiService.js'
import toast from 'react-hot-toast'

export default function DynamicForm({ schema, formData, onChange }) {
  const [aiLoading, setAiLoading] = useState(false)
  const [aiContext, setAiContext] = useState('')

  const handleAIFill = async (templateName) => {
    if (!templateName) return
    setAiLoading(true)
    try {
      const suggestions = await getAISuggestions({ templateName, schema, partialData: formData, context: aiContext })
      Object.entries(suggestions).forEach(([k, v]) => onChange(k, v))
      toast.success('AI suggestions applied!')
    } catch (e) {
      toast.error('AI autofill failed. Check your connection.')
    } finally {
      setAiLoading(false)
    }
  }

  if (!schema || schema.length === 0) return <p className="text-sm text-slate italic">Select a template to begin.</p>

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-slate/5 to-slate/10 border border-slate/20 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-slate" />
          <span className="text-xs font-semibold text-slate">AI Autofill</span>
        </div>
        <div className="flex gap-2">
          <input
            className="form-input text-xs py-1.5 flex-1"
            placeholder="Optional context (e.g. 'tech startup in Nairobi')"
            value={aiContext}
            onChange={e => setAiContext(e.target.value)}
          />
          <button
            onClick={() => handleAIFill(schema._templateName)}
            disabled={aiLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate text-white text-xs font-medium rounded-lg hover:bg-ink transition disabled:opacity-60 shrink-0"
          >
            {aiLoading ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            {aiLoading ? 'Filling…' : 'Fill with AI'}
          </button>
        </div>
      </div>

      {schema.map(field => (
        <div key={field.name}>
          <label className="form-label">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              rows={field.rows || 3}
              className="form-input resize-none"
              value={formData[field.name] ?? field.default ?? ''}
              onChange={e => onChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              className="form-input"
              value={formData[field.name] ?? field.default ?? ''}
              onChange={e => onChange(field.name, e.target.value)}
              placeholder={field.placeholder || ''}
            />
          )}
        </div>
      ))}
    </div>
  )
}