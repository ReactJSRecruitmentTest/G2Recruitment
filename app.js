// Config
const config = require(__dirname + '/config/config');

// Modules
const expressUtilities = require(config.ROOT + '/utilities/express');
const configureRoutes = require(config.ROOT + '/routes/configureRoutes');

/********* Express Configuration *******/
const app = expressUtilities.appConfiguration.init();

/********* Setup Routes *******/
configureRoutes.init(app);


app.listen(config.PORT);
console.log('Application started on port: ' + config.PORT);
