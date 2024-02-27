// const Koa = require('koa')
// const app = new Koa()
// const path = require('path')
// const ws = require('ws')
// let server = app.listen(4000, () => {
//   let port = server.address().port
//   console.log(' http://localhost:' + port)
// })
// console.log(server)
// const wss = new ws.Server({ server })
// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message)
//     ws.send("this is socket")
//   })
// })

const WebSocket = require('ws');
const wss = new WebSocket.Server({port:3001})
let param=""
wss.on('connection',function(ws,req){
  param=ws
  ws.on('message',function(msg){
      console.log(msg);
  })
 
})
function getMessage(data) {         
  param.send(JSON.stringify(data))
}
module.exports={getMessage}
