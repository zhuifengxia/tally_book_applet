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
    surplus_count:"0.00",
    user_incom_count: "0.00",
    user_pay_count: "0.00",
    show_data: null,
    pay_data: null,
    income_data: null,
    top_data: null,
    seltype: {
      date: "",
      showDate: "",
      showMonth: ""
    },
    indexDate: null,
    showDate: false,
    is_show_yearbill: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let seltype = this.data.seltype;
    seltype.date = formatDate(2);
    seltype.showDate = formatDate(3);
    let date = formatDate(3);
    let month = date.slice(5, date.length - 1);
    if (month < 10) {
      month = month.slice(1, month.length);
    }
    month = month + "月";
    seltype.showMonth = month;
    this.setData({
      seltype: seltype
    })
    //加载数据
    this.loadData();
  },
  indexselDate: function (e) {
    let key = e.currentTarget.dataset.key;
    let msg = e.currentTarget.dataset.msg;
    let seltype = this.data.seltype;
    seltype.date = key;
    seltype.showDate = msg;
    seltype.showMonth = e.currentTarget.dataset.value;
    this.setData({
      seltype: seltype,
      showDate: false
    });
    this.loadData();
  },
  showDate: function (e) {
    let type = e.currentTarget.dataset.type;
    let isshow = false;
    if (type == 0) {
      isshow = true;
    }
    this.setData({
      showDate: isshow
    });
  },
  tagChange: function (e) {
    let type = e.currentTarget.dataset.type;
    let show_data = type == 1 ? this.data.pay_data : this.data.income_data;
    this.setData({
      moneyType: type,
      show_data: show_data
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
        surplus_count:(data.incom_count-data.pay_count).toFixed(2),
        user_pay_count:data.user_pay_count,
        user_incom_count:data.user_incom_count,
        pay_data: data.pay_data,
        income_data: data.income_data,
        top_data: data.top_pay,
        indexDate: data.date_scope,
        show_data: data.pay_data,
        is_show_yearbill: data.is_show_yearbill
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
  //统计分类跳转
  typeList: function (event) {
    let typeid = event.currentTarget.dataset.typeid;
    let date = this.data.seltype.date;
    let moneyType = this.data.moneyType;
    wx.navigateTo({
      url: "/pages/type_list/index?typeid=" + typeid + "&date=" + date + "&moneyType=" + moneyType,
    });
  },
  //跳转到年度账单
  showYearbill: function (event) {
    wx.navigateTo({
      url: "/pages/year_bill/index",
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
    this.setData({
      moneyType: 1
    })
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      showDate: false
    });
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