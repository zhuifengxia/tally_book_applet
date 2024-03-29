import { IndexModel } from "../../models/index.js";

var wxCharts = require("../../util/wxcharts-min.js");
const indexModel = new IndexModel();
var incomeChart=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    pay_num: 0, //支出笔数
    pay_count: 0, //总支出金额
    pay_data: [], //每个类型支出明细
    income_num: 0, //总收入笔数
    income_count: 0, //总收入金额
    income_data: [], //每月收入
    ecLine: {
      lazyLoad: true
    }
  },
  async loadData() {
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      const data = await indexModel.getYearBill(this.data.date);
      this.setData({
        pay_num: data.pay_num,
        pay_data: data.pay_data,
        pay_count: data.pay_count,
        income_num: data.income_num,
        income_count: data.income_count,
        income_data: data.income_data,
        date: data.year
      })

      var windowWidth = 380;
      try {
          var res = wx.getSystemInfoSync();
          windowWidth = res.windowWidth;
      } catch (e) {
          console.error('getSystemInfoSync failed!');
      }
      incomeChart = new wxCharts({
          canvasId: 'incomeCanvas',
          type: 'area',
          categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          animation: true,
          legend:false,
          series: [{
              name: '收入',
              color:'#FFBE00',
              data: this.data.income_data,
              format: function (val, name) {
                  return val + '元';
              },
          }],
          xAxis: {
              disableGrid: true,
              fontColor: '#FFBE00',
              gridColor: '#FFBE00'
          },
          yAxis: {
            fontColor: '#FFBE00',
            gridColor: '#FFBE00',
            titleFontColor: '#FFBE00',
              format: function (val) {
                  return val;
              },
          },
          width: windowWidth,
          height: 200,
          dataLabel: false,
          dataPointShape: true,
          extra: {
            lineStyle: 'curve',
          }
      });











      wx.hideLoading();
    } else {
      wx.showToast({
        title: "您需要先授权登录",
        icon: "none",
        duration: 2000
      });
    }
  },
    //每月收入点击事件
    touchIncomeCanvas:function(e){
      incomeChart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
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