const {Router} = require('express');
const router = Router();

const getWeather = require('../lib/getWeather');
const getFive = require('../lib/getFive');


router.get('/', (req,res) => {
    res.render('index');
})

router.get('/monthly', (req,res) => {
    res.render('monthly');
})


router.post('/',async(req,res) =>{

    let location = req.body.location;
    let countrycode = req.body.countrycode;
    console.log(location)

    let data = await getWeather(location, countrycode);
    console.log(data)
    if (data.cod != 404) {
        
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let describe = data.weather[0].description;
    res.render ('index', {data: {location,temp,humidity,describe}})}
    
    else  {
        res.render ('index',{err:"The location you entered doesnt exist"});
    }

});


router.get('/fiveday', (req,res) => {
    res.render('fiveday');
})


router.post('/fiveday',async(req,res) =>{
    let location1 = req.body.location;
    let countrycode1 = req.body.countrycode;
    console.log(location1)

    let list = await getFive(location1, countrycode1);

    if (list.cod != 404) {   
    let date1 = list.list[0].dt_txt;   
    let temp1 = list.list[0].main.temp;
    // let humidity1 = list[0].humidity;
    // let describe1 = list.weather[0].description;
    // console.log(list.list[0].main.temp)
    // console.log(list)
    res.render ('fiveday', {list: {temp1}})}
    
    else  {
        res.render ('fiveday',{err:"The location you entered doesnt exist"});
    }

});


module.exports = router;