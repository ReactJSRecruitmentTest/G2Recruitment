// Config
const config = require('../config/config');

// Modules
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const appConfiguration = {

    init: function init() {
        const app = new express();

        // Middlewares
        app.use(helmet());
        app.use(morgan('dev'));
        app.use('/public', express.static(config.ROOT + '/public'));
        app.use(compression());

        return app;
    }

};
module.exports = {
    appConfiguration
};
