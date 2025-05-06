import { IndexModel } from "../../models/index.js";

var wxCharts = require("../../util/wxcharts-min.js");
const indexModel = new IndexModel();
var incomeChart=null;
var monthpayChart=null;
var monthbalanceChart=null;
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
    surplus_count:0,//盈余
    income_data: [], //每月收入
    month_pay_data: [], //每月支出
    month_balance_data: [], //每月结余
    is_show_year:false,//是否显示选择年份
    year_list:[],
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
        month_pay_data:data.month_pay_data,
        month_balance_data:data.month_balance_data,
        surplus_count:(data.income_count-data.pay_count).toFixed(2),
        year_list:data.year_list,
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

      monthpayChart = new wxCharts({
        canvasId: 'monthpayCanvas',
        type: 'area',
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        animation: true,
        legend:false,
        series: [{
            name: '支出',
            color:'#8DB8FF',
            data: this.data.month_pay_data,
            format: function (val, name) {
                return val + '元';
            },
        }],
        xAxis: {
            disableGrid: true,
            fontColor: '#8DB8FF',
            gridColor: '#8DB8FF'
        },
        yAxis: {
          fontColor: '#8DB8FF',
          gridColor: '#8DB8FF',
          titleFontColor: '#8DB8FF',
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

    monthbalanceChart = new wxCharts({
        canvasId: 'monthbalanceCanvas',
        type: 'area',
        categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        animation: true,
        legend:false,
        series: [{
            name: '结余',
            color:'#FFBE00',
            data: this.data.month_balance_data,
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
  showYear:function(event){
    let type = event.currentTarget.dataset.type;
    this.setData({
      is_show_year: type == 0 ? false : true
    })
  },
  changeYear: function (event) {
    let year = event.currentTarget.dataset.id;
    this.setData({
        is_show_year: false,
        date:year
    });
    this.loadData();
  },
    //每月收入点击事件
    touchIncomeCanvas:function(e){
      incomeChart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },
    //每月支出点击
    touchMonthPayCanvas:function(e){
        monthpayChart.showToolTip(e, {
          format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data
          }
        });
      },

       //每月结余点击
       touchMonthBalanceCanvas:function(e){
        monthbalanceChart.showToolTip(e, {
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