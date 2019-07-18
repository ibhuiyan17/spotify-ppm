// Wrapper component for material-ui Typography component.

import React from 'react';
import { Typography } from '@material-ui/core';

function Label({
  text, variant, style, color
}) {
  return (
    <Typography color={color}
      variant={variant}
      style={style}
    >
      {text}
    </Typography>
  );
}

export default Label;
