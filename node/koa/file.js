const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const multer = require('koa-multer'); // 文件上传中间件
const path = require('path');
const fs = require('fs');

const app = new Koa();
const router = new Router();

// 解析请求体为json格式
app.use(bodyParser());

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

// 定义文件上传接口
router.post('/upload', upload.single('file'), async (ctx) => {
  const { file } = ctx.req;
  if (!file) {
    ctx.throw(400, '请选择文件');
    return;
  }
  ctx.body = {
    url: `http://localhost:3000/${file.filename}`
  };
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('服务已启动，访问 http://localhost:3000/');
});