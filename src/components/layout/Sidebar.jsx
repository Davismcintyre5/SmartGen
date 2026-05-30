import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FileText, Settings, LogOut, Sparkles, Layout, X } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: '/templates', icon: Layout, label: 'Templates' },
    { to: '/documents', icon: FileText, label: 'Saved Docs', auth: true },
    { to: '/settings', icon: Settings, label: 'Settings', auth: true },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: '#1e0a3c' }}>
          <Sparkles size={20} style={{ color: '#f59e0b' }} /> SmartGen
        </NavLink>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map(l => {
          if (l.auth && !user) return null;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
              style={({ isActive }) => isActive ? { background: '#1e0a3c' } : {}}
            >
              <l.icon size={16} /> {l.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 border-t border-gray-200">
        {user ? (
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition w-full px-3 py-2"
          >
            <LogOut size={14} /> Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white w-full"
            style={{ background: '#1e0a3c' }}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-14 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: 'calc(100vh - 80px)' }}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile floating button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed left-4 bottom-6 z-40 shadow-lg rounded-full px-4 py-2.5 text-sm font-medium border border-gray-200 flex items-center gap-2"
        style={{ background: '#1e0a3c', color: '#fff' }}
      >
        <Layout size={16} /> Menu
      </button>

      {/* Mobile slide-in */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 shadow-xl overflow-y-auto">
            <div className="flex justify-end p-3">
              <button onClick={() => setMobileOpen(false)}><X size={20} /></button>
            </div>
            {sidebarContent}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;