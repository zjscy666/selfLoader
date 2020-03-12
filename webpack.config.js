var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9020,
        hot: true
    },
    entry: path.join(__dirname, './index.js'),
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader'
                },
                {
                    loader: 'html-addJs-loader',
                    options: {
                        // js: path.resolve(__dirname, 'src/replaceJs/index.js'),
                        js: path.resolve(__dirname, 'loaderJs/replaceJs/index.js'),
                    },
                }
            ]
        }]
    },
    resolveLoader: {
        modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/loaders')]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyWebpackPlugin([
            {
                from: 'loaderJs',
                to: path.resolve(__dirname, 'dist/loaderJs'),
            }
        ]),
        new HotModuleReplacementPlugin()
    ]
}