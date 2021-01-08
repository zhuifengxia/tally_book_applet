import { HTTP } from "../util/http-p.js";

class IndexModel extends HTTP {
  //小程序首页数据
  getIndex(typeid, date) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/index",
      method: "GET",
      data: {
        token: user_info.token,
        typeid: typeid,
        date: date
      }
    });
  }
  getType() {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/type",
      method: "GET",
      data: {
        token: user_info.token
      }
    });
  }
  deleteTally(id) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/delete",
      method: "POST",
      data: {
        token: user_info.token,
        id: id
      }
    });
  }

  createData(number, tagid, remark, date, id = 0) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/create",
      method: "POST",
      data: {
        token: user_info.token,
        typeid: tagid,
        number: number,
        remark: remark,
        date: date,
        id: id
      }
    });
  }

  getStatistic(date) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/statistic",
      method: "POST",
      data: {
        token: user_info.token,
        date: date
      }
    });
  }
  getDetails(id) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/detail",
      method: "POST",
      data: {
        token: user_info.token,
        id: id
      }
    });
  }

  //获取用户信息
  _getUserData() {
    let user_info = wx.getStorageSync('web_user_info');
    return user_info;
  }

}

export { IndexModel };
