const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map', 
    // tell the path where the output file should be present and the name
    output: {
        filename: 'appbundle.js',
        path: path.join(__dirname, '/dist')

    }
});