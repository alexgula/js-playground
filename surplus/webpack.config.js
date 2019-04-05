const path = require('path');

module.exports = {
    entry: './src/app.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: 'surplus-loader!ts-loader',
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },

            // LESS loader
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap',
                    //'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'less-loader',
                ],
            },

            // Fonts loader
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
            },
        ],
    },

    plugins: [],
};
