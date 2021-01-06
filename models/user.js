import { HTTP } from "../util/http-p.js";

class UserModel extends HTTP {

    //用户登录
    userLogin(code) {
        let url = "tally/login";
        return this.request({
            url: url,
            method: "post",
            data: {
                code: code
            }
        });
    }

    //用户登录
    userData() {
        let user_info = this._getUserData();
        let url = "tally/user";
        return this.request({
            url: url,
            method: "post",
            data: {
                token: user_info.token,
            }
        });
    }



    //获取用户信息
    _getUserData() {
        let user_info = wx.getStorageSync('web_user_info');
        return user_info;
    }
}

export { UserModel };