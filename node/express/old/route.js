const express = require("express")

const router = express.Router()

router.get("/foo",(req,res)=>{
  console.log("get foo")
  res.send("get foo")
})
module.exports = router