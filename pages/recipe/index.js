// pages/recipe/index.js
import { FoodModel } from "../../models/food.js";
const foodModel = new FoodModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        articles: [],
        loading: false,
        page: 1,
        total: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
     async onLoad (options) {
        const article = await foodModel.getList(1);
        this.setData({
          articles: article.data,
          total: article.total
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
     async onReachBottom() {
        if (this._isLocked()) {
          return;
        }
        if (this._hasMore()) {
          this._locked();
          const article = await foodModel.getList(
            this.data.page + 1
          );
          const tempArray = this.data.articles.concat(article.data);
          this.setData({
            articles: tempArray,
            loading: false,
            page: this.data.page + 1
          });
        }
      },
      artDetail(event) {
        const artid = event.detail.artid;
        // wx.navigateTo
        wx.navigateTo({
          url: `/pages/article_detail/index?artid=${artid}`
        });
      },
      _hasMore() {
        if (this.data.articles.length >= this.data.total) {
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
      },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})