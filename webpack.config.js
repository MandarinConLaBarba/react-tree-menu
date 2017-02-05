var webpack = require("webpack");
var validator = require("webpack-validator");


var config = {
    cache: true,
    devtool: 'inline-source-map',
    entry: './example/Boot',
    output: {
        path: __dirname + "/example",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loaders: ['react-hot', 'babel-loader']
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        hot: true,
        inline: true,
        contentBase: './example/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ]
};



module.exports = validator(config, {
    quiet: true,
    rules: {
        'no-root-files-node-modules-nameclash': false
    }
});
