module.exports = {
  plugins: {
    "postcss-pxtorem": {
      "rootValue": 192,//设计图是1920
      "propList": ["*"],
      minPixelValue: 12, // px小于12的不会被转换
      unitPrecision: 2, // 保留rem小数点多少位
      selectorBlackList: [] // 忽略的选择器
    },
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
        //'last 10 versions', // 所有主流浏览器最近10版本用
      ],
      grid: true
    }
  }
}