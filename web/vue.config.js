module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/lobby": {
        target: "http://localhost:8081",
      },
    },
  },
};
