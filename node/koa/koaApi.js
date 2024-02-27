const Koa = require("koa");
const Router = require("koa-router"); //注意：引入的方式
var cors = require('koa2-cors');
const bodyParser = require("koa-bodyparser");
const error = require("koa-json-error")
const app = new Koa();
const router = new Router(); 
// 设置路由前缀
// const router = new Router({prefix:"/user"}); 
app.use(bodyParser());//post的body处理
app.use(cors()); //跨越
app.use(error())  // 错误处理
router.get("/news/:id",(ctx,next)=>{
  ctx.status = 201
  ctx.body = {
    a:123123
  }
  next()
})
router.post("/api1",(ctx,next)=>{
  ctx.body = {
    code:200,
    message:"执行成功",
    data:{
      a:1,b:2
    }
  }
  next()
})
router.get("/api2",(ctx,next)=>{
  ctx.status=500
  ctx.body = {
    code:500,
    message:"error",
    data:{
      method:"get",
      c:123
    }
  }
  next()
})
app.use(router.routes());

app.listen(3000, () => {
  console.log("starting at port 3000");
});