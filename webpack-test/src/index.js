import "@/style/index.css"
import "./style/index"
import p2 from "./assest/p2.png"
import main from "./main"
let btn = document.createElement("button");
let img = document.createElement("img");
let img2 = document.createElement("img");
// img.src = "./assest/p2.png";
img2.src = p2;
document.body.appendChild(btn);
document.body.appendChild(img2);
// 异步加载代码
async function getAsyncComponent() {
  var element = document.createElement('div');
  const { sum } = await import("./util");

  element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

  return element;
}
btn.addEventListener('click', () => {
  getAsyncComponent().then(component => {
      document.body.appendChild(component);
  })
})