// pages/login/index.js
import { UserModel } from "../../models/user.js";
import {
  promisic
} from '../../util/common.js'
const userModel = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: null,
  },

  //传值
  bindphoneNumber(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  async loginSubmit(e) {
    wx.showLoading({
      title: '登录中',
    });
    let logintype = e.currentTarget.dataset.type;
    logintype = logintype ? 1 : 0;
    let user_name = "";
    let user_pwd = "";
    if (logintype) {
      user_name = this.data.phoneNumber;
    } else {
      user_name = e.detail.value.user_name;
      user_pwd = e.detail.value.user_pwd;
    }

    const data = await promisic(wx.login)();
    const user_info = await userModel.userLogin(logintype, user_name, user_pwd, data.code);
    wx.setStorageSync("web_user_info", user_info.user_info);
    wx.hideLoading();
    if (user_info.user_info.user_phone) {
      wx.reLaunch({
        url: '/pages/user/index',
      });
    } else {
      //没有手机号，跳转到绑定手机号页面
      wx.navigateTo({
        url: '/pages/bind_phone/index',
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})