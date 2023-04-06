// pages/poetry/index.js
import { PoetryModel } from "../../models/poetry.js";
const poetryModel = new PoetryModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        poetrys: [],
        loading: false,
        page: 1,
        total: null,
        is_learn:-1,
        is_check_type: false,
        sel_type_name:"全部"
    },

    async onLearn(event) {
      const id = event.detail.id;
      const res=await poetryModel.isLearn(id);
      wx.showToast({
        title: "已学习",
        icon: "none",
        duration: 2000
      });
    },
     //弹出分类框
  showType: function (event) {
    let type = event.currentTarget.dataset.type;
    this.setData({
      is_check_type: type ==0 ? false : true
    })
  },
   //更换分类
   async changeType (event) {
    let typeid = event.currentTarget.dataset.id;
    let sel_type_name="全部";
    if(typeid==1){
      sel_type_name="已学习";
    }else if(typeid==0){
      sel_type_name="未学习";
    }
    const poetrys = await poetryModel.getList(1,typeid);
        this.setData({
          poetrys: poetrys.data,
          total: poetrys.total,
          is_check_type: false,
          is_learn:typeid,
          sel_type_name:sel_type_name,
          page:1
        });
  },
    /**
     * 生命周期函数--监听页面加载
     */
     async onLoad (options) {
        const poetrys = await poetryModel.getList(1,-1);
        this.setData({
          poetrys: poetrys.data,
          total: poetrys.total
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
          const poetrys = await poetryModel.getList(
            this.data.page + 1,
            this.data.is_learn
          );
          const tempArray = this.data.poetrys.concat(poetrys.data);
          this.setData({
            poetrys: tempArray,
            loading: false,
            page: this.data.page + 1
          });
        }
      },
      _hasMore() {
        if (this.data.poetrys.length >= this.data.total) {
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