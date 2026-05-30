import TemplateGallery from '../components/templates/TemplateGallery.jsx'

export default function TemplatesPage() {
  return (
    <div className="max-w-5xl mx-auto animate-slide-up">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Template Library</h1>
        <p className="text-sm text-slate mt-1">Choose a template to start generating your document</p>
      </div>
      <TemplateGallery />
    </div>
  )
}