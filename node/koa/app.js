const Koa = require("koa");
const Router = require("koa-router"); //注意：引入的方式
const bodyParser = require("koa-bodyparser");
const {getMessage}=require("./ws")
const app = new Koa();
const router = new Router(); 
app.use(bodyParser());//post的body处理
app.use(cors()); //跨越

router.post('/create/url',async (ctx)=>{
  getMessage(ctx.request.body)
 ctx.body="成功"
})


