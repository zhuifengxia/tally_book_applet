import { config } from "../config.js";

const tips = {
  1: "抱歉出现了一个错误"
};
class HTTP {
  request({ url, data = {}, method = "GET", header = { "content-type": "application/json" } }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, header);
    });
  }
  _request(url, resolve, reject, data = {}, method = "GET", header = { "content-type": "application/json" }) {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: header,
      success: res => {
        const statusCode = res.statusCode.toString();
        const status = res.data.statusCode;
        if (statusCode.startsWith("2")) {
          if (status == 1000) {
            resolve(res.data.data);
          } else {
            reject();
            const error_msg = res.data.msg;
            this._show_error(status, error_msg);
          }

        } else {
          reject();
          this._show_error(1);
        }
      },
      fail: err => {
        reject();
        this._show_error(1);
      }
    });
  }


  request2({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      this._request2(url, resolve, reject, data, method);
    });
  }
  _request2(url, resolve, reject, data = {}, method = "GET") {
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/json",
      },
      success: res => {
        const statusCode = res.statusCode.toString();
        const status = res.data.statusCode;
        if (statusCode.startsWith("2")) {
          resolve(res.data);
        } else {
          reject();
          this._show_error(1);
        }
      },
      fail: err => {
        reject();
        this._show_error(1);
      }
    });
  }

  _show_error(error_code, error_msg) {
    if (!error_code) {
      error_code = 1;
    }
    wx.showToast({
      title: error_msg ? error_msg : tips[1],
      icon: "none",
      duration: 2000
    });
  }
}

export { HTTP };
