import { IndexModel } from "../../models/index.js";
import * as echarts from '../../ec-canvas/echarts';
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2021",
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
        income_data: data.income_data
      })
      this.echartsComponnet = this.selectComponent('#mychart');
      this.init_echarts()

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData();
  },
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },

  // 获取数据
  getOption: function () {
    var that = this
    // 前台配置折线线条表示属性
    var option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : ¥{c}元"
      },
      series: [{
        data: that.data.income_data,
        type: 'line',
        areaStyle: {}
      }]
    };
    return option
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