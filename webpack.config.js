var webpack = require('webpack');
var path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/js/index.js',
    devtool:'source-map',
    output:{
        path: path.join(__dirname,'public'),
        filename:'bundle.js' //输入文件
    },
    module:{
        rules:[{
                test:/\.js$/,
                loader:'babel-loader' 
        }]
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss']//添加在此的后缀所对应的文件可以省略后缀
    }
}