const {Subscription} = require("egg")

class UpdateInfo extends Subscription{
  static get schedule(){
    return {
      interval:"2000m",
      type: "all"
    }
  }
  async subscribe(){
    let result = await this.ctx.curl("http://127.0.0.1:3000/getNum",{
      dataType: "json"
    })
    console.log(result.data)
    this.ctx.app.cache = result.data
  }
}

module.exports = UpdateInfo