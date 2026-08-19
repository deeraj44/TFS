import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password, form.phone);
      }
      onClose();
      setForm({ name: '', email: '', password: '', phone: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-brown/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cream w-full max-w-md rounded-2xl shadow-soft p-8 border border-brown/10">
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-brown/60 hover:text-brown">
          <X size={20} />
        </button>

        <h3 className="font-serif text-2xl mb-1">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
        <p className="text-sm text-brown/60 mb-6">
          {mode === 'login' ? 'Log in to track your orders.' : 'Join us for a brighter skincare routine.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs uppercase tracking-wide text-brown/60">Full name</label>
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="mt-1 w-full rounded-lg border border-brown/20 bg-white/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          )}

          <div>
            <label className="text-xs uppercase tracking-wide text-brown/60">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="mt-1 w-full rounded-lg border border-brown/20 bg-white/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs uppercase tracking-wide text-brown/60">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className="mt-1 w-full rounded-lg border border-brown/20 bg-white/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
          )}

          <div>
            <label className="text-xs uppercase tracking-wide text-brown/60">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              className="mt-1 w-full rounded-lg border border-brown/20 bg-white/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-brown/70">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="underline hover:text-olive"
            onClick={() => {
              setError('');
              setMode(mode === 'login' ? 'register' : 'login');
            }}
          >
            {mode === 'login' ? 'Register' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
}
