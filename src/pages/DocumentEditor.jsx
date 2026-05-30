import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSmartGen } from '../context/SmartGenContext';
import api from '../services/api';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';

const FIELD_TYPES = {
  text: { icon: '🔤', placeholder: 'Enter text...' },
  textarea: { icon: '📝', placeholder: 'Enter details...' },
  number: { icon: '🔢', placeholder: 'Enter number...' },
  date: { icon: '📅', placeholder: 'Select date...' },
  email: { icon: '📧', placeholder: 'email@example.com' },
  phone: { icon: '📱', placeholder: '0712345678' },
  select: { icon: '📋', placeholder: 'Select...' },
  checkbox: { icon: '☑️', placeholder: '' },
};

const DocumentEditor = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { user } = useSmartGen();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    api.get(`/smartgen/api/templates/${id}`).then(r => {
      setTemplate(r.data);
      if (editId) {
        api.get(`/smartgen/api/documents/${editId}`).then(d => {
          setFormData(d.data.formData || {});
          setStep(2);
        });
      }
      setLoading(false);
    });
  }, [id, editId]);

  const updateField = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  const save = async () => {
    if (!user) { navigate('/login'); return; }
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/smartgen/api/documents/${editId}`, { formData });
      } else {
        await api.post('/smartgen/api/documents', { templateId: id, templateName: template.name, formData });
      }
      navigate('/documents');
    } catch { alert('Failed to save document'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent" />
    </div>
  );

  if (!template) return (
    <div className="text-center py-20 text-muted">
      <p className="text-lg mb-2">📄</p>
      <p>Template not found</p>
      <button onClick={() => navigate('/')} className="text-brand-accent text-sm mt-2">Browse templates</button>
    </div>
  );

  const hasFields = template.fields && template.fields.length > 0;

  return (
    <div className="min-h-screen bg-warm">
      {/* Header */}
      <div className="bg-surface border-b border-line sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => step === 2 ? setStep(1) : navigate(-1)} className="flex items-center gap-1 text-sm text-muted hover:text-brand">
            <ArrowLeft size={16} /> {step === 2 ? 'Back to info' : 'Back'}
          </button>
          <span className="text-sm font-medium text-brand">Step {step} of 2</span>
          <div className="w-16" />
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-line">
          <div className={`h-full bg-brand-accent transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Step 1: Template Info */}
        {step === 1 && (
          <div className="animate-slide-up">
            <div className="bg-surface rounded-2xl shadow-sm border border-line p-6 text-center">
              <div className="text-5xl mb-4">{template.icon || '📄'}</div>
              <h1 className="text-2xl font-bold text-brand mb-2">{template.name}</h1>
              <p className="text-muted text-sm mb-2">{template.description}</p>
              <span className="inline-block bg-brand/5 text-brand text-xs px-3 py-1 rounded-full mb-6">{template.category}</span>

              {hasFields && (
                <div className="bg-warm rounded-xl p-4 mb-6 text-left">
                  <p className="text-xs font-semibold text-brand mb-2">📋 Fields to fill:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {template.fields.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-muted">
                        <span>{FIELD_TYPES[f.type]?.icon || '📝'}</span>
                        <span>{f.label} {f.required && <span className="text-red-400">*</span>}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (!user) { navigate('/login'); return; }
                  if (!hasFields) {
                    // No fields — save directly
                    setSaving(true);
                    api.post('/smartgen/api/documents', { templateId: id, templateName: template.name, formData: {} })
                      .then(() => navigate('/documents'))
                      .catch(() => alert('Failed to generate'));
                  } else {
                    setStep(2);
                  }
                }}
                className="bg-brand-accent text-brand font-semibold px-8 py-3 rounded-full text-sm hover:bg-amber-500 transition shadow-lg shadow-amber-100 flex items-center gap-2 mx-auto"
              >
                <Sparkles size={16} />
                {hasFields ? 'Fill Details' : 'Generate Document'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 2 && hasFields && (
          <div className="animate-slide-up">
            <div className="bg-surface rounded-2xl shadow-sm border border-line p-6">
              <h2 className="text-lg font-bold text-brand mb-4 flex items-center gap-2">
                <span className="text-2xl">{template.icon}</span> {template.name}
              </h2>

              <div className="space-y-4">
                {template.fields.map((f, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-brand mb-1.5">
                      {FIELD_TYPES[f.type]?.icon} {f.label}
                      {f.required && <span className="text-red-400 ml-1">*</span>}
                    </label>

                    {f.type === 'textarea' ? (
                      <textarea
                        value={formData[f.name] || ''}
                        onChange={e => updateField(f.name, e.target.value)}
                        placeholder={f.placeholder || FIELD_TYPES[f.type]?.placeholder}
                        rows={3}
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none bg-warm"
                        required={f.required}
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={formData[f.name] || ''}
                        onChange={e => updateField(f.name, e.target.value)}
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-warm"
                        required={f.required}
                      >
                        <option value="">{f.placeholder || 'Select...'}</option>
                        {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : f.type === 'date' ? (
                      <input
                        type="date"
                        value={formData[f.name] || ''}
                        onChange={e => updateField(f.name, e.target.value)}
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-warm"
                        required={f.required}
                      />
                    ) : f.type === 'checkbox' ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!formData[f.name]}
                          onChange={e => updateField(f.name, e.target.checked)}
                          className="w-4 h-4 text-brand-accent rounded focus:ring-brand-accent"
                        />
                        <span className="text-sm text-muted">{f.placeholder || f.label}</span>
                      </label>
                    ) : (
                      <input
                        type={f.type || 'text'}
                        value={formData[f.name] || ''}
                        onChange={e => updateField(f.name, e.target.value)}
                        placeholder={f.placeholder || FIELD_TYPES[f.type]?.placeholder}
                        className="w-full px-3 py-2.5 border border-line rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent bg-warm"
                        required={f.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={save}
                disabled={saving}
                className="mt-6 w-full bg-brand-accent text-brand font-semibold py-3 rounded-xl text-sm hover:bg-amber-500 transition flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-amber-100"
              >
                <Sparkles size={16} />
                {saving ? 'Generating...' : editId ? 'Update Document' : 'Generate Document'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentEditor;