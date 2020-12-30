// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    user_info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '用户中心'
    });
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      this.setData({
        isLogin: true,
        user_info: user_info
      });
    }
  },
  login: function (options) {
    wx.reLaunch({
      url: '/pages/login/index',
    })
  },
  //数据操作
  operType: function (options) {
    let type = options.currentTarget.dataset.type;
    if (type != 6) {
      //查看是否登录，没有就跳转到登录页
      let user_info = wx.getStorageSync('web_user_info');
      if (!user_info) {
        wx.reLaunch({
          url: '/pages/login/index',
        });
      } else {
        let url = "";
        if (type == 0) {
          //会员中心
          url = "/pages/vip_center/index";
        } else if (type == 1) {
          //我的发布
          url = "/pages/my_pulish/index";
        } else if (type == 2) {
          //我的收藏
          url = "/pages/my_collect/index";
        } else if (type == 3) {
          //我的浏览
          url = "/pages/my_browse/index";
        } else if (type == 4) {
          //我的订单
          url = "/pages/my_order/index";
        } else if (type == 5) {
          //账户设置
          url = "/pages/user_setting/index";
        }
        wx.navigateTo({
          url: url,
        });
      }
    } else {
      //关于我们
      wx.navigateTo({
        url: "/pages/about_us/index",
      });
    }
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