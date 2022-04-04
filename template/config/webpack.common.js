const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const buildDir = path.resolve(__dirname, "../dist");
const rootDir = path.resolve(__dirname, "../");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public", "index.html"),
      publicPath: '/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(rootDir, "public", "favicon.ico"),
          to: path.resolve(buildDir, "public", "favicon.ico"),
        },
        {
          from: path.resolve(rootDir, "public", "images"),
          to: path.resolve(buildDir, "public", "images"),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {"runtime": "automatic"}]
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
      }
    ],
  },
  resolve: {
    extensions: [".js"]
  },
  output: {
    filename: "bundle.[fullhash].js",
    path: buildDir,
    clean: true,
  },
};
