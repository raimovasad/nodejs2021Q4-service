module.exports ={
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
    es6:true
  },
  ignorePatterns:['dist','docs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true
    },
    tsconfigRootDir: __dirname,
  },
  plugins:[
    '@typescript-eslint',
    "eslint-plugin-tsdoc"
  ],
  settings: {
    "noInlineConfig": true,
    "import/resolver":{
      "node":{
        "extensions":[".js",".jsx",".ts",".tsx",".cjs"]
      }
    },
    "node": {
      "allowModules": ["electron"],
      "resolvePaths": [__dirname],
      "tryExtensions": [".js", ".json", ".node",".ts",".cjs"]
  }
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "prettier"
  ],
  rules: {
    "node/no-missing-require": ["error", {
      "allowModules": ["electron"],
      "resolvePaths": ["/node_modules"],
      "tryExtensions": [".js", ".json", ".node",".ts",".cjs"]
    }],
    "import/extensions": "off",
    "linebreak-style": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    '@typescript-eslint/no-var-requires':0,
    "@typescript-eslint/no-explicit-any": 1
  }
}
