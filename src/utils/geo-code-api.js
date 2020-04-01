const  request = require('request');

const endPoint = 'mapbox.places';
const mapBoxSecretKey = process.env.MAP_BOX_KEY;
var url = (endPoint, searchText) => `https://api.mapbox.com/geocoding/v5/${endPoint}/${searchText}.json?access_token=${mapBoxSecretKey}&limit=1`;

const getLatLongForLocation = (searchText=st, callback) => {
    searchText = encodeURIComponent(searchText) ;
    request({url:url(endPoint, searchText), json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (response.body.features.length === 0) {
            callback('Location not found!');
        } else {
            const {place_name, center} = response.body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                place_name
            });
        }
    });
};


module.exports = {
    getLatLongForLocation
};