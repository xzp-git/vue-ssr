const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const base = require('./webpack.base')
const path = require('path')
module.exports = merge(base, {
    entry:{
        client: path.resolve(__dirname,'../src/client-entry.js')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../public/index.html'),
            filename: 'client.html'
        }),
    ]
})