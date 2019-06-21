/* eslint-disable no-use-before-define */
const stats = require('simple-statistics'); // utility library for common stats funcs.

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
  } catch (error) {
    console.log(error);
    return error;
  }
}


/*
  input: spotify request object, desired time range
  output: filtered array containing top artists
*/
async function getFilteredTopArtists(spotifyInstance, timeRange) {
  try {
    return (await spotifyInstance.getTopArtists(timeRange)).map(artistObj => ({
      artistID: artistObj.id,
      name: artistObj.name,
      genres: artistObj.genres,
      images: artistObj.images,
    }));
  } catch (error) {
    console.log(error);
    return error;
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
  } catch (error) {
    console.log(error);
    return error;
  }
}


/*
  input: filtered array of top artists
  output: top k genres among top artists
*/
async function calculateTopKGenres(spotifyInstance, topArtists, k) {
  const availableGenres = {}; // set of available/relevant genres for seed recs
  const genreToFreqMap = {}; // {genre -> freq}
  const genreToFreqArr = []; // array of relevant genres sorted by frequency
  try {
    // build set of available genres
    const genreList = await spotifyInstance.getAvailableGenreSeeds();
    genreList.forEach((genre) => {
      availableGenres[genre] = true;
    });

    // populate frequency map with relevant genres
    topArtists.forEach((artistObj) => {
      artistObj.genres.forEach((genre) => {
        const formattedGenre = genre.split(' ').join('-'); // format for api
        if (formattedGenre in genreToFreqMap === false) {
          if (formattedGenre in availableGenres) {
            genreToFreqMap[formattedGenre] = 1; // adds to map if not present
          }
        } else {
          genreToFreqMap[formattedGenre] += 1;
        }
      });
    });

    // add available genres to array and sort by freq
    Object.keys(genreToFreqMap).forEach((genre) => {
      const freqObj = {}; // {relevant genre -> freq}
      freqObj[genre] = genreToFreqMap[genre];
      genreToFreqArr.push(freqObj);
    });
    genreToFreqArr.sort((freqObj1, freqObj2) => {
      return freqObj2[Object.keys(freqObj2)[0]] - freqObj1[Object.keys(freqObj1)[0]];
    });
    return genreToFreqArr.slice(0, k).map(freqObj => Object.keys(freqObj)[0]);
  } catch (error) {
    console.log(error);
    return error;
  }
}

/*
  input: spotify request object, request object from frontend
  output: array of track object that fit query
*/
async function getTargetRecommendations(spotifyInstance, requestObj) {
  const searchParams = {};

  Object.keys(requestObj).forEach((param) => {
    if (Array.isArray(requestObj[param])) { // convert all array params to strings
      searchParams[param] = requestObj[param].toString();
    } else { // TODO: logic for features

    }
  });

  console.log('from utils, searchParams: ', searchParams);

  /*
  Object.keys(featureAnalysisObject).forEach((feature) => {
    searchParams[`target_${feature}`] = featureAnalysisObject[feature].median;
  }); */

  try {
    // console.log('yeet: ', (await spotifyInstance.getRecommendations(searchParams)).tracks);
    // return (await spotifyInstance.getRecommendations(searchParams));

    return ((await spotifyInstance.getRecommendations(searchParams)).tracks).map(trackObj => ({
      trackID: trackObj.id,
      name: trackObj.name,
      artists: trackObj.artists.map(artistObj => artistObj.name),
      preview_url: trackObj.preview_url,
      images: trackObj.album.images,
    }));
  } catch (error) {
    return error;
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
  calculateTopKGenres,
  getTargetRecommendations,
};
