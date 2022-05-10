// pages/son_record/index.js
import { RecordModel } from "../../models/sonRecord.js";

var wxCharts = require("../../util/wxcharts-min.js");
const recordModel = new RecordModel();
var heightChart=null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        xdata:[],
        heightData:[],
        weightData:[],
        createDivShow:false,
        createData: {
            height: "",
            weight: "",
            date: "",
        },

    },

    getHeightData: function (e) {
      let createData = this.data.createData;
      createData.height = e.detail.value;
      this.setData({
        createData: createData
      })
    },
    getWeightData: function (e) {
      let createData = this.data.createData;
      createData.weight = e.detail.value;
      this.setData({
        createData: createData
      })
    },
       //保存提交
 async submitData(e) {
  let createData = this.data.createData;
  let height = createData.height;
  let weight = createData.weight;
  if (height == ""||weight=="") {
    wx.showToast({
      title: "请输入身高和体重",
      icon: "none",
      duration: 2000
    });
  } else {
    await recordModel.recordSave(height, weight,createData.date);
    wx.showToast({
      title: "记录成功",
      icon: "none",
      duration: 2000
    });
    this.loadData();
  }
},
    /**
     * 生命周期函数--监听页面加载
     */
     async onLoad (options) {
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
     
    },
    


  async loadData (e){
    const record = await recordModel.getList();
    this.setData({
        xdata: record.xdata,
        heightData:record.height_data,
        weightData:record.weight_data,
    });
    var windowWidth = 320;
    try {
        var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (e) {
        console.error('getSystemInfoSync failed!');
    }
     heightChart = new wxCharts({
        canvasId: 'heightCanvas',
        type: 'line',
        categories: this.data.xdata,
        animation: true,
        series: [{
            name: '身高',
            data: this.data.heightData,
            format: function (val, name) {
                return val + 'cm';
            }
        },{
            name: '体重',
            data: this.data.weightData,
            format: function (val, name) {
                return val + 'kg';
            }
        }
        ],
        xAxis: {
            disableGrid: true
        },
        yAxis: {
            format: function (val) {
                return val;
            },
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        extra: {
            lineStyle: 'Broken'
        }
    });
  },
    /**
     * 生命周期函数--监听页面显示
     */
  async onShow() {
    this.setData({
      createDivShow: false
    });
      this.loadData();
   },
  //身高点击事件
  touchHeightCanvas:function(e){
    heightChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  //创建记录
  createRecord:function(){
    this.setData({
      createDivShow: true
    });
  },

  hideCreate:function(){
    this.setData({
      createDivShow: false
    });
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