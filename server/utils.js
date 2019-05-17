/* eslint-disable no-use-before-define */

/*
  input: spotify request object, desired time range
  output: filtered array containing top tracks
*/
async function getFilteredTopTracks(spotifyInstance, timeRange) {
  try {
    return (await spotifyInstance.getTopTracks(timeRange)).map(trackObj => ({ // filter tracklist array
      trackID: trackObj.id,
      name: trackObj.name,
      artists: trackObj.artists.map(artistObj => artistObj.name),
    }));
  } catch (err) {
    return err;
  }
}

/*
  input: spotify request object, array of track objects
  output: object containing median features of input tracks
*/
async function calculateMedianFeatures(spotifyInstance, trackList) {
  const medianFeatures = {}; // {feature -> median/list -> result}

  // build set of features to exclude
  const excludeSet = {};
  [
    'key', 'mode', 'type', 'id', 'uri', 'track_href', 'analysis_url', 'duration_ms', 'time_signature',
  ].forEach((feature) => {
    excludeSet[feature] = true;
  });

  try {
    const featureList = await spotifyInstance.getFeatures(trackList.map(track => track.trackID));
    const lenFeatureList = featureList.length;
    featureList.forEach((featureObj) => {
      Object.keys(featureObj).forEach((feature) => {
        if (feature in excludeSet === false) { // only consider important features
          if (feature in medianFeatures === false) { // initialize feature if not present
            medianFeatures[feature] = {
              median: 0,
              list: [],
            };
          }
          medianFeatures[feature].list.push(featureObj[feature]);
        }
      });
    });
    console.log(medianFeatures);

    const type = (lenFeatureList % 2 === 0) ? 'even' : 'odd';
    Object.keys(medianFeatures).forEach((feature) => {
      console.log('feature list: ', medianFeatures[feature].list);
      medianFeatures[feature].list.sort((a, b) => a - b);
      switch (type) {
        case 'even':
          medianFeatures[feature].median = (medianFeatures[feature].list[(lenFeatureList / 2) - 1] + medianFeatures[feature].list[lenFeatureList / 2]) / 2;
          break;
        case 'odd':
          medianFeatures[feature].median = feature.list[Math.floor(lenFeatureList / 2)];
          break;
        default:
          break;
      }
    });
    console.log('median features');
    return medianFeatures;
  } catch (err) {
    console.log('err');
    console.log(err);
    return err;
  }
}

/*
  input: spotify request object, array of track objects
  output: object containing average features of input tracks
*/
async function calculateAverageFeatures(spotifyInstance, trackList) {
  // console.log('size: ', trackList.length, trackList);
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
  calculateMedianFeatures,
  calculateAverageFeatures,
};
