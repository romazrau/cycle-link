const path = require("path");

module.exports = {
    entry: "./src/app.js", //進入點
    mode: "development", // development or production
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000
    }


};
