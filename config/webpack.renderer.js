const path = require('path');
const merge = require('webpack-merge');
const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
const { extend, find, flow } = require('lodash');

const isProd = process.env.NODE_ENV === 'production';

function replaceLoader(config, test, callback) {
  const rule = find(config.module.rules, (r) => String(r.test) === String(test));

  if (rule) {
    extend(rule, callback(rule));
  }

  return config;
}

// Since we want to uses SCSS modules, we need to replace the
// default SCSS loader config that ships with electron-webpack.
function replaceSassLoader(config) {
  return replaceLoader(config, /\.scss/, () => ({
    use: [
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
    ]
  }));
}

function replaceSvgLoader(config) {
  const updatedConfig = replaceLoader(config, /\.(png|jpe?g|gif|svg)(\?.*)?$/, () => ({
    test: /\.(png|jpe?g|gif)(\?.*)?$/
  }));

  return merge.smart({}, updatedConfig, {
    module: {
      rules: [{
        test: /\.(svg)$/,
        loader: 'svg-react-loader'
      }]
    }
  });
}

module.exports = async (env) => {
  const config = await webpackRenderer(env);

  return flow(
    replaceSassLoader,
    replaceSvgLoader
  )(config);
};
