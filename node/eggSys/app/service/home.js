const { Service } = require("egg");

class HomeService extends Service {
  async getId(id) {
    const result = await this.ctx.curl(`http://127.0.0.1:3000/user/${id}`, {
      method: "GET",
      dataType: "json",
    });
    return result;
  }
  async operateSql(params) {
    // 查询
    // let result = await this.app.mysql.get("departments",{department_id:20})
    // let result = await this.app.mysql.select("departments", {
    //   where: { location_id: 1700 },
    //   order: [["department_id", "desc"]],
    //   limit: 5, // 返回数据量
    //   offset: 2, // 数据偏移量
    // });

    // 更新
    // const result = await this.app.mysql.update(
    //   "departments",
    //   { department_name: "qwe" },
    //   { where: { location_id: 1800 } }
    // );

    // 删除
    // const result = await this.app.mysql.delete("departments", {
    //   department_id: 20,
    // });

    // 执行sql语句
    let result = await this.app.mysql.query(
      "SELECT * from departments where department_id = ?",
      10
    );

    console.log(result);
    return result;
  }
}
module.exports = HomeService;
