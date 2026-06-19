import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Edit3, FileText } from 'lucide-react'
import { documentService } from '../services/documentService.js'
import toast from 'react-hot-toast'

export default function SavedDocumentsPage() {
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    documentService.getAll()
      .then(({ data }) => setDocs(Array.isArray(data) ? data : data.documents || []))
      .catch(() => setDocs([]))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    try {
      await documentService.remove(id)
      setDocs(prev => prev.filter(d => d._id !== id))
      toast.success('Document deleted')
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleEdit = (doc) => {
    navigate(`/editor/${doc.templateId}?edit=${doc._id}`)
  }

  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Saved Documents</h1>
        <p className="text-sm text-slate mt-1">All your previously saved documents</p>
      </div>

      {loading && <p className="text-sm text-slate">Loading…</p>}

      {!loading && docs.length === 0 && (
        <div className="card p-12 text-center">
          <FileText size={40} className="mx-auto text-gray-200 mb-3" />
          <p className="text-slate font-medium">No saved documents yet</p>
          <p className="text-sm text-slate mt-1">Generate a document and click Save to store it here</p>
          <button onClick={() => navigate('/templates')} className="btn-primary mt-4 mx-auto">
            Browse Templates
          </button>
        </div>
      )}

      <div className="space-y-3">
        {docs.map(doc => (
          <div key={doc._id} className="card p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-mist rounded-xl flex items-center justify-center text-xl shrink-0">📄</div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">{doc.templateName}</p>
              <p className="text-xs text-slate">{new Date(doc.createdAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEdit(doc)}
                className="p-2 hover:bg-mist rounded-lg transition"
                title="Edit document"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => handleDelete(doc._id)}
                className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}