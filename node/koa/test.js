const Koa = require("koa");
const Router = require("koa-router"); //注意：引入的方式
const bodyParser = require("koa-bodyparser");
// const koaBody = require("koa-body")
const session = require("koa-session");
const multer = require('koa-multer');
var cors = require('koa2-cors');
const path = require('path');

const app = new Koa();
const router = new Router(); 

app.use(bodyParser());//post的body处理
// app.use(koaBody()) // koa-body可以解析各种post请求参数 
app.use(cors()); //跨越

// app.use(async (ctx, next) => {
//   ctx.cookies.set("cook", "cookie");
//   ctx.cookies.get("cook");
//   next();
//   //  ctx.cookies.set(name, value, [options])
//   //   options 名称 options 值
//   //   maxAge              一个数字表示从 Date.now() 得到的毫秒数
//   //   expires cookie      过期的 Date
//   //   path cookie         路径, 默认是'/'
//   //   domain cookie       域名
//   //   secure             安全 cookie   默认false，设置成true表示只有 https可以访问
//   //   httpOnly           是否只是服务器可访问 cookie, 默认是 true
//   //   overwrite          一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
// });
const CONFIG = {
  key: "koa:sess", //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// 设置值 ctx.session.username = "张三";
// 获取值 ctx.session.username

// 配置文件上传中间件
const storage = multer.diskStorage({
  // 上传文件保存的目录
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  // 上传文件重命名
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${Date.now()}${extname}`);
  }
});
const upload = multer({ storage });

router.use(async (ctx,next)=>{
  //全局变量
  ctx.state.glob={
      url:'http://www.itying.com',
      userinfo:ctx.session.userinfo,
      prevPage:ctx.request.headers['referer']   /*上一页的地址*/
  }
 next()
})
router.get("/", function (ctx, next) {
  ctx.body = { id: 23 };
  next();
});
// app.use(async (ctx,next)=>{
//   console.log('1、这是第一个中间件01');
//   await next();
//   console.log('5、匹配路由完成以后又会返回来执行中间件');
// })
router.get("/", function (ctx, next) {
  ctx.body = "koa2";
});

router.get("/news/:id", (ctx, next) => {
  let url = ctx.url;
  //从request中获取GET请求
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;
  //从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
  };
});
router.post("/post", (ctx, next) => {
  ctx.body = {
    key: "post",
  };
});

// 定义文件上传接口
router.post('/upload', upload.single('file'), async (ctx) => {
  const { file } = ctx.req;
  console.log(file)
  if (!file) {
    ctx.throw(400, '请选择文件');
    return;
  }
  ctx.body = {
    url: `http://localhost:3000/${file.filename}`
  };
});
app.use(router.routes());
app.use(router.allowedMethods()); //
// app.use(async (ctx, next) => {
//   console.log(123)

//   next();
//   // console.log(ctx)
//   if (ctx.status == 404) {
//     ctx.status = 404;
//     ctx.body = "这是一个404页面";
//   }
// });
app.listen(3000, () => {
  console.log("starting at port 3000");
});
