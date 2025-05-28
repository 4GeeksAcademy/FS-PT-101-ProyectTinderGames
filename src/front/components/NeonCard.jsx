// NeonCard.jsx
import React, { useState } from 'react';

export function NeonCard({
  frontText,
  backImage = null,
  backAlt = '',
  backText = ''
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={['card-wrapper', flipped && 'flipped']
        .filter(Boolean)
        .join(' ')}
      onClick={() => setFlipped(f => !f)}
    >
      <div className="card-inner">
        {/* Front face: siempre texto */}
        <div className="card-face card-front">
          {frontText}
        </div>

        {/* Back face: imagen si viene backImage, sino texto de backText */}
        <div className="card-face card-back text-center">
          {backImage
            ? <img
                src={backImage}
                alt={backAlt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            : backText
          }
        </div>
      </div>
    </div>
  );
}
