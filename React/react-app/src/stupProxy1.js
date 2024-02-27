const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log(1233)
  app.use(
      createProxyMiddleware('/xx', {   // 匹配所有带'/api'的接口地址进行代理转发
          target: 'https://it.nti56.com',  // 代理地址
          changeOrigin: true,
          pathRewrite: {
              '^/xx': ''  // 将请求地址中的'/api'重写为空再请求接口（也就是去掉/api）
          }
      })
  )
}