const path = require('path');

module.exports = {
  plugins: [
    [
      'postcss-import',
      {
        resolve(id) {
          if (id.startsWith('@/')) {
            return path.resolve(__dirname, id.slice(2));
          }
          return id;
        },
      },
    ],
    ['@tailwindcss/postcss', {}],
    ['autoprefixer', {}],
  ],
};
