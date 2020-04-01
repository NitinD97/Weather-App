const  request = require('request');

const darkSkySecretKey = process.env.DARK_SKY_KEY;
const url = (lat, long) => `https://api.darksky.net/forecast/${darkSkySecretKey}/${lat},${long}?units=si`;

const getWeatherForecastForLocation = (latitude, longitude, callback) => {
    request({url: url(latitude, longitude), json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to weather api!')
        } else if (response.body.error) {
            callback('Unable to Fetch weather data')
        } else {
            const {temperature, precipProbability} = response.body.currently;
            callback(undefined, `The temp is ${temperature} degrees. ${precipProbability}% rain possible!`);
        }
    });
};

module.exports = {
    getWeatherForecastForLocation: getWeatherForecastForLocation
};