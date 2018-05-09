const path = require('path');
const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
const { find } = require('lodash');

const isProd = process.env.NODE_ENV === 'production';

function replaceLoaders(config, test, callback) {
  const rule = find(config.module.rules, (r) => String(r.test) === String(test));

  if (rule) {
    rule.use = callback(rule.use);
  }

  return config;
}

// Since we want to uses SCSS modules, we need to replace the
// default SCSS loader config that ships with electron-webpack.
function replaceSassLoader(config) {
  return replaceLoaders(config, /\.scss/, () => [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: !isProd,
        minimize: isProd,
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
    {
      loader: 'sass-loader',
      options: {
        data: '@import "common/stylesheets/variables"; @import "common/stylesheets/mixins";',
        includePaths: [path.resolve(__dirname, '..', './src')],
        sourceMap: !isProd
      }
    }
  ]);
}

module.exports = async (env) => {
  const config = await webpackRenderer(env);
  return replaceSassLoader(config);
};
