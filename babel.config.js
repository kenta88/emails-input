

module.exports = api => {
  api.cache(true);
  return {
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: {
            ie: 11,
          },
        }
      ]
    ],
    plugins: ["@babel/plugin-proposal-class-properties"],
  };
};
