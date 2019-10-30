module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        open: true
    },
    chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
};
