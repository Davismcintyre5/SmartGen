import React from 'react';
import { ArrowRight, Zap, FileText, CheckCircle } from 'lucide-react';

const Hero = () => (
  <section className="bg-gradient-to-br from-brand via-brand-light to-brand text-white py-16 sm:py-24">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Generate Documents with AI</h1>
      <p className="text-base sm:text-lg text-purple-200 mb-8 max-w-lg mx-auto">Choose a template, fill in the details, and generate professional documents instantly.</p>
      <a href="#templates" className="inline-flex items-center gap-2 bg-brand-accent text-brand px-6 py-3 rounded-full font-semibold text-sm hover:bg-amber-500 transition shadow-lg">
        Browse Templates <ArrowRight size={16} />
      </a>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mt-10 text-sm text-purple-200">
        {[
          { icon: FileText, text: 'Choose a template' },
          { icon: CheckCircle, text: 'Fill in the form' },
          { icon: Zap, text: 'Generate document' },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2 justify-center"><s.icon size={18} className="text-brand-accent" /> {s.text}</div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;