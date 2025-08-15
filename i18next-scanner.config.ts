const fs = require('fs');
const parser = require('@babel/parser');

const lngs = ['en', 'es', 'zh', 'pt', 'ru', 'ko', 'jp', 'it', 'hi', 'fr', 'de'];

module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**'
  ],
  output: './',
  options: {
    debug: false,
    func: {
      list: ['t', 'i18next.t'],
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    trans: false,
    lngs,
    defaultLng: 'en',
    defaultValue: '',
    keySeparator: false,
    nsSeparator: false,
    resource: {
      loadPath: 'locales/{{lng}}.json',
      savePath: 'locales/{{lng}}.json'
    },
    parse: (filename, content, options) => {
      try {
        const ast = parser.parse(content, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript']
        });
        return ast;
      } catch (err) {
        console.error(`Error parsing ${filename}:`, err.message);
      }
    }
  },
  transform: function (file, enc, done) {
    const parserStream = this.parser;
    const content = file.contents.toString(enc);

    parserStream.parseFuncFromString(content, { list: ['t', 'i18next.t'] }, (key) => {
      // English → key as value
      parserStream.set(key, key);

      // Other langs → empty string
      lngs.forEach((lng) => {
        if (lng !== 'en') {
          parserStream.set(key, lng, key);
        }
      });
    });

    done();
  }
};
