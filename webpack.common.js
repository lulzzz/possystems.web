const path = require('path');
const clientBundleOutputDir = './public/dist';

const config = {
  entry: { 'main-client': './ClientApp/index.js' },
  output: {
    path: path.resolve(__dirname, clientBundleOutputDir),
    filename: '[name].js',
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /ClientApp/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/env',
                  {
                    targets: {
                      edge: '17',
                      firefox: '60',
                      chrome: '67',
                      safari: '11.1',
                      esmodules: true,
                    },
                    useBuiltIns: 'usage',
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-optional-chaining',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
