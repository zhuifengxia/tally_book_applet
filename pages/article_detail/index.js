import { FoodModel } from "../../models/food.js";
const foodModel = new FoodModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artDetail: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const artid = options.artid;
    const article = await foodModel.getDetails(artid);
    article.article_msg = article.article_msg.replace(
      /<img/gi,
      '<img style="max-width:100%;height:auto;float:left;display:block" '
    );
    
    this.setData({
      artDetail: article
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if (this._isLocked()) {
      return;
    }
    if (this._hasMore()) {
      this._locked();
      const comments = await articleModel.getComments(
        artid,
        this.data.page + 1
      );
      const tempArray = this.data.comments.concat(comments.data);
      this.setData({
        comments: tempArray,
        loading: false,
        page: this.data.page + 1
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  _hasMore() {
    if (this.data.comments.length >= this.data.total) {
      return false;
    } else {
      return true;
    }
  },
  _isLocked() {
    return this.data.loading ? true : false;
  },
  _locked() {
    this.setData({
      loading: true
    });
  },
  _unLocked() {
    this.setData({
      loading: false
    });
  }
});
