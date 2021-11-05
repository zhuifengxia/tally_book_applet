import { HTTP } from "../util/http-p.js";

class FoodModel extends HTTP {
  //文章列表
  getList(page) {
    let user_info = this._getUserData();
    return this.request({
      url: "v2/articles",
      method: "GET",
      data: {
        token: user_info.token,
        typeid: 4,
        page: page
      }
    });
  }
  //详情
  getDetails(id) {
    let user_info = this._getUserData();
    return this.request({
      url: `v2/article/detail/${id}`,
      method: "GET",
      data: {
        token: user_info.token
      }
    });
  }
  //获取用户信息
  _getUserData() {
    let user_info = wx.getStorageSync('web_user_info');
    return user_info;
  }

}

export { FoodModel };
