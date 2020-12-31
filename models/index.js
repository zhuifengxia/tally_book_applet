import { HTTP } from "../util/http-p.js";

class IndexModel extends HTTP {
  //小程序首页数据
  getIndex(typeid) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/index",
      method: "GET",
      data: {
        token: user_info.token,
        typeid: typeid
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
