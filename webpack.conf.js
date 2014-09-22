module.exports = {
    cache: true,
    output: {
        filename: 'index.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', 'src/js']
    },
    devtool: '#inline-source-map'
};