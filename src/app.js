const path = require('path');
const express = require('express');
const hbs = require('hbs');


const app = express();

// Check the api usage count for a day, so that the limit does not exceed.
let apiUseCount = 0;
let day = new Date(Date()).getUTCDay();
setInterval(() => {
    if (new Date(Date()).getUTCDay() !== day){
        apiUseCount = 0;
        day = new Date(Date()).getUTCDay();
    }
    console.log('Checking Day: ' + day);
}, 600000);


const geoCodeApiJs = require('./utils/geo-code-api');
const weatherApiJs = require('./utils/weather-api');

// Define paths for express config.
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static director to serve.
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nitin Dhiman'
    });
});

app.get('/weather', (req, res) => {
    const {address} = req.query;
    if (!address) {
        return res.send({
            error: 'No address parameter'
        })
    }
    if (apiUseCount>=200) {
        return res.send({
            error: 'Api Usage Count for the day exceeded!'
        })
    }

    apiUseCount += 1;
    geoCodeApiJs.getLatLongForLocation(address, (error, {latitude, longitude, place_name} = {}) => {
        if (error) {
            return res.send({ error });
        } else {
            weatherApiJs.getWeatherForecastForLocation(latitude, longitude, (error, forecast) => {
                if (error) {
                    return res.send({ error });
                } else {
                    res.send({
                        address: req.query.address,
                        place_name,
                        forecast
                    });
                }
            });
        }
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nitin Dhiman'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nitin Dhiman',
        help_text: 'This is help page Here'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Not Found!',
        name: 'Nitin Dhiman',
        errorMessage: 'Help text not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found!',
        name: 'Nitin Dhiman',
        errorMessage: '404 - Not Found!!!'
    });
});

const port = 3000;
app.listen(port, ()=> {
    console.log(`Running server at ${port}!`)
});