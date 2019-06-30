// Component to display number of seeds selected

import React from 'react';
import { Typography } from '@material-ui/core';

function NumSelected({ count }) {
  return (
    <Typography variant="h5">
      {count} Selected
    </Typography>
  );
}

export default NumSelected;
