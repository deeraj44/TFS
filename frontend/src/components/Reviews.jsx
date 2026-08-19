import React, { useEffect, useState } from 'react';
import { fetchReviews, submitReview } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: user?.name || '', rating: 0, comment: '' });
  const [status, setStatus] = useState({ submitting: false, error: '', success: '' });

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name }));
  }, [user]);

  async function loadReviews() {
    try {
      setLoading(true);
      const data = await fetchReviews();
      setReviews(data.reviews || []);
      setAverage(data.averageRating || 0);
    } catch (err) {
      // Non-fatal — show empty state
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ submitting: true, error: '', success: '' });

    if (!form.rating) {
      setStatus({ submitting: false, error: 'Please select a star rating.', success: '' });
      return;
    }
    if (!form.name.trim() || !form.comment.trim()) {
      setStatus({ submitting: false, error: 'Please fill in your name and a comment.', success: '' });
      return;
    }

    try {
      const data = await submitReview(form);
      setReviews((prev) => [data.review, ...prev]);
      setForm((f) => ({ ...f, comment: '', rating: 0 }));
      setStatus({ submitting: false, error: '', success: 'Thank you! Your review is now live.' });
    } catch (err) {
      setStatus({
        submitting: false,
        error: err?.response?.data?.message || 'Could not submit your review. Please try again.',
        success: '',
      });
    }
  }

  return (
    <section id="reviews" className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="uppercase tracking-[0.2em] text-xs text-olive font-medium mb-3">Community Reviews</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Loved by real, glowing skin</h2>
        {reviews.length > 0 && (
          <div className="flex items-center justify-center gap-2 text-sm text-brown/60">
            <StarRating value={Math.round(average)} readOnly size={16} />
            <span>{average.toFixed(1)} out of 5 · {reviews.length} reviews</span>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* Review list */}
        <div className="lg:col-span-3 space-y-5">
          {loading && <p className="text-brown/50 text-sm">Loading reviews…</p>}
          {!loading && reviews.length === 0 && (
            <p className="text-brown/50 text-sm">No reviews yet — be the first to share your glow!</p>
          )}
          {reviews.map((r) => (
            <div key={r._id} className="bg-white/50 border border-brown/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{r.name}</p>
                <StarRating value={r.rating} readOnly size={14} />
              </div>
              <p className="text-sm text-brown/70">{r.comment}</p>
              <p className="text-xs text-brown/40 mt-3">{new Date(r.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Write a review */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/50 border border-brown/10 rounded-2xl p-6 space-y-4 sticky top-28">
            <h3 className="font-serif text-xl">Write a review</h3>

            <div>
              <label className="text-xs uppercase tracking-wide text-brown/60">Your rating</label>
              <div className="mt-1">
                <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-brown/60">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-brown/20 bg-cream px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-brown/60">Your review</label>
              <textarea
                rows={4}
                value={form.comment}
                onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-brown/20 bg-cream px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                placeholder="Tell us how Instant Glow worked for your skin…"
              />
            </div>

            {status.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status.success && <p className="text-sm text-olive">{status.success}</p>}

            <button type="submit" disabled={status.submitting} className="btn-primary w-full disabled:opacity-60">
              {status.submitting ? 'Submitting…' : 'Submit review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
