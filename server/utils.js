/* eslint-disable no-use-before-define */
const stats = require('simple-statistics');


/*
  input: spotify request object, desired time range
  output: filtered array containing top tracks
*/
async function getFilteredTopTracks(spotifyInstance, timeRange) {
  try {
    return (await spotifyInstance.getTopTracks(timeRange)).map(trackObj => ({ // filter tracklist
      trackID: trackObj.id,
      name: trackObj.name,
      artists: trackObj.artists.map(artistObj => artistObj.name),
      preview_url: trackObj.preview_url,
      images: trackObj.album.images,
    }));
  } catch (err) {
    return err;
  }
}

async function getFilteredTopArtists(spotifyInstance, timeRange) {
  try {
    return (await spotifyInstance.getTopArtists(timeRange)).map(artistObj => ({
      artistID: artistObj.id,
      name: artistObj.name,
      genres: artistObj.genres,
      images: artistObj.images,
    }));
  } catch (err) {
    return err;
  }
}


/*
  input: spotify request object, desired time range
  output: feature analysis object containing feature to corresponding
          mean, median, and standard deviation of features.
*/
async function calculateFeatureAnalysis(spotifyInstance, trackList) {
  const analysisObject = {}; // {feature -> mean/median/stdev}

  // build set of features to include
  const includeSet = {};
  [
    'danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo',
  ].forEach((feature) => {
    includeSet[feature] = true;
  });

  try {
    // populate helper object and initialize return object
    const featureToValues = {}; // helper object {feature -> list of values}
    const featureList = await spotifyInstance.getFeatures(trackList.map(track => track.trackID));
    featureList.forEach((featureObj) => {
      Object.keys(featureObj).forEach((feature) => {
        if (feature in includeSet) {
          if (feature in featureToValues === false) { // initialize object keys
            analysisObject[feature] = {};
            featureToValues[feature] = [];
          }
          featureToValues[feature].push(featureObj[feature]);
        }
      });
    });
    // populate return object
    Object.keys(featureToValues).forEach((feature) => {
      const valuesArray = featureToValues[feature];
      valuesArray.sort((a, b) => a - b);
      analysisObject[feature].mean = $calculateMean(valuesArray);
      analysisObject[feature].median = $calculateMedian(valuesArray);
      analysisObject[feature].stdev = stats.sampleStandardDeviation(valuesArray);
    });
    return analysisObject;
  } catch (err) {
    console.log(err);
    return err;
  }
}


// ($helper func.) calculate mean of array
function $calculateMean(array) {
  const arrayLen = array.length;
  let average = 0;
  array.forEach((value) => {
    average += (value / arrayLen);
  });

  return average;
}

// ($helper func.) calculate median of array
function $calculateMedian(array) {
  const arrayLen = array.length;
  const type = (arrayLen % 2 === 0) ? 'even' : 'odd';

  switch (type) {
    case 'even':
      return (array[(arrayLen / 2) - 1] + array[arrayLen / 2]) / 2;
    case 'odd':
      return array[Math.floor(arrayLen / 2)];
    default:
      return null;
  }
}

module.exports = {
  getFilteredTopTracks,
  getFilteredTopArtists,
  calculateFeatureAnalysis,
};
