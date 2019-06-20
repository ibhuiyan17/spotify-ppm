/* Image Component for rendering trackart or artist photo */

import React from 'react';

const styles = {
  trackart: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
};

function Image({ imageUrl, imageType }) {
  return (
    <img
      style={styles.trackart}
      src={imageUrl}
      alt={imageType}
    />
  );
}

export default Image;
