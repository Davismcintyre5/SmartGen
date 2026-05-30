import { useState, useMemo } from 'react';
import { templates as LOCAL_TEMPLATES, CATEGORIES } from '../utils/constants.js';

export function useTemplates() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const categories = useMemo(() => {
    const cats = [...new Set(LOCAL_TEMPLATES.map(t => t.category))];
    return ['all', ...cats];
  }, []);

  const filtered = useMemo(() => {
    let result = LOCAL_TEMPLATES;
    if (category !== 'all') result = result.filter(t => t.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    return result;
  }, [category, search]);

  return { filtered, category, setCategory, search, setSearch, categories };
}