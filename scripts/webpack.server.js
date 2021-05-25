const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const base = require('./webpack.base')
const path = require('path')
module.exports = merge(base, {
    target:'node',
    entry:{
        server: path.resolve(__dirname,'../src/server-entry.js')
    },
    output:{
        libraryTarget:"commonjs2"
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'../public/index.ssr.html'),
            filename: 'server.html',
            excludeChunks:['server'] ,//忽略server
            minify:false//不压缩
        }),
    ]
})