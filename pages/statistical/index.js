// pages/statistical/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
import {
  formatDate
} from '../../util/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyType: 1,
    incom_count: "0.00",
    pay_count: "0.00",
    pay_data: null,
    income_data: null,
    top_data: null,
    seltype: {
      date: "",
      showDate: ""
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let seltype = this.data.seltype;
    seltype.date = formatDate(2);
    seltype.showDate = formatDate(3);
    this.setData({
      seltype: seltype
    })
    //加载数据
    this.loadData();

  },
  tagChange: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      moneyType: type
    });
  },
  async loadData() {
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      const data = await indexModel.getStatistic(this.data.seltype.date);
      this.setData({
        dataList: data,
        incom_count: data.incom_count,
        pay_count: data.pay_count,
        pay_data: data.pay_data,
        income_data: data.income_data,
        top_data: data.top_pay
      })
      wx.hideLoading();
    } else {
      wx.showToast({
        title: "您需要先授权登录",
        icon: "none",
        duration: 2000
      });
    }
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
    this.loadData();
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