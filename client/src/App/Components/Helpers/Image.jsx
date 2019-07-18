// Wrapper for standard html <img> tag

import React from 'react';

function Image({ imageSrc, imageAlt, style }) {
  return (
    <img style={style}
      src={imageSrc}
      alt={imageAlt}
    />
  );
}

export default Image;
