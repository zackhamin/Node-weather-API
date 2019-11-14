const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');

const app = express();

const getWeather = require('./lib/getWeather')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.engine('.hbs',hbs({
    defaultLayout:'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs');

app.get('/', (req,res) => {
    res.render('index');
})

app.post('/',async(req,res) =>{
    let location = req.body.location;
    let countrycode = req.body.countrycode;
    console.log(location)
    let data = await getWeather(location, countrycode);
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let describe = data.weather[0].description;
    res.render ('index', {data: {location,temp,humidity,describe}});
})


app.listen(3000,() =>{
    console.log('Server is listening on port 3000')
});
