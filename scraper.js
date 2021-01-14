//unsplash scraper
const axios = require('axios');
const fs = require('fs');
var https = require('https');
const auth = 'A-sxC0s67IHthpYsqMwoFHt0r35ePHGUUX1CuT5rqdA';
//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function(response) {
  response.pipe(file);
  });
}
const searchAndSaveUnsplash = function ( searchTerm, qty, page, relativePath ) {
  const unsplashURL = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${qty}&client_id=${auth}`
  axios.get(unsplashURL)
  .then(({ data }) => {
    data.results.forEach((result, i) => {
      saveImageToDisk(result.urls.regular, `${relativePath}${i+89}.jpg`)
    })
  })
  .catch(err => console.log(err))
}

// searchAndSaveUnsplash('thailand', 13, 5, '../images/thailand_')
searchAndSaveUnsplash('outfits', 30, 2, './src/assets/')
