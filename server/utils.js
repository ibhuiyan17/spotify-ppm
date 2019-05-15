
// filter metadata out of array returned by Spotify
function filterTrackList(trackList) {
  return trackList.map(trackObj => ({ // filter tracklist array
    trackID: trackObj.id,
    name: trackObj.name,
    artists: trackObj.artists.map(artistObj => artistObj.name),
  }));
}

// return object containing average features
function calculateAverageFeatures(featureList) {
  const averageFeatures = {
    danceability: 0,
    energy: 0,
    loudness: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    duration: 0,
  };

  const lenFeatureList = featureList.length;
  featureList.forEach((featureObj) => {
    // console.log('this is a feature object: ', featureObj);
    Object.keys(featureObj).forEach((feature) => {
      // filter out unimportant features
      if (feature in averageFeatures) {
        // console.log(featureObj.feature);
        averageFeatures[feature] += (featureObj[feature] / lenFeatureList);
      }
    });
  });
  console.log('average features: ', averageFeatures);

  return averageFeatures;
}

module.exports = {
  filterTrackList,
  calculateAverageFeatures,
};
