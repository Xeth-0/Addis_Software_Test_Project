const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, _) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    mode: "development",
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          enforce: "pre",
          test: /\.js$/,
          use: "source-map-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        inject: "body",
      }),
    ],
    devServer: {
      static: path.join(__dirname, "dist"),
      port: 3000,
      open: true,
      hot: true,
    },
  };
};
