import React from 'react';
import { Droplet, Sparkles } from 'lucide-react';

export default function Ingredients({ product }) {
  const ingredients = product?.ingredients || [];

  return (
    <section id="ingredients" className="bg-white/40 border-y border-brown/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="uppercase tracking-[0.2em] text-xs text-olive font-medium mb-3">The Goodness Within</p>
          <h2 className="text-3xl md:text-4xl font-bold">Nature&apos;s finest ingredients, for your skin</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ing, idx) => (
            <div
              key={ing.name}
              className="group rounded-2xl bg-cream border border-brown/10 p-6 hover:shadow-soft transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center mb-4 group-hover:bg-olive/20 transition-colors">
                {idx % 2 === 0 ? <Droplet size={20} className="text-olive" /> : <Sparkles size={20} className="text-olive" />}
              </div>
              <h3 className="font-serif text-lg mb-1">{ing.name}</h3>
              <p className="text-sm text-brown/60">{ing.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
