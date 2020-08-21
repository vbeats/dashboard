const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios'
    },
    css: [],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.4.3/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js'
    ]
}

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        open: false
    },

    productionSourceMap: false,

    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ],
        externals: isProd ? assetsCDN.externals : {}
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        if (isProd) {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN
                return args
            })
        }

        // 拆鸡鸡
        config.optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 1998848, //244 KB
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `chunk.${packageName.replace('@', '')}`;
                    },
                    priority: 10
                }
            }
        })
    },
};
