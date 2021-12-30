/* eslint-disable import/no-extraneous-dependencies */

const StyleDictionary = require('style-dictionary').extend({
  source: ['src/Theme/design-tokens.tokens.json'],
  platforms: {
    web: {
      transformGroup: 'js',
      buildPath: 'src/Theme/',
      files: [
        {
          destination: 'colors.js',
          format: 'javascript/es6',
          filter: {
            attributes: {
              category: 'color',
            },
          },
        },
        {
          destination: 'typography-tokens.js',
          format: 'javascript/module',
          filter: {
            attributes: {
              category: 'typography',
            },
          },
        },
      ],
    },
  },
});

StyleDictionary.buildAllPlatforms();
