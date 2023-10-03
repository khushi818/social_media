import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import nodeExternals from 'webpack-node-externals';

export default {
    target: 'node',
    entry: '/server.js',
    output: {
        filename: 'bundle.js',
        path: '/dist',
    },

    plugins: [
        new NodePolyfillPlugin()
    ],
    externals: [nodeExternals()]

}