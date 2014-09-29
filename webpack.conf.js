module.exports = {
    cache: true,
    output: {
        filename: 'index.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/js']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'es6-loader'
        }]
    },
    devtool: '#inline-source-map'
};