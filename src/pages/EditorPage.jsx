import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { PrinterIcon, RotateCcw, Save, ChevronLeft, Eye, EyeOff } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import toast from 'react-hot-toast'
import { templates as LOCAL_TEMPLATES } from '../utils/constants.js'
import DynamicForm from '../components/forms/DynamicForm.jsx'
import LivePreview from '../components/preview/LivePreview.jsx'
import CategoryFilter from '../components/templates/CategoryFilter.jsx'
import { documentService } from '../services/documentService.js'
import { useTemplates } from '../hooks/useTemplates.js'

function initData(schema) {
  const d = {}
  schema.forEach(f => { d[f.name] = f.default || '' })
  return d
}

export default function EditorPage() {
  const { templateId } = useParams()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')
  const navigate = useNavigate()
  const { filtered, category, setCategory, search, setSearch, categories } = useTemplates()

  const [template, setTemplate] = useState(null)
  const [formData, setFormData] = useState({})
  const [previewOpen, setPreviewOpen] = useState(true)
  const [saving, setSaving] = useState(false)
  const printRef = useRef(null)

  // Load template from URL param or saved document
  useEffect(() => {
    if (editId) {
      documentService.getById(editId).then(({ data }) => {
        if (data) {
          const tpl = LOCAL_TEMPLATES.find(t => t.id === data.templateId) || LOCAL_TEMPLATES[0]
          setTemplate(tpl)
          setFormData(data.formData || initData(tpl.schema))
        }
      }).catch(() => {
        const found = LOCAL_TEMPLATES.find(t => t.id === templateId) || LOCAL_TEMPLATES[0]
        setTemplate(found)
        setFormData(initData(found.schema))
      })
    } else {
      const found = LOCAL_TEMPLATES.find(t => t.id === templateId) || LOCAL_TEMPLATES[0]
      setTemplate(found)
      setFormData(initData(found.schema))
    }
  }, [templateId, editId])

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: template?.name || 'HDM-Document',
  })

  const updateField = useCallback((name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }, [])

  const resetForm = () => {
    if (!template) return
    setFormData(initData(template.schema))
    toast.success('Form reset')
  }

  const handleSave = async () => {
    if (!template) return
    setSaving(true)
    try {
      if (editId) {
        await documentService.update(editId, { formData })
        toast.success('Document updated!')
      } else {
        await documentService.save({ templateId: template.id, templateName: template.name, formData })
        toast.success('Document saved!')
      }
    } catch {
      toast.error('Save failed — are you connected to the server?')
    } finally {
      setSaving(false)
    }
  }

  const selectTemplate = (tpl) => {
    navigate(`/editor/${tpl.id}`)
  }

  const schemaWithName = template ? Object.assign([...template.schema], { _templateName: template.name }) : []

  return (
    <div className="max-w-7xl mx-auto animate-slide-up">
      <div className="flex items-center gap-3 mb-5 no-print">
        <button onClick={() => navigate('/templates')} className="p-2 hover:bg-mist rounded-lg transition">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold text-ink">
            {template?.icon} {template?.name || 'Editor'}
          </h1>
          <p className="text-xs text-slate">Fill fields · Preview · Print or Save</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 no-print space-y-3">
          <div className="card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate mb-3">Category</p>
            <CategoryFilter active={category} onSelect={setCategory} categories={categories} />
          </div>
          <div className="card p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate mb-2">Templates</p>
            <input
              className="form-input text-xs py-1.5 mb-3"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {filtered.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => selectTemplate(tpl)}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all text-sm
                    ${template?.id === tpl.id
                      ? 'border-rust bg-rust/5 text-rust font-medium'
                      : 'border-mist hover:border-gray-300 text-ink'}`}
                >
                  <span className="text-lg shrink-0">{tpl.icon}</span>
                  <span className="truncate">{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 no-print">
          <div className="card p-5">
            <div className="flex items-center justify-between border-b border-mist pb-3 mb-4">
              <h3 className="font-semibold text-base">Fill Details</h3>
              <span className="text-xs bg-mist px-2.5 py-1 rounded-full text-slate">
                {template?.category}
              </span>
            </div>
            <DynamicForm schema={schemaWithName} formData={formData} onChange={updateField} />
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-mist">
              <button onClick={handlePrint} className="btn-primary flex items-center gap-2">
                <PrinterIcon size={15} /> Print / PDF
              </button>
              <button onClick={handleSave} disabled={saving} className="btn-ghost flex items-center gap-2">
                <Save size={15} /> {saving ? 'Saving…' : editId ? 'Update' : 'Save'}
              </button>
              <button onClick={resetForm} className="btn-ghost flex items-center gap-2">
                <RotateCcw size={14} /> Reset
              </button>
              <button
                onClick={() => setPreviewOpen(o => !o)}
                className="btn-ghost flex items-center gap-2 lg:hidden ml-auto"
              >
                {previewOpen ? <EyeOff size={14}/> : <Eye size={14}/>}
                {previewOpen ? 'Hide' : 'Preview'}
              </button>
            </div>
          </div>
        </div>

        {(previewOpen) && (
          <div className="lg:col-span-4">
            <div className="card overflow-hidden sticky top-6">
              <div className="px-4 py-2.5 border-b border-mist flex items-center justify-between bg-paper/60 no-print">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate">Live Preview</span>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">PDF-ready</span>
              </div>
              <div className="p-3 overflow-auto max-h-[75vh]">
                <LivePreview ref={printRef} template={template} formData={formData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}