import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { FileText, Settings, LogOut, Sparkles, Menu, X, Sun, Moon } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: theme === 'dark' ? '#0f0f1a' : '#1e0a3c' }}>
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <Sparkles size={20} style={{ color: '#f59e0b' }} /> SmartGen
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm text-white">
          <Link to="/templates" className="hover:text-amber-400 transition">Templates</Link>
          {user && <Link to="/documents" className="hover:text-amber-400 transition flex items-center gap-1"><FileText size={14} /> Saved</Link>}
          {user && <Link to="/settings" className="hover:text-amber-400 transition"><Settings size={14} /></Link>}
          
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-1 hover:text-red-400 transition"><LogOut size={14} /></button>
          ) : (
            <Link to="/login" className="bg-amber-500 text-ink px-4 py-1.5 rounded-full font-medium text-sm hover:bg-amber-400 transition">Login</Link>
          )}
        </nav>

        <button onClick={() => setOpen(true)} className="md:hidden text-white"><Menu size={22} /></button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-60 z-50 p-5 md:hidden text-white" style={{ background: theme === 'dark' ? '#0f0f1a' : '#1e0a3c' }}>
            <button onClick={() => setOpen(false)} className="mb-6"><X size={22} /></button>
            <nav className="flex flex-col gap-3 text-sm">
              <Link to="/templates" onClick={() => setOpen(false)} className="py-2 hover:text-amber-400">Templates</Link>
              {user && <Link to="/documents" onClick={() => setOpen(false)} className="py-2 hover:text-amber-400">Saved</Link>}
              {user && <Link to="/settings" onClick={() => setOpen(false)} className="py-2 hover:text-amber-400">Settings</Link>}
              <button onClick={toggleTheme} className="flex items-center gap-2 py-2 hover:text-amber-400">
                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              {user ? (
                <button onClick={() => { logout(); navigate('/'); setOpen(false); }} className="text-left py-2 hover:text-red-400">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="bg-amber-500 text-ink px-4 py-2 rounded-full text-center font-medium mt-2">Login</Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;