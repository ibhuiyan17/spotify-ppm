/* eslint-disable no-alert */
// Component to handle exporting result playlist to user's spotify account

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, TextField } from '@material-ui/core';
import axios from 'axios';

class ExportPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      postSuccess: false, // indication
      playlistName: '',
    };

    this.openExportDialog = this.openExportDialog.bind(this);
    this.closeExportDialog = this.closeExportDialog.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this);
  }

  openExportDialog(e) {
    e.preventDefault();

    this.setState({ dialogOpen: true });
  }

  closeExportDialog() {
    this.setState({ dialogOpen: false });
  }

  updatePlaylistName(e) {
    this.setState({ playlistName: e.target.value });
  }

  handleSubmitPlaylist(e) {
    e.preventDefault();
    console.log(`playlist ${this.state.playlistName} submitted`);

    this.setState({
      dialogOpen: false,
    }, () => {
      this.postPlaylistToSpotify();
    }, () => {
      this.setState({ playlistName: '' });
    });
  }

  async postPlaylistToSpotify() {
    const configHeaders = {
      Authorization: `Bearer ${this.props.accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      // create playlist
      const {
        status: createStatus,
        data: {
          id: playlistID,
        },
      } = await axios.post(
        `https://api.spotify.com/v1/users/${this.props.userID}/playlists`, // url
        { // data
          name: this.state.playlistName,
          description: 'Playlist created by Spotify Personalized Playlist Maker',
        },
        { // config
          headers: configHeaders,
        },
      );

      // add tracks to playlist
      const {
        status: addStatus,
      } = await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`, // url
        { // data
          uris: this.props.playlist.map(({ trackID }) => `spotify:track:${trackID}`),
        },
        { // config
          headers: configHeaders,
        },
      );


      if (addStatus === 200 || addStatus === 201) {
        alert(`Playlist ${this.state.playlistName} successfully created`);
      } else {
        alert(`Error creating the playlist: create playlist code: ${createStatus}, add tracks code ${addStatus}`);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  }

  render() {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={e => this.openExportDialog(e)}
        >
          Export Playlist
        </Button>
        <Dialog
          onClose={this.closeExportDialog}
          open={this.state.dialogOpen}
          aria-labelledby="export-playlist-dialog"
        >
          <DialogTitle id="export-playlist-dialog">Export Playlist</DialogTitle>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmitPlaylist}>
            <TextField
              id="playlist-name"
              label="Playlist Name"
              margin="normal"
              value={this.state.playlistName}
              onChange={this.updatePlaylistName}
            />
          </form>
        </Dialog>
      </>
    );
  }
}

export default ExportPlaylist;
