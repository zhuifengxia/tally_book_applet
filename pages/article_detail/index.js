import { FoodModel } from "../../models/food.js";
const foodModel = new FoodModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artDetail: null,
    previewImage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const artid = options.artid;
    const article = await foodModel.getDetails(artid);
    article.article_msg = article.article_msg.replace(
      /<img/gi,
      '<img style="max-width:100%;height:150px;display:block" '
    );
    var that=this;
    // 将富文本赋值线imageNode。       
    var imageNode = article.article_msg;
      // 是否存在图片文件资源判断。      
    if (imageNode.indexOf("src") >= 0) {  
        // 定义一个空数组。         
        var previewImage = [];        
          // 将imageNode进t地替换，并使用push()添加一个或多个元素，并返回新的长度。    
        imageNode = imageNode.replace(/]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) { 
            previewImage.push(capture);            
            that.setData({ 
              previewImage: previewImage            
            });
        });        
    }

    
    this.setData({
      artDetail: article
    });
  },
    //预览图片，放大预览  
  previewImage(e) {
      // 定义src为一个空数组
      var src = []; 
      // 将previewImage中的图片资源数据进行遍历。 
      for (var i = 0; i < this.data.previewImage.length; i++) {
        src[i] = this.data.previewImage[i];    
      }  
      // 直接调e和用wx.previewImage    
      wx.previewImage({
          current: src[0],
          // 第一张图片。     
          urls: src    
      })  
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
