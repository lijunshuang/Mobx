const path = require("path")

const config = {
    mode : "development", //production 生产模式
    entry : './src/index.js',
    output : {// 出口文件
        // filename : "bundle.js", //文件名
        // publicPath: "xuni"
        path: path.resolve(__dirname, "dist"), //文件绝对路径
        filename: "main.js"
    },
    module: {
        rules: [{ //配置babel-loader
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["env"],
                    plugins: ["transform-decorators-legacy","transform-class-properties"],
                    // plugins: ["transform-object-rest-spread","transform-runtime"]
                }
            }
        }]
    },
    devtool: 'inline-source-map',
    // resolve: {
    //     //配置别名 省略扩展名
    //     extensions: ['.js', '.json'],
    //     //默认主文件
    //     mainFiles: ['index','Index']
    // },
}

module.exports = config