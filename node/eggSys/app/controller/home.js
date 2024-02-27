const Controller = require("egg").Controller;
const path = require("path");

const fs = require("fs");
class HomeController extends Controller {
  async getList(ctx) {
    const userInfo = await this.ctx.service.home.getId("12384234");
    
    this.ctx.body = {
      data: userInfo,
    };
  }
  async uploadFile(ctx) {
    // 文件的形式
    // let file = ctx.request.files[0]
    // const fileDir = path.join(this.config.baseDir+"/files",path.basename(file.filename))
    // let f = fs.readFileSync(file.filepath)
    // fs.writeFileSync(fileDir, f)

    // 流形式
    const stream = await ctx.getFileStream();
    const fileDir = path.join(
      this.config.baseDir + "/app/public",
      path.basename(stream.filename)
    );
    const out = fs.createWriteStream(fileDir);
    stream.on("data", (data) => {
      console.log("data");
      out.write(data);
    });
    out.on("open", () => {
      console.log("open");
    });
    stream.on("end", () => {
      console.log("end");
      out.end("再见", function () {
        console.log("文件全部写入完毕");
        console.log("共写入" + out.bytesWritten + "数据");
      });
    });
    // stream.pipe(out)
    this.ctx.body = {
      data: "post",
    };
  }
  async sqlApi(cxt){
    let result = await cxt.service.home.operateSql()

    this.ctx.body = {
      data: result
    }
  }
  async testGet(cxt){
    this.ctx.body = {
      name:"get"
    }
  }
  async testPost(cxt){
    this.ctx.body = {
      name:"post"
    }
  }
}

module.exports = HomeController;
