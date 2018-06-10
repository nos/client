const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const postCssFlexBugsFixes = require('postcss-flexbugs-fixes');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { compose, getBabelLoader } = require('react-app-rewired');

function injectSassLoader(config, env) {
  const isDev = env === 'development';
  const newConfig = Object.assign({}, config);

  const loaders = [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        sourceMap: isDev,
        minimize: !isDev,
        importLoaders: 1,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDev,
        ident: 'postcss',
        plugins: () => [
          postCssFlexBugsFixes,
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
            flexbox: 'no-2009'
          })
        ]
      }
    },
    {
      loader: 'sass-loader',
      options: {
        data: '@import "root/stylesheets/variables"; @import "root/stylesheets/mixins";',
        includePaths: [path.resolve(__dirname, './src')],
        sourceMap: isDev
      }
    }
  ];

  // We have to inject before the last rule, which is the "file-loader" defined by react-scripts.
  const oneOfRules = newConfig.module.rules.find((rule) => rule.oneOf).oneOf;
  const fileLoaderIndex = oneOfRules.findIndex(
    (rule) => typeof rule.loader === 'string' && rule.loader.match('/file-loader/')
  );

  oneOfRules.splice(fileLoaderIndex, 0, {
    test: /\.s[ac]ss$/,
    exclude: /node_modules/,
    use:
      env === 'production'
        ? ExtractTextPlugin.extract({ fallback: 'style-loader', use: loaders })
        : ['style-loader', ...loaders]
  });

  return newConfig;
}

function injectTarget(config, _env) {
  return merge(config, {
    target: 'electron-renderer',
    node: {
      __dirname: false,
      __filename: false
    }
  });
}

function injectPublicPath(config, env) {
  if (env === 'production') {
    return config;
  }

  return merge(config, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PUBLIC_PATH': JSON.stringify(path.join(__dirname, 'public'))
      })
    ]
  });
}

function rewireBabel(config, _env) {
  const loader = getBabelLoader(config.module.rules);

  if (!loader) {
    console.warn('babel-loader not found'); // eslint-disable-line no-console
    return config;
  }

  loader.options = merge(loader.options, {
    babelrc: fs.existsSync(path.resolve(__dirname, './.babelrc'))
  });

  return config;
}

function injectExternal(external) {
  return (config, _env) => {
    return merge(config, {
      externals: {
        [external]: `commonjs ${external}`
      }
    });
  };
}

module.exports = compose(
  injectTarget,
  injectSassLoader,
  injectPublicPath,
  rewireBabel,
  injectExternal('@cityofzion/neon-js'),
  injectExternal('node-hid')
);
