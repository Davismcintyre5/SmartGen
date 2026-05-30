import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const { data } = await api.post('/smartgen/api/auth/register', { name, email, password });
      login(data.token, data.user);
      navigate('/documents');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-warm flex items-center justify-center p-4">
      <div className="card p-6 w-full max-w-sm animate-slide-up">
        <h1 className="text-xl font-display font-bold text-ink text-center mb-4">📄 Join SmartGen</h1>
        {error && <p className="text-red-500 text-xs text-center mb-3">{error}</p>}
        <form onSubmit={submit} className="space-y-3">
          <div className="relative"><User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" /><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="form-input pl-9" required disabled={loading} /></div>
          <div className="relative"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" /><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="form-input pl-9" required disabled={loading} /></div>
          <div className="relative"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" /><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password (min 6 chars)" className="form-input pl-9" required disabled={loading} /></div>
          <button type="submit" disabled={loading} className="btn-primary w-full">{loading?'Creating...':'Register'}</button>
        </form>
        <p className="text-center text-xs text-slate mt-4">Have an account? <Link to="/login" className="text-rust font-medium">Login</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;