# spotify-ppm

An interactive web app that allows users to generate new Spotify playlists using their top tracks, artists, and genres as seeds. While Spotify's recommendation system is one of the best out there, it often has trouble creating relevant playlists for users that listen to a broad spectrum of music. This app effectively eliminates any biases that Spotify may introduce when grouping a user's music together to make curated playlists, by instead allowing the user to select the search features him/herself and feed it into Spotify's search algorithm. The user can then export the resulting playlists straight to their Spotify account.


## Built With

* [Spotify Web API](https://developer.spotify.com/documentation/web-api/) - Endpoints for user info and recommendations
* [Node](https://github.com/nodejs/node) - Backend used to connect the app to Spotify and structure data
* [React](https://github.com/facebook/react) - User interface for the app
* [Material-UI](https://github.com/mui-org/material-ui) - React library for Material UI components

### Todo
* Select any seed with Spotify's search endpoint
* Get recommendations based on musical features as well as seeds
