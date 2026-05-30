import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, FileText, Zap, ArrowRight } from 'lucide-react';

const HomePage = () => (
  <div className="max-w-4xl mx-auto text-center py-16 animate-slide-up">
    <div className="text-5xl mb-6">📄</div>
    <h1 className="text-3xl sm:text-5xl font-display font-bold text-ink mb-4">
      Generate Documents with <span className="text-rust">AI</span>
    </h1>
    <p className="text-slate text-lg mb-8 max-w-lg mx-auto">
      Choose from 12 professional templates, fill in your details, and generate ready-to-print documents instantly.
    </p>
    <div className="flex gap-3 justify-center mb-12">
      <Link to="/templates" className="btn-primary"><Sparkles size={16} /> Browse Templates</Link>
      <Link to="/editor" className="btn-ghost">Start Blank <ArrowRight size={14} /></Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-sm text-slate">
      {[
        { icon: FileText, text: 'Pick a template' },
        { icon: Zap, text: 'Fill & autofill with AI' },
        { icon: Sparkles, text: 'Print or save as PDF' },
      ].map((s, i) => (
        <div key={i} className="flex items-center gap-2 justify-center bg-white border border-mist rounded-xl p-3"><s.icon size={18} className="text-rust" /> {s.text}</div>
      ))}
    </div>
  </div>
);

export default HomePage;