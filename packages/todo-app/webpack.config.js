const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        // Tell webpack that src/index.ts is an "entrypoint" to a bundle with [name] "todo-app"
        "todo-app": ["./src/index.tsx"],
    },
    output: {
        // Tell webpack where to put the final bundle output files
        path: path.resolve(__dirname, "dist"),

        // Tell webpack how to name the output files
        filename: "[name].js",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
    },

    // Don't generate source maps to make it easier for us to inspect the output
    devtool: false,

    // Toggle production <-> development builds with the `NODE_ENV` environment variable
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    // Configure loaders
    module: {
        rules: [
            // Compile TypeScript to JavaScript
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "src/tsconfig.json",
                        },
                    }
                ]
            },

            // Compile Sass to CSS, and extract CSS into a separate output file
            {
                test: /\.scss$/,
                sideEffects: true,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: "css-loader",
                        options: {},
                    },
                    {
                        loader: "sass-loader",
                        options: {},
                    },
                ],
            },

            // Extract CSS into a separate output file
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: "css-loader",
                        options: {},
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
    ],

    // Configure webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
    }
};
