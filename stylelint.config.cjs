module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-declaration-use-variable'],
  rules: {
    'color-no-hex': true, // forbid hex in CSS
    'plugin/declaration-use-variable': [
      ['/color/', { ignoreValues: ['transparent', 'currentColor', 'inherit'] }]
    ]
  }
};
