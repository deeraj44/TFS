import React from 'react';

export default function Story({ product }) {
  const benefits = product?.benefits || [];

  return (
    <section id="story" className="max-w-7xl mx-auto px-5 md:px-8 py-20 grid md:grid-cols-2 gap-14 items-center">
      <div>
        <p className="uppercase tracking-[0.2em] text-xs text-olive font-medium mb-3">Gentle Exfoliation</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Cleanse today, glow tomorrow.</h2>
        <p className="text-brown/70 mb-8 leading-relaxed">
          Every bar is hand-poured with earth-toned Multani Mitti and coarse walnut scrub, so it lifts away dead
          skin and everyday grime without stripping your skin's natural moisture. Kojic Acid works quietly in the
          background, evening out tone with every wash.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="border-l-2 border-gold pl-4">
              <h4 className="font-medium mb-1">{b.title}</h4>
              <p className="text-sm text-brown/60">{b.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#8C6A52] to-[#4A3525] aspect-[4/5] shadow-soft flex items-end p-8">
          <div className="text-cream">
            <p className="text-xs uppercase tracking-[0.2em] mb-2 text-cream/70">Visible results</p>
            <p className="font-serif text-2xl">Smoother, brighter-looking skin in 2 weeks.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
