const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    context: resolve(__dirname, 'src'),
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        './index.tsx'
        // the entry point of our app
    ],
    output: {
        filename: 'sudoku.js',
        // the output bundle
        path: resolve(__dirname, 'dist'), 
        publicPath: '/'
        // necessary for HMR to know where to load the hot update chunks
    },
    devtool: 'inline-source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devServer: {
        hot: true,
        // enable HMR on the server
        noInfo: true,
        // minimize the output to terminal.
        contentBase: resolve(__dirname, 'src'),
        // match the output path
        publicPath: '/'
        // match the output `publicPath`
    },
    module: {
        rules: [
            {
                enforce: "pre",                
                test: /\.(ts|tsx)?$/, 
                loader: 'tslint-loader',
                exclude: [
                    resolve(__dirname, "node_modules"),
                    resolve(__dirname, "src/tests")
                ],
            },             
            { 
                test: /\.tsx?$/, 
                exclude: [
                    resolve(__dirname, "node_modules"),
                    resolve(__dirname, "src/tests")
                ],          
                use: [
                    {loader: 'react-hot-loader/webpack'}, 
                    {loader: 'awesome-typescript-loader'}, 
                ] 
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },                 
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),        
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally
        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        new HtmlWebpackPlugin({template: resolve(__dirname, 'src/index.html')}),
        // inject <script> in html file. 
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),      
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },    
};