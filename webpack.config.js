const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  entry: ["./src/js/index.js", "./src/_scss/main.scss"], // entry file js dan css
  output: {
    // untuk bagian output file hasil compile webpack
    filename: "js/index.js",
    path: path.join(__dirname, "./build/")
  },
  devServer: { // webpack dev server
      contentBase: "./build"
  },
  module: {
    rules: [
      {
        test: /\.html$/, // untuk bagian html
        use: [{ loader: "html-loader", options: { minimize: true } }]
      },
      {
        test: /\.(png|jpe?g)/i, // optimaze gambar
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./img/[name].[ext]",
              limit: 10000
            }
          },
          {
            loader: "img-loader"
          }
        ]
      },
      {
        test: /\.scss$/, // untuk bagian scss/css
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { minimize: true }
            },
            { loader: "postcss-loader" },
            { loader: "sass-loader" }
          ]
        })
      },
      {
        test: /\.js$/, // untuk bagian es5/es6
        use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename: "css/main.css"
    })
  ]
};