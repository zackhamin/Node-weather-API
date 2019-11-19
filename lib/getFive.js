const request = require('request');
const {promisify} = require('util');

const promisifiedRequest = promisify(request);


const getFive = async (location1,countrycode1) => {
    let list = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/forecast?q=${location1},${countrycode1}&mode=json&units=metric&APPID=${process.env.APPID}`,
        json: true
    }); 
        return list.body
}

module.exports = getFive;