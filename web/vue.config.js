module.exports = {
  // lintOnSave: false,
  devServer: {
    port: 8080,
    https: true,
    proxy: {
      "/lobby": {
        target: "http://localhost:8081",
      },
    },
  },
};
