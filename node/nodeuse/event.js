const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// 监听器被添加到其内部监听器数组之前触发 newListener 事件
myEmitter.on('newListener', (event, listener) => {

});
// 事件移除 触发
myEmitter.on('removeListener', (event, listener) => {
  
});

// 每次都会调用
myEmitter.on('event', () => {
  console.log('触发了一个事件！');
});

myEmitter.emit('event');
// 移除全部或指定
myEmitter.removeAllListeners()
myEmitter.emit('event');

// 只会执行一次
myEmitter.once('onceEvent', () => {
  console.log('触发了一个事件！once');
});

const callback = ()=>{
  console.log("event2-callback")
}
myEmitter.on('event2', callback);
myEmitter.emit('event2');
// 移除单个事件
myEmitter.off('event2', callback);
myEmitter.emit('event2');
