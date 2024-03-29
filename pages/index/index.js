// pages/index.js
import { IndexModel } from "../../models/index.js";
const indexModel = new IndexModel();
import { UserModel } from "../../models/user.js";
const userModel = new UserModel();
import {
  promisic, transTime, formatDate
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
      datatype: 0,
      date: "",
      onlydata:0,
      onlydataname:"全部账单",
      showDate: ""
    },
    createType: {
      data: null,
      type: 1
    },
    createData: {
      number: "",
      tagid: 0,
      remark: "",
      date: "",
      showDate: ""
    },
    showCalendar: false,
    showDate: false,
    indexDate: null,
    allMoney: { pay: 0, income: 0,surplus:0 }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查看是否登录，没有就跳转到登录页
    let seltype = this.data.seltype;
    seltype.date = formatDate(2);
    seltype.showDate = formatDate(3);
    this.setData({
      seltype: seltype
    })
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      //加载数据
      this.loadData();
      this.loadType();
      wx.hideLoading();
    }

  },
  //加载数据明细
  async loadData() {
    const data = await indexModel.getIndex(this.data.seltype.typeid, this.data.seltype.date,this.data.seltype.onlydata);
    this.setData({
      dataList: data.details,
      allMoney: { pay: data.pay_count, income: data.income_count,surplus: (data.income_count-data.pay_count).toFixed(2)}
    });
  },
  async loadType() {
    let createData = this.data.createData;
    let data = this.data.typeList;
    if (!data) {
      const data = await indexModel.getType();
      createData.tagid = data.types.pay_type[0]["id"];
      this.setData({
        typeList: data.types,
        createType: { data: data.types.pay_type, type: 1 },
        createData: createData,
        indexDate: data.date_scope
      });
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
      wx.reLaunch({
        url: '/pages/user/index',
      });
    } else {
      let createData = this.data.createData;
      createData.date = formatDate(0);
      createData.showDate = formatDate(1);
      createData.remark = "";
      createData.number = "";
      createData.tagid = 0;
      this.setData({
        createDivShow: true,
        createData: createData,
        createType: { data: this.data.typeList.pay_type, type: 1 },
      });
      this.loadType();
    }
  },

  //类型展示/隐藏
  async showType(e) {
    let type = e.currentTarget.dataset.type;
    let isshow = true;
    let seltype = this.data.seltype;
    if (type >= 0) {
      isshow = false;
      if (seltype.typeid != e.currentTarget.dataset.id) {
        seltype.typeid = e.currentTarget.dataset.id;
        seltype.typename = e.currentTarget.dataset.typename;
        seltype.datatype = type;
        this.setData({
          typeDivShow: isshow,
          seltype: seltype
        });
        //请求数据
        const data = await indexModel.getIndex(seltype.typeid, seltype.date,seltype.onlydata);
        this.setData({
          dataList: data.details,
          allMoney: { pay: data.pay_count, income: data.income_count ,surplus: (data.income_count-data.pay_count).toFixed(2)}
        });
      }

    } else {
      this.loadType();
    }
    this.setData({
      typeDivShow: isshow,
      seltype: seltype
    });
  },
  hideKeybord: function (e) {
    wx.hideKeyboard();
  },
  //创建记账隐藏
  showCreate: function (e) {
    this.setData({
      createDivShow: false
    });

  },
  //收入/支出选择
  tagChange: function (e) {
    let type = e.currentTarget.dataset.type;
    let typedata = this.data.typeList.income_type;
    let createData = this.data.createData;
    createData.tagid = this.data.typeList.income_type[0]["id"];
    if (type == 1) {
      typedata = this.data.typeList.pay_type;
      createData.tagid = this.data.typeList.pay_type[0]["id"];
    }else if(type==2){
      typedata = this.data.typeList.child_pay_type;
      createData.tagid = this.data.typeList.child_pay_type[0]["id"];
    }
    this.setData({
      createType: { data: typedata, type: type },
      createData: createData
    });
  },
  //收入/支出类型数据
  tagitemChange: function (e) {
    let tagid = e.currentTarget.dataset.tagid;
    let createData = this.data.createData;
    createData.tagid = tagid;
    this.setData({
      createData: createData
    })


  },
  //录入数字
  numberChange: function (e) {
    let number = e.currentTarget.dataset.number;
    let createData = this.data.createData;
    let datanumber = createData.number;
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
    createData.number = newstr;
    this.setData({
      createData: createData
    })
  },
  //删除
  deleteData: function (event) {
    let id = event.detail.id;
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
          that.loadData();
        } else if (res.cancel) {
          return;
        }
      }
    });
  },
  //首页月份选择后触发
  indexselDate: function (e) {
    let key = e.currentTarget.dataset.key;
    let msg = e.currentTarget.dataset.msg;
    let seltype = this.data.seltype;
    seltype.date = key;
    seltype.showDate = msg;
    this.setData({
      seltype: seltype,
      showDate: false
    });
    this.loadData();
  },
  showDate: function (e) {
    let type = e.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        showCalendar: true
      });
    } else if (type == 0) {
      this.loadType();
      this.setData({
        showDate: true
      });
    } else if (type == 2) {
      this.setData({
        showDate: false
      });
    }

  },
  //选择日期
  selDate: function (event) {
    let createData = this.data.createData;
    createData.date = transTime(event.detail, 0);
    createData.showDate = transTime(event.detail, 1);
    this.setData({
      createData: createData
    })
  },
  remarkData: function (e) {
    let createData = this.data.createData;
    createData.remark = e.detail.value;
    this.setData({
      createData: createData
    })
  },
  //保存提交
  async submitData(e) {
    let createData = this.data.createData;
    let number = createData.number;
    if (number == "") {
      wx.showToast({
        title: "请输入金额",
        icon: "none",
        duration: 2000
      });
    } else {
      await indexModel.createData(number, createData.tagid, createData.remark, createData.date);
      wx.showToast({
        title: "已记一笔",
        icon: "none",
        duration: 2000
      });
      this.setData({
        createDivShow: false
      });
      this.loadData();
    }
  },
  //查看详情
  showDetail: function (event) {
    let id = event.detail.id;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + id
    })
  },
  showActionSheet(){
    wx.lin.showActionSheet({
      itemList:[{
        name: '全部账单'
      },
      {
        name: '我的账单'
      }]
    })
  },
  lintapItem(e){
    let onlydata=e.detail.index;
    let onlytype=e.detail.item.name;
    let seltype = this.data.seltype;
    seltype.onlydata = onlydata;
    seltype.onlydataname = onlytype;
    this.setData({
      seltype: seltype
    });
    this.loadData();
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
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      //加载数据
      this.loadData();
      this.loadType();
      wx.hideLoading();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      createDivShow: false,
      typeDivShow: false,
      showCalendar: false,
      showDate: false
    });
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
    let user_info = wx.getStorageSync('web_user_info');
    if (user_info) {
      wx.showLoading({
        title: '加载中',
      });
      //加载数据
      this.loadData();
      this.loadType();
      wx.hideLoading();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})