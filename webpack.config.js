const path = require("path");
const webpack = require("webpack");

module.exports = {
    cache: false,
    devtool: "source-map",
    entry: {
        index: path.join(__dirname, "src", "index.js"),
    },
    output: {
        path: path.join(__dirname, "www", "js"),
        filename: "[name].min.js",
        sourceMapFilename: "[file].map",
    },
    module: {
        rules: [{
            test: /\.(js|jsx|es6)$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: [
                    [
                        "es2015",
                        {
                            modules: false,
                        },
                    ],
                ],
                cacheDirectory: true,
            },
        }, ],
    },
    plugins: [],
};