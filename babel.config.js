module.exports = api => {
  api.cache(true);
  return {
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
      ]
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
    env: {
      test: {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-env"
        ]
      }
    }
  };
};
