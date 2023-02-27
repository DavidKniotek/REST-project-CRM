const express = require('express');
const homeRouter = express.Router(); // we're creating the router

homeRouter
    .get('/', (req, res) => {
       res.redirect('/client');
    });

module.exports = {
    homeRouter,
}