module.exports = {
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
