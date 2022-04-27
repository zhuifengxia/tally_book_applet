// pages/son_record/index.js
import { RecordModel } from "../../models/sonRecord.js";
import * as echarts from '../../ec-canvas/echarts';
const recordModel = new RecordModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        xdata:[],
        heightData:[],
        weightData:[],
        ecLine: {
            lazyLoad: true
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
     async onLoad (options) {
        
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
      lineStyle: { color: "#FFBE00" },
      areaStyle: { color: "#FFBE00" },
      color: "#FFBE00",
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: that.data.xdata
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}cm",
        backgroundColor: "#FFBE00",
        textStyle: {
          color: "white"
        },
      },
      series: [{
        data: that.data.heightData,
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
     async onShow() {
        const record = await recordModel.getList();
        this.setData({
            xdata: record.xdata,
            heightData:record.height_data,
            weightData:record.weight_data,
        });
        this.echartsComponnet = this.selectComponent('#mychart');
        this.init_echarts();
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