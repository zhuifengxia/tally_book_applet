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



    //获取用户信息
    _getUserData() {
        let user_info = wx.getStorageSync('web_user_info');
        return user_info;
    }
}

export { UserModel };