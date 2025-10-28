const path = require('path');

module.exports = {
  plugins: {
    'postcss-import': {
      resolve(id, basedir) {
        if (id === 'tailwindcss') {
          return id;
        }
        if (id.startsWith('@/')) {
          return path.resolve(process.cwd(), id.slice(2));
        }
        if (id.startsWith('.') || id.startsWith('/')) {
          return path.resolve(basedir, id);
        }
        return id;
      },
    },
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
