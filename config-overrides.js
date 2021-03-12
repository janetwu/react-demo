const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer,
} = require("customize-cra");

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/ots': {
        target: 'http://e-shield.glsx.net',//'http://e-shield.didihu.com.cn',//
        changeOrigin: true,
        secure: false
      },
      
    }
  };
};
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'source-map' : false

  return config
}
module.exports = {
  webpack: override(
    // 配置路径别名
    addWebpackAlias({
      "@": resolve("src"),
    }),
    rewiredMap(),
    // 使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#008f3f", "@link-color": "#008f3f"},
      }
      
    }),
  ),
  devServer: overrideDevServer(devServerConfig())
}