var webpack = require('webpack');

module.exports = {
    // 모듈로 내보내겠다.
    // entry: './src/index.js',
    entry: {
        app: [
            'react-hot-loader/patch',
            './src/index.js'
        ]
    },
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        // 수정될때마다
        inline: true,
        host: '0.0.0.0',
        // 기본값 로컬
        port: 4001,
        contentBase: __dirname + '/public/',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use 추가
                use: 
                    {
                        loader: 'babel-loader'
                    }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}