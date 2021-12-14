module.exports = {
    configureWebpack: {
    optimization: {
        splitChunks: {
            minSize: 10000,
            maxSize: 250000,
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? 'https://cdn.henrywalters.dev/web/' : '/',
}