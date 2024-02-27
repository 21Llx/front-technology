const express = require("express");
const app = express();

// 获取请求体 body application/json
app.use(express.json())
// 获取请求体 body application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// 每个接口都会执行该方法
app.use((req,res,next)=>{
  // console.log("拦截当前请求")
  next()
})

app.get("/a", (req, res) => {
  console.log(req.query);
  /* res.statusCode = 201
  res.write("xxx")
  res.end() */
  res.cookie("name","qwe")
  res.send("get api");
  // res.status(201).send({
  //   a:111
  // })
});
app.post("/p", (req, res) => {
  console.log(req.body)
  res.send("post api");
});
app.listen(3002, () => {
  console.log("........start");
});
