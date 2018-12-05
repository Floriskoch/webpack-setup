const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const getLoaders = () => {
    return [
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        importLoader: 2,
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            autoprefixer({ 'browsers': ['> 1%', 'last 2 versions'] })
                        ],
                    }
                },
                'sass-loader'
            ]
        },
        {
            test: /svgs\/.*\.svg$/,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true,
                        spriteFilename: 'assets/images/svgsprite.svg',
                    }
                }
            ],
        }
    ];
};

const getPlugins = () => {
    return [
        new MiniCssExtractPlugin({
            filename: 'assets/styles/toolkit.css',
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new BrowserSyncPlugin({
			proxy: 'automotive.tv',
			host: 'localhost',
			port: 3000,
		})
    ];
};

module.exports = (env) => {

	return {
		mode: 'development',
		entry: './src/assets/scripts/main.js',
		output: {
			filename: 'assets/scripts/main.js',
			path: path.resolve(__dirname, 'dist/')
		},
		devtool: 'eval-source-map',
		// devServer: {
		// 	contentBase: path.join(__dirname, 'src'),
		// 	compress: true,
		// 	hot: true,
		// 	port: 9000,
		// },
		module: {
			rules: getLoaders()
		},
		plugins: getPlugins(),
	}
};
