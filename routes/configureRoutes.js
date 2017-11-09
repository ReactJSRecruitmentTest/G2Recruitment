const config = require('./../config/config');

const configureRoutes = {
    init: function init(app) {

        /********* Personnel Routes ***********/
        const personnelApiRoute = require(config.ROOT + '/routes/personnel');
        personnelApiRoute.routes.init(app);


        app.use((req, res) => {
            res.sendFile(config.ROOT + '/index.html');
        });


    }
};
module.exports = configureRoutes;
