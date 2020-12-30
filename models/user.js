import { HTTP } from "../util/http-p.js";

class UserModel extends HTTP {

    //用户登录
    userLogin(code) {
        let url = "user/login";
        return this.request({
            url: url,
            method: "post",
            data: {
                code: code
            }
        });
    }

    //微信用户绑定手机号
    bindPhone(userphone, code, smscode, usertype) {
        let city = this._getCityData();
        return this.request({
            url: "user/bind",
            method: "post",
            data: {
                web_city_id: city,
                userphone: userphone,
                code: code,
                smscode: smscode,
                usertype: usertype,
            }
        });
    }

    //更新用户信息
    updateUser(userpwd, userphone) {
        let cityid = this._getCityData();
        let user_info = this._getUserData();
        return this.request({
            url: "member/updateUser",
            method: "POST",
            data: {
                web_city_id: cityid,
                token: user_info.token,
                userpwd: userpwd,
                userphone: userphone
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