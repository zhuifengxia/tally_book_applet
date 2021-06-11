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
    continuous_count: 0,
    is_check_type: false,
    sel_type: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData("", 0, this.data.sel_type.id);
  },

  //更换月份
  async changeMonth(event) {
    this.loadData(event.detail.date, event.detail.type, this.data.sel_type.id);
  },
  //更换分类
  changeType: function (event) {
    let typeid = event.currentTarget.dataset.id;
    this.loadData(this.data.date.date, 0, typeid);
    this.setData({
      is_check_type: false
    });
  },
  //弹出分类框
  showType: function (event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      is_check_type: type == 0 ? false : true
    })
  },
  //打卡操作
  checkIn: function (event) {
    let date = event.detail.date;
    let day = event.detail.day;
    let ischeck = event.detail.ischeck;
    if (ischeck) {
      wx.showToast({
        title: "已经打卡，无需重复打卡",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    var that = this;
    if (day < 10) {
      day = "0" + day;
    }
    date = date + "-" + day;
    let nowdate = new Date();
    let Y = nowdate.getFullYear();
    var M = (nowdate.getMonth() +
      1 <
      10 ?
      '0' + (nowdate.getMonth() +
        1) : nowdate.getMonth() +
      1);
    var D = nowdate.getDate() <
      10 ?
      '0' + nowdate.getDate() : nowdate.getDate();
    nowdate = Y + "-" + M + "-" + D;
    if (date > nowdate) {
      wx.showToast({
        title: "未来时间不能打卡",
        icon: "none",
        duration: 2000
      });
      return false;
    }
    wx.showModal({
      content: "确定是" + date + that.data.sel_type.type_name + "?",
      success(res) {
        if (res.confirm) {
          indexModel.getCheckIn(date, that.data.sel_type.id);
          wx.showToast({
            title: "打卡成功",
            icon: "none",
            duration: 2000
          });
          that.loadData(that.data.date.date, 0, that.data.sel_type.id);
        } else if (res.cancel) {
          return;
        }
      }
    });

  },
  async loadData(date, type, typeid) {
    const data = await indexModel.getCheckList(date, type, typeid);
    this.setData({
      days: data.days,
      first_week: data.first_week,
      date: data.date,
      check_type: data.type_data,
      check_count: data.check_count,
      continuous_count: data.continuous_count,
      sel_type: data.sel_type
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