// pages/user/index.js
import { UserModel } from "../../models/user.js";
const userModel = new UserModel();
import {
  promisic
} from '../../util/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    user_info: { income_count: 0.00, create_day: 0, create_count: 0 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    });
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      this.setData({
        isLogin: true,
        user_info: user_info
      });
    }
  },
  async login(options) {
    wx.showLoading({
      title: '登录中',
    });
    const data = await promisic(wx.login)();
    const user_info = await userModel.userLogin(data.code);
    wx.setStorageSync("web_user_info", user_info.user_info);
    wx.hideLoading();
    this.setData({
      isLogin: true,
      user_info: user_info.user_info
    });
  },
  //数据操作
  operType: function (options) {
    let type = options.currentTarget.dataset.type;
    //关于我们
    wx.navigateTo({
      url: "/pages/about_us/index",
    });
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