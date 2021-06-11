// pages/clock_in/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [],
    first_week: 0,
    date: {},
    check_type: [],
    check_count: 0,
    continuous_count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const data = await indexModel.getCheckList("", 0, 1);
    this.setData({
      days: data.days,
      first_week: data.first_week,
      date: data.date,
      check_count: data.check_count,
      continuous_count: data.continuous_count
    });
  },

  async changeMonth(event) {
    const data = await indexModel.getCheckList(event.detail.date, event.detail.type, 1);
    this.setData({
      days: data.days,
      first_week: data.first_week,
      date: data.date,
      check_type: data.type_data,
      check_count: data.check_count,
      continuous_count: data.continuous_count
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