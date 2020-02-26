// compile, transpile, minify ...put everything into one file and give it to html if a web app.
const path = require('path');
//htmlWebPackPlugin: This generates the HTML dynamically, with an <script> tag including our dist/app.js file.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {

    // give the entry JS file for our app.
    entry: './src/app.js',
    // how to compile things, takes the files with regex extensions and uses the loader provided to compile a/c
    module: {
        rules : [
            {
                test: /\.(js|jsx)$/,
                // if we dont want to transpile all the js files inside node_modules, the modules in the imports will be transpiled.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }

            },
            // look at all the files ending with .css and use the loader provided
            {
               test: /\.css/,
               use: [ 'style-loader', 'css-loader' ] 
            }
        ]

    },

    plugins: [
        new CompressionPlugin(),
        //We can also not specify the template, the plugun will create a default html.
        // But if we want to add any scripts this is a nice way to create our own html, add scripts 
        new HtmlWebpackPlugin({template: './src/index.html'}),
       
    ]


}