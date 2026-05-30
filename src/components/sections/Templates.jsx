import React from 'react';
import { useSmartGen } from '../../context/SmartGenContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Templates = () => {
  const { templates } = useSmartGen();
  const navigate = useNavigate();

  if (!templates || !Array.isArray(templates) || !templates.length) return null;

  return (
    <section id="templates" className="py-12 bg-warm">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brand text-center mb-8">Available Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t._id} className="bg-surface rounded-xl border border-line p-5 hover:shadow-md hover:border-brand-accent/30 transition group">
              <div className="text-3xl mb-3">{t.icon || '📄'}</div>
              <h3 className="font-semibold text-brand mb-1">{t.name}</h3>
              <p className="text-xs text-muted mb-3 line-clamp-2">{t.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] bg-brand/5 text-brand px-2 py-0.5 rounded-full">{t.category}</span>
                <button onClick={() => navigate(`/template/${t._id}`)} className="text-brand-accent text-xs flex items-center gap-1 hover:underline">Use <ArrowRight size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Templates;