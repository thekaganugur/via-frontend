module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 0,
    'react/prop-types': 0
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  },
};
