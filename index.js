const express = require('express');
const hbs = require('express-handlebars');
const {clientRouter} = require("./routers/client");
const {homeRouter} = require("./routers/home");
const {dataBase} = require('./utils/data-base');

const app = express(); // instance of our app

// ---- CONFIG ----

app.use(express.urlencoded({ // important, because we'll be adopting data from our forms etc
    extended: true,
}));

app.use(express.static('public')); // we're connecting the static files from public folder, where we can locate out frontend

app.use(express.json()); // we can add this to let our API accept also requests in JSON (defaulty we're using urlencoded)

app.engine('.hbs', hbs.engine({ // info that we'll be using an engine for hbs files
    extname: '.hbs', // info that our file names will be ending with .hbs
    // helpers: handlebarsHelpers, // info that we'll be using handlebarsHelpers file
}));

app.set('view engine', '.hbs'); // we inform express that if we'll be using a 'render' method, we'll be using the hbs engine to generate views

app.use('/', homeRouter);
app.use('/client', clientRouter);
app.get('/test', (req, res) => {
    dataBase.update('49e9995a-6c75-475b-b307-d7500bd6315e', {
        name: 'Test 2',
    });
    res.send('ok');
});

// ---- APP RUNNING ----

app.listen(3000, 'localhost', () => {
    console.log('Listening...');
}); // we're activating the app listening