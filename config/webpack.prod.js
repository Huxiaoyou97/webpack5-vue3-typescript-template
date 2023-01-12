const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('./utils.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 将CSS文件抽取出来配置, 防止将样式打包在 js 中文件过大和因为文件大网络请求超时的情况。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // 对CSS文件进行压缩
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.base');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
    const nodeEnv = env.test ? 'test' : env.dev ? 'development' : 'production';
    const analyzerPlugins = env.analyzer
        ? [
              new BundleAnalyzerPlugin({
                  analyzerMode: 'static',
                  openAnalyzer: false,
                  //   generateStatsFile: true,
                  reportFilename: resolve('./report/report.html'),
                  statsFilename: resolve('./report/stats.json'),
              }),
          ]
        : [];
    return merge(common, {
        mode: 'production',
        optimization: {
            // chunk拆分
            splitChunks: {
                chunks: 'all', // 三个枚举值： async 异步加载导入的模块 import('module').then() ; initial 直接import导入的模块 ; all 包含上述两种情况
                // 默认值是20000Byte，表示大于这个大小的引入文件都需要抽离出来
                minSize: 20000,
                // 表示的是大于多少字节的包需要进行二次拆分，拆分为不小于minSize的包
                // 多数情况下，如果设置maxSize的值的时候，minSize和maxSize的值一般是一致的
                maxSize: 20000,
                // 某一个包引入了多少次就需要被抽离出来
                minChunks: 1,
                // cacheGroups的含义是 所有的模块输出，会存放在缓存中，最后一起执行对应的操作
                // 在这个属性里面可以自己自定义的代码分割配置
                // cacheGroups的优先级小于minSize和maxSize，所以当两种冲突的时候，cacheGroup中的配置会默认失效
                cacheGroups: {
                    // key可以任意取，在这边只是一个占位符
                    // value是一个配置对象
                    vendor: {
                        // 正则，用以匹配对应的模块路径
                        test: /[\\/]node_modules[\\/]/,
                        // 输出文件名 输出文件会以 输出文件名-hash值.js的形式输出
                        // name: "vender",

                        // filename 输出文件名，和name不同的是，filename中可以使用placeholder
                        filename: 'vendor_[id].js',
                        // 优先级 在这个配置中约定俗称，一般设置为负数
                        priority: -10,
                    },
                    default: {
                        minChunks: 2,
                        filename: 'common_[id].js',
                        priority: -20,
                    },
                },
                enforceSizeThreshold: 20000, // 当chunk的大小超过此值将强制拆分
            },
            // 压缩
            minimize: true,
            minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
            // tree shaking
            usedExports: true,
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    // postcss-preset-env 内部集成了 autoprefixer 添加css第三方前缀
                                    plugins: ['postcss-preset-env'],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // additionalData: `
                                //   @use "@/styles/variables.scss" as *;
                                //   @use "@/styles/mixin.scss" as *;
                                // `,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            // 清空dist
            new CleanWebpackPlugin(),
            // css抽离
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[contenthash].css',
                chunkFilename: 'assets/css/[name].[contenthash].css',
            }),
            // css压缩
            new CssMinimizerPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(nodeEnv),
                'process.env.VUE_BASE_URL': JSON.stringify('456'),
                __VUE_OPTIONS_API__: true,
                __VUE_PROD_DEVTOOLS__: false,
            }),
            ...analyzerPlugins,
        ],
        output: {
            path: resolve('dist'),
            filename: 'assets/js/[name].[hash].js',
            chunkFilename: 'assets/js/[name].[hash].js',
        },
    });
};
