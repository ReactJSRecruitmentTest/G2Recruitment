const config = require('../config/config')
const allPersonnel = require(config.ROOT + '/fixtures/personnel.json');

const routes = {
    init: (app) => {
        app.get('/api/personnel', (req, res, next) => {
            const offset = parseInt(req.query.offset) || 0;
            const limit = parseInt(req.query.limit) || 10;

            const returnPersonnel = allPersonnel.slice();
            const total = returnPersonnel.length;

            if (offset > total) {
                res.type('json').sendStatus(400);
            };

            res.json({
                offset,
                limit,
                total,
                data: returnPersonnel.slice(offset, offset + limit)
            });
        });
    }
};
module.exports = {
    routes
};
