const path = require('path');
module.exports = (appInfo)=>{
  return {
    keys: "xqweqrqwre",
    // mysql: {
    //   // 单数据库信息配置
    //   client: {
    //     // host
    //     host: 'localhost',
    //     // 端口号
    //     port: '3306',
    //     // 用户名
    //     user: 'root',
    //     // 密码
    //     password: 'root',
    //     // 数据库名
    //     database: 'atguigudb',
    //   },
    //   // 是否加载到 app 上，默认开启
    //   app: true,
    //   // 是否加载到 agent 上，默认关闭
    //   agent: false,
    // },
    logger: {
      dir: path.join(appInfo.baseDir, 'logs'),
    },
    security:{
      csrf:{
        enable: false
      }
    }, 
    static:{
      prefix: '/static',   //静态化访问前缀
    dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    buffer: true, // in prod env, false in other envs
    }
    // multipart:{
    //   mode:"file"
    // },
    // baseDir:appInfo.baseDir
    // middleware:['logger'],  // 全局中间件
  }
}