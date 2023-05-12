const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
        logLevel: "debug",
      },
      "^/cloudinary": {
        target: process.env.VUE_APP_API_CLOUDINARY_URL,
        changeOrigin: true,
        logLevel: "debug",
      },
      "^/auth": {
        target: process.env.VUE_APP_API_AUTH_URL,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
});
