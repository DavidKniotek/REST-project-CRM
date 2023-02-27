const express = require('express');
const clientRouter = express.Router(); // we're creating the router

clientRouter
    .get('/', (req, res) => {
       res.send('Download all');
    })

    .get('/:id', (req, res) => {
        res.send('Download one');
    })

    .post('/', (req, res) => {
        res.send('Add');
    })

    .put('/:id', (req, res) => {
        res.send('Modify');
    })

    .delete('/:id', (req, res) => {
        res.send('Delete');
    })

module.exports = { //we're exporting clientRouter, this allows to use it in the other files
    clientRouter,
}