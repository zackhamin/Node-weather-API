const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');

const app = express();

const getWeather = require('./lib/getWeather')
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs',hbs({
    defaultLayout:'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs');

app.get('/', async(req,res) => {
    let data = await getWeather();
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let describe = data.weather[0].description;
    res.render ('index', {temp,humidity,describe});
})


app.listen(3000,() =>{
    console.log('Server is listening on port 3000')
});
