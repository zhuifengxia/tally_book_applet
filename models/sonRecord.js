import { HTTP } from "../util/http-p.js";

class RecordModel extends HTTP {
  //最新十条数据
  getList() {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/recordList",
      method: "GET",
      data: {
        token: user_info.token
      }
    });
  }
  recordSave(height, weight, date) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/create",
      method: "POST",
      data: {
        token: user_info.token,
        height: height,
        weight: weight,
        date: date
      }
    });
  }

  //获取用户信息
  _getUserData() {
    let user_info = wx.getStorageSync('web_user_info');
    return user_info;
  }

}

export { RecordModel };
