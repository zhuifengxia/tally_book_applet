// pages/type_list/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtype: 0,
    title_data: "",
    sum_data: 0.00,
    detail_data: null,
    moneyType: 1,
    typeid: 0,
    date: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中',
    });
    const data = await indexModel.getTypeData(options.typeid, options.date, options.moneyType, this.data.showtype);
    this.setData({
      title_data: data.title_data,
      sum_data: data.sum_data,
      detail_data: data.detail_data,
      moneyType: options.moneyType,
      date: options.date,
      typeid: options.typeid
    });
    wx.hideLoading();
  },
  async tagChange(event) {
    wx.showLoading({
      title: '加载中',
    });
    let showtype = event.currentTarget.dataset.type;
    const data = await indexModel.getTypeData(this.data.typeid, this.data.date, this.data.moneyType, showtype);
    this.setData({
      title_data: data.title_data,
      sum_data: data.sum_data,
      detail_data: data.detail_data,
      showtype: showtype
    });
    wx.hideLoading();
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