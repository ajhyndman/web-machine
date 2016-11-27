// @flow
'use strict';

const path = require('path');

const repoDir = path.join(__dirname, '..');
const libDir = path.join(repoDir, 'lib');
const sourceDir = path.join(repoDir, 'src');

const config = {
  entry: path.join(sourceDir, 'index.js'),
  module: {
    loaders: [
      // Transform .js files to ES5 with Babel.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            'transform-flow-strip-types'
          ],
          presets: [
            'es2015',
            'stage-2'
          ]
        }
      }
    ]
  },
  // Configuration for assets generated by the build process.
  output: {
    // Name of the entry assets to generate.
    filename: 'app.js',
    // Output directory to write the assets to.
    path: libDir
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ],
    modulesDirectories: [
      'node_modules'
    ],
    root: sourceDir
  }
};

module.exports = config;
