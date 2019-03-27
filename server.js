const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname+ '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('message',(text)=>{
    return text.toUpperCase();
});

/*app.use((request, response, next)=>{
    response.render('maintenance.hbs');
});*/


app.use((request, response, next)=>{
    var time = new Date().toString();
    var log = (`${time}: ${request.method} ${request.url}`)
    fs.appendFile('server.log', log+'\n', (error)=>{
        if(error){
            console.log('Unable to log message')
        }
    })
    next()
});

app.get('/', (request, response) => {
    response.send({
        name:"ryan",
        school:[
            'bcit',
            'SFU',
            'UBC']
    })
});

app.get('/info', (request, response)=>{
    response.render('index.hbs', {
        title: 'About Page',
        year: new Date().getFullYear(),
        welcome: 'Hello!'
    });
});

app.get('/404', (request, response) =>{
    response.send({
        error: 'Page not found'
    })
});

app.listen(8080, () => {
    console.log(`Server is up and listening on port ${port}`)
});