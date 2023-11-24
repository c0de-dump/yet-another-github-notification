const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const config = {
    entry: {
        background: path.resolve(__dirname, 'src/background.ts'),
        setting: path.resolve(__dirname, 'src/setting.ts'),
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, 'src'),
                    from: '**/*.html',
                    to: path.resolve(__dirname, 'dist'),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /.(ts|tsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            'webextension-polyfill-ts': path.resolve(__dirname, 'node_modules', 'webextension-polyfill-ts'),
        },
    },
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'

        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
    } else {
        config.mode = 'development'
    }
    return config
}
