// pages/detail/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: null,
    createDivShow: false,
    typeList: null,
    showCalendar: false,
    typedata: null,
    editData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let id = options.id;
    const data = await indexModel.getDetails(id);
    let showdate = data.record_date;
    showdate = showdate.slice(5, showdate.length);
    showdate = showdate.replace('-', '月');
    showdate = showdate + "日";
    data.showDate = showdate;
    this.setData({
      detailData: data,
      editData: data
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
  //编辑记账隐藏
  showCreate: function (e) {
    this.setData({
      createDivShow: false
    });

  },
  hideKeybord: function (e) {
    wx.hideKeyboard();
  },
  //编辑
  editData: function () {
    this.setData({
      createDivShow: true
    });
    this.loadType();
  },

  showDate: function (e) {
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        showCalendar: true
      });
    }
  },
  //收入/支出选择
  tagChange: function (e) {
    let type = e.currentTarget.dataset.type;
    let typedata = this.data.typeList.income_type;
    let editData = this.data.editData;
    editData.type_id = this.data.typeList.income_type[0]["id"];
    editData.money_type = type;
    if (type == 1) {
      typedata = this.data.typeList.pay_type;
      editData.type_id = this.data.typeList.pay_type[0]["id"];
    }
    this.setData({
      editData: editData,
      typedata: typedata
    });
  },
  //收入/支出类型数据
  tagitemChange: function (e) {
    let tagid = e.currentTarget.dataset.tagid;
    let editData = this.data.editData;
    editData.type_id = tagid;
    this.setData({
      editData: editData
    })
  },
  //录入数字
  numberChange: function (e) {
    let number = e.currentTarget.dataset.number;
    let editData = this.data.editData;
    let datanumber = editData.money_num;
    let newstr = "";
    if (number == -1) {
      //删除最后一个数字
      if (datanumber.length <= 1) {
        newstr = "";
      } else {
        newstr = datanumber.slice(0, datanumber.length - 1);
      }
    } else if (number == ".") {
      if (datanumber.length == 0) {
        newstr = "0.";
      } else {
        newstr = datanumber + ".";
      }
    } else {
      newstr = datanumber + number;
    }
    editData.money_num = newstr;
    this.setData({
      editData: editData
    })
  },
  //备注信息
  remarkData: function (e) {
    let editData = this.data.editData;
    editData.data_remark = e.detail.value;
    this.setData({
      editData: editData
    })
  },
  async loadType() {
    let types = this.data.types;
    let type = this.data.editData.money_type;
    if (!types) {
      const data = await indexModel.getType();
      this.setData({
        typeList: data.types,
        typedata: type == 1 ? data.types.pay_type : data.types.income_type,
      });
    }
  },
  //保存提交
  async submitData(e) {
    let editData = this.data.editData;
    let number = editData.money_num;
    if (number == "") {
      wx.showToast({
        title: "请输入金额",
        icon: "none",
        duration: 2000
      });
    } else {
      // await indexModel.createData(number, editData.type_id, editData.data_remark, editData.record_date, editData.id);
      wx.showToast({
        title: "修改成功",
        icon: "none",
        duration: 2000
      });
      this.setData({
        createDivShow: false
      });
      this.loadData(editData.id);
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