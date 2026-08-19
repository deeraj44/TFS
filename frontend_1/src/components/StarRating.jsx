import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function StarRating({ value, onChange, readOnly = false, size = 20 }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div className="flex items-center gap-1" role={readOnly ? undefined : 'radiogroup'} aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={readOnly ? 'cursor-default' : 'cursor-pointer'}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          <Star
            size={size}
            className={display >= star ? 'fill-gold text-gold' : 'fill-transparent text-brown/30'}
          />
        </button>
      ))}
    </div>
  );
}
