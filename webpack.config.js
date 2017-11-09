const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: './clientBootstrapper.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },
    devtool: 'eval-source-map'
};