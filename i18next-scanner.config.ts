const fs = require('fs');
const parser = require('@babel/parser');

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
    lngs: ['en', 'es', 'zh', 'pt', 'ru', 'ko', 'jp', 'it', 'hi', 'fr', 'de'],
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
  }
};
