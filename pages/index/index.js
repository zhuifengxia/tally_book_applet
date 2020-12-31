// pages/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
import { UserModel } from "../../models/user.js";
const userModel = new UserModel();
import {
  promisic
} from '../../util/common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: false,
    dataList: null,
    typeDivShow: false,
    createDivShow: false,
    typeList: null,
    seltype: {
      typeid: 0,
      typename: "全部类型",
      datatype: 0
    },
    createType: {
      data: null,
      type: 1
    }
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
      const res_data = indexModel.getIndex(0);
      res_data.then(data => {
        this.setData({
          typeList: data.types,
          createType: { data: data.types.pay_type, type: 1 }
        });
        wx.hideLoading();
      })
    }
  },
  async createTally(e) {
    let user_info = wx.getStorageSync('web_user_info');
    if (!user_info) {
      wx.showToast({
        title: "您需要先授权登录",
        icon: "none",
        duration: 2000
      });
      const data = await promisic(wx.login)();
      const user_info = await userModel.userLogin(data.code);
      wx.setStorageSync("web_user_info", user_info.user_info);
    } else {
      this.setData({
        createDivShow: true
      });
    }
  },

  //类型展示/隐藏
  showType: function (e) {
    let type = e.currentTarget.dataset.type;
    let isshow = true;
    let seltype = this.data.seltype;
    if (type > 0) {
      isshow = false;
      seltype.typeid = e.currentTarget.dataset.id;
      seltype.typename = e.currentTarget.dataset.typename;
      seltype.datatype = type;
      //请求数据
      const res_data = indexModel.getIndex(seltype.typeid);
    }
    this.setData({
      typeDivShow: isshow,
      seltype: seltype
    });
  },
  hideKeybord: function (e) {
    wx.hideKeyboard();
  },
  //创建记账显示/隐藏
  showCreate: function (e) {
    this.setData({
      createDivShow: false
    });
  },
  tagChange: function (e) {
    let type = e.currentTarget.dataset.type;
    let typedata = this.data.typeList.income_type;
    if (type == 1) {
      typedata = this.data.typeList.pay_type;
    }
    this.setData({
      createType: { data: typedata, type: type }
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