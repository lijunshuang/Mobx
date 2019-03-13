module.exports = {
    mode: "development", // 开发模式
    entry: "./src/index.js", //入口文件
    output: { // 出口文件
        filename: "bundle.js", //文件名
        publicPath: "xuni"
    },
    module: {
        rules: [
            // {   //配置less-loader
            //     test: /\.less$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }, {
            //         loader: "less-loader" // compiles Less to CSS
            //     }]
            // },
            // {   //配置less-loader
            //     test: /\.css$/,
            //     use: [{
            //         loader: "style-loader" // creates style nodes from JS strings
            //     }, {
            //         loader: "css-loader" // translates CSS into CommonJS
            //     }]
            // },
            { //配置babel-loader
                test: /\.m?js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "react"],
                        plugins: [
                            "transform-decorators-legacy",
                            "transform-class-properties"
                        ]
                    }
                }
            }
        ]
    },
    devtool: "inline-source-map",
    resolve: {
        //配置别名 省略扩展名
        extensions: ['.js', '.jsx'],
        //默认主文件
        mainFiles: ['index', 'Index']
    },
    //配置代理跨域
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'http://192.168.1.111', //跨域 服务器地址
    //         pathRewrite: {'^/api' : ''}
    //       }
    //     }
    //   }
    // watch : true, //实时监控
}