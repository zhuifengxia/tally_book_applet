// pages/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    dataList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //查看是否登录，没有就跳转到登录页
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      //加载数据
      const res_data = indexModel.getIndex();
      res_data.then(data => {
        this.setData({
          banners: data.banner,
          data_num: data.data_num,
          news: data.news,
          news_data: data.news_data,
          attract_data: data.attract_data,
          transfer_data: data.transfer_data,
          rent_data: data.rent_data,
          sell_data: data.sell_data,
          hot_phone: data.hot_phone
        });
        wx.hideLoading();
      })
    }
  },
  //招商加盟更多
  attractMore: function () {
    wx.navigateTo({
      url: '/pages/attract/index'
    })
  },
  //商铺查看更多
  shopMore: function (e) {
    let type = e.currentTarget.dataset.type;
    wx.reLaunch({
      url: '/pages/shop/index?type=' + type,
    })
  },
  //成功案例
  caseMore: function (e) {
    wx.navigateTo({
      url: '/pages/success_case/index',
    })
  },
  createShop: function (e) {
    let datatype = e.currentTarget.dataset.type;
    let user_info = wx.getStorageSync('web_user_info');
    if (!user_info) {
      wx.reLaunch({
        url: '/pages/login/index',
      });
    } else {
      wx.navigateTo({
        url: '/pages/create_shop/index?type=' + datatype,
      });
    }
  },

  //城市切换
  changeCity: function (e) {
    wx.navigateTo({
      url: '/pages/city/index',
    })
  },
  //资讯详情（成功案例详情）
  newDetail: function (e) {
    let index = e.detail.index;
    let id = this.data.news_data[index]['id'];
    wx.navigateTo({
      url: `/pages/shop_detail/index?id=${id}&datatype=0`
    })
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