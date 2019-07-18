// Component that redirects user to this project's repository

import React from 'react';
import { Chip, Avatar } from '@material-ui/core';

function GithubChip({ style }) {
  function handleClick(e) {
    e.preventDefault();

    window.location.href = 'https://github.com/ibhuiyan17/spotify-ppm'
  }

  return (
    <Chip
      variant="outlined"
      color="primary"
      size="small"
      avatar={<Avatar alt="octocat" src="/images/octocat.png" />}
      label="view source on github"
      onClick={e => handleClick(e)}
      style={style}
    />
  );
}

export default GithubChip;
