import express from 'express';
// const path = require('path');

let configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './src/views')
    // app.set('views', path.join(__dirname, '../views'))
} 

module.exports = configViewEngine;