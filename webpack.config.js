import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";

// Handle `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Webpack configuration
export default {
  entry: "./client/src/index.js",
  // entry: "./client/src/necessary.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      // Babel loader for .js and .jsx 
      {
        test: /\.jsx?$/, // .js and .jsx
        use: {
          loader: "babel-loader", // Use babel-loader for JS files
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], 
          },
        },
        exclude: /node_modules/,
      },
      // TypeScript loader 
      {
        test: /\.tsx?$/, // .ts and .tsx
        use: "ts-loader", 
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // Resolve these file types
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/src/index.html",
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 3000,
    historyApiFallback: true, // Ensure server works with react router
    open: true,
    hot: true,
  },
};
