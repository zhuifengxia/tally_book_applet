import { HTTP } from "../util/http-p.js";

class PoetryModel extends HTTP {
  //文章列表
  getList(page,is_learn) {
    let user_info = this._getUserData();
    return this.request({
      url: "tally/poetryList",
      method: "GET",
      data: {
        token: user_info.token,
        page: page,
        is_learn:is_learn
      }
    });
  }
  //获取用户信息
  _getUserData() {
    let user_info = wx.getStorageSync('web_user_info');
    return user_info;
  }

}

export { PoetryModel };
