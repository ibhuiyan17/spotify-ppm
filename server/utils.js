/* eslint-disable no-use-before-define */

/*
  input: spotify request object, desired time range
  output: filtered array containing top tracks
*/
async function getFilteredTopTracks(spotifyInstance, timeRange) {
  try {
    return $filterTrackList(await spotifyInstance.getTopTracks(timeRange));
  } catch (err) {
    return err;
  }
}

/*
  input: spotify request object, array of track objects
  output: object containing average features of input tracks
*/
async function calculateAverageFeatures(spotifyInstance, trackList) {
  const averageFeatures = {};

  // build set of features to exclude
  const excludeSet = {};
  [
    'key', 'mode', 'type', 'id', 'uri', 'track_href', 'analysis_url', 'duration_ms', 'time_signature',
  ].forEach((feature) => {
    excludeSet[feature] = true;
  });

  // get list of features then calculate the average values
  try {
    const featureList = await spotifyInstance.getFeatures(trackList.map(track => track.trackID));
    const lenFeatureList = featureList.length;
    featureList.forEach((featureObj) => {
      Object.keys(featureObj).forEach((feature) => {
        if (feature in excludeSet === false) { // only consider important features
          if (feature in averageFeatures === false) { // initialize feature if not present
            averageFeatures[feature] = 0;
          }
          averageFeatures[feature] += (featureObj[feature] / lenFeatureList);
        }
      });
    });
    return averageFeatures;
  } catch (err) {
    return err;
  }
}

// $(helper func.) filter metadata out of array returned by Spotify
function $filterTrackList(trackList) {
  return trackList.map(trackObj => ({ // filter tracklist array
    trackID: trackObj.id,
    name: trackObj.name,
    artists: trackObj.artists.map(artistObj => artistObj.name),
  }));
}

module.exports = {
  getFilteredTopTracks,
  calculateAverageFeatures,
};
