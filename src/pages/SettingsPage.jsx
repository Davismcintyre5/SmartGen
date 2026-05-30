import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'
import { Sun, Moon, User, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../services/api.js'

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [name, setName] = useState(user?.name || '')
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [saving, setSaving] = useState(false)

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await api.put('/smartgen/api/users/profile', { name })
      toast.success('Profile updated')
    } catch {
      toast.error('Update failed')
    } finally { setSaving(false) }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (newPass.length < 6) return toast.error('New password must be 6+ characters')
    setSaving(true)
    try {
      await api.put('/smartgen/api/users/password', { oldPassword: oldPass, newPassword: newPass })
      toast.success('Password changed')
      setOldPass(''); setNewPass('')
    } catch {
      toast.error('Password change failed')
    } finally { setSaving(false) }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="text-sm text-slate mt-1">Manage your account and preferences</p>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><Sun size={16}/> Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="text-xs text-slate">Currently: {theme === 'dark' ? 'Dark' : 'Light'}</p>
          </div>
          <button onClick={toggleTheme} className="btn-ghost flex items-center gap-2">
            {theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}
            Switch to {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><User size={16}/> Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-3">
          <div><label className="form-label">Full Name</label><input className="form-input" value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label className="form-label">Email</label><input className="form-input opacity-60 cursor-not-allowed" value={user?.email || ''} disabled /></div>
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Update Profile'}</button>
        </form>
      </div>

      <div className="card p-5">
        <h2 className="font-semibold mb-4 flex items-center gap-2"><Lock size={16}/> Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div><label className="form-label">Current Password</label><input type="password" className="form-input" value={oldPass} onChange={e => setOldPass(e.target.value)} /></div>
          <div><label className="form-label">New Password</label><input type="password" className="form-input" value={newPass} onChange={e => setNewPass(e.target.value)} /></div>
          <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : 'Change Password'}</button>
        </form>
      </div>
    </div>
  )
}