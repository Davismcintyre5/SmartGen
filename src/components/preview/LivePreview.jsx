import { forwardRef } from 'react'

const LivePreview = forwardRef(function LivePreview({ template, formData }, ref) {
  if (!template) {
    return (
      <div ref={ref} id="printable-area" className="bg-white rounded-lg border border-mist p-8 min-h-64 flex items-center justify-center">
        <p className="text-sm text-slate">Select a template to see the preview</p>
      </div>
    )
  }

  let renderedHTML = ''
  try {
    renderedHTML = template.render(formData)
  } catch {
    renderedHTML = '<p style="color:red;padding:1rem;">Preview error — check your fields</p>'
  }

  return (
    <div
      ref={ref}
      id="printable-area"
      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
    />
  )
})

export default LivePreview