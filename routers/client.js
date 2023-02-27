const express = require('express');
const clientRouter = express.Router(); // we're creating the router

clientRouter
    .get('/', (req, res) => {
       res.send('All works fine!');
    });

module.exports = { //we're exporting clientRouter, it allows to use it in the other files
    clientRouter,
}