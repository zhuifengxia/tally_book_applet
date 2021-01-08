// pages/detail/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id;
    const data = await indexModel.getDetails(id);
    this.setData({
      detailData: data
    })
  },
  //删除
  deleteData: function () {
    let id = this.data.detailData.id;
    var that = this;
    wx.showModal({
      content: "删除后无法恢复，是否删除？",
      success(res) {
        if (res.confirm) {
          indexModel.deleteTally(id);
          wx.showToast({
            title: "删除成功",
            icon: "none",
            duration: 2000
          });
          wx.reLaunch({
            url: '/pages/index/index',
          });
        } else if (res.cancel) {
          return;
        }
      }
    });
  },
  //编辑
  editData: function () {

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