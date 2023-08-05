const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV == 'production'

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: { path: path.resolve(__dirname, 'dist') },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: '**/*.html',
                    to: '[path][name][ext]',
                    context: 'src',
                },
            ],
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
}

module.exports = config
