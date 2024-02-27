const express = require("express")
const router = require("./route")
const app = express()
// 获取请求体 body application/json
app.use(express.json())
// 获取请求体 body application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
// 每个接口都会执行该方法
app.use((req,res,next)=>{
  // console.log("拦截当前请求")
  next()
})

app.get("/",(req,res)=>{
  res.send("get request")
})
app.post("/post",(req,res)=>{
  res.send("post request")
})
app.use('/router',router)

app.post('/errorrRouter',(req,res,next)=>{
  try{
    res.send(200)
  }catch(err){
    // console.log(err)
    next(err)
  }
})
// 在所有路由之后处理404
app.use((req,res,next)=>{
  res.status(404).send("404 Not Found")
})
// 错误处理
app.use((err,req,res,next)=>{
  res.status(500).json({
    errMsg:err
  })
})

app.listen(3000,()=>{
  console.log("listen")
})