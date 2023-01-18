const { resolve, babelLoaderConf } = require('./utils.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoader = require('vue-loader');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
    entry: {
        app: resolve('src/main.ts'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.mjs'],
        alias: {
            '@': resolve('src'),
            '@component': resolve('src/package/modules'),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        },
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/, // 不解析库
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            reactivityTransform: true,
                        },
                    },
                ],
                include: /(src)/,
            },
            {
                test: /\.(ts|js)x?$/,
                use: [babelLoaderConf],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [resolve('src/assets/svg')],
                options: {
                    symbolId: 'icon-[name]',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: 'assets/images/[base]',
                },
                exclude: [resolve('src/assets/svg')],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'files/[base]',
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[base]',
                },
            },
            // element-plus
            {
                test: /\.mjs$/,
                include: /node_modules/,
                resolve: {
                    fullySpecified: false,
                },
                type: 'javascript/auto',
            },
        ],
    },

    plugins: [
        // vue-loader插件
        new vueLoader.VueLoaderPlugin(),
        require('unplugin-vue-define-options/webpack')(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('public/index.html'),
            favicon: resolve('public/favicon.ico'),
            inject: true,
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        // element-plus 按需引入
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dirs: ['src/core/hooks/'],
            vueTemplate: false,
            defaultExportByFilename: false,
            resolvers: [
                ElementPlusResolver({
                    importStyle: false,
                }),
            ],
            eslintrc: {
                enabled: true,
                filepath: './.eslintrc-auto-import.json',
                globalsPropValue: true,
            },
        }),
        Components({
            dirs: ['src/components/', 'src/package/modules/**/components/'],
            // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
            extensions: ['vue'],
            // 生成components.d.ts
            dts: true,
            // 遍历子目录
            deep: true,
            resolvers: [
                ElementPlusResolver({
                    importStyle: false,
                }),
            ],
        }),
    ],
};
