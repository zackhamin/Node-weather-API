
const request = require('request');
const {promisify} = require('util');

const promisifiedRequest = promisify(request);


const getWeather = async (location,countrycode) => {
    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${location},${countrycode}&mode=json&units=metric&APPID=${process.env.APPID}`,
        json: true
    }); 
        return data.body
}

module.exports = getWeather;