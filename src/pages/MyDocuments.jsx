import React, { useState, useEffect } from 'react';
import { useSmartGen } from '../context/SmartGenContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { FileText, Trash2, Edit3 } from 'lucide-react';

const MyDocuments = () => {
  const { user } = useSmartGen();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/smartgen/api/documents').then(r => setDocs(r.data || [])).finally(() => setLoading(false));
  }, [user]);

  const del = async (id) => {
    await api.delete(`/smartgen/api/documents/${id}`);
    setDocs(docs.filter(d => d._id !== id));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-accent" /></div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-brand mb-4">My Documents</h1>
      {docs.length === 0 ? (
        <div className="text-center py-12 text-muted">
          <FileText size={40} className="mx-auto mb-2 opacity-50" />
          <p>No documents yet. <Link to="/" className="text-brand-accent font-medium">Browse templates</Link></p>
        </div>
      ) : (
        <div className="space-y-2">
          {docs.map(d => (
            <div key={d._id} className="bg-surface border border-line rounded-lg p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>📄</span>
                <span className="font-medium text-brand">{d.templateName}</span>
                <span className="text-xs text-muted">{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => navigate(`/template/${d.templateId}?edit=${d._id}`)} className="p-1.5 text-brand-accent hover:bg-amber-50 rounded"><Edit3 size={14} /></button>
                <button onClick={() => del(d._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDocuments;