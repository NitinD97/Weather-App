# Weather-App
Weather forecast app

### Description
The app will take the location name/address, and return the weather forecast for the day.\
The app will fetch the lat-long for the address and call another api that fetches the data for the forecast.\
Maximum no of calls per day is limited!

Made using\
NodeJS, handlebars.

### Commands to run
Check for node and npm availability in PC. 
Open terminal and cd into the app directory.
> npm install 

The app will work not work without the forecast app keys.
The keys will be obtained by signing up for https://www.mapbox.com/ and https://darksky.net/dev \
Keep Mapbox api key in env variable - `MAP_BOX_KEY` \
Keep Darksky api key in env variable - `DARK_SKY_KEY`

> npm src/app.js
