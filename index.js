const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const routes = require('./routes/routes');


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', routes);


app.engine('.hbs',hbs({
    defaultLayout:'layout',
    extname: '.hbs'
}));

app.set('view engine','.hbs');

app.listen(3000,() =>{
    console.log('Server is listening on port 3000')
});
