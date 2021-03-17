// pages/clock_in/index.js
import todo from "../../components/calendar/plugins/todo";
import plugin from '../../components/calendar/plugins/index'

plugin
  .use(todo)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendarConfig: {
      weekMode: true, // 周视图模式
      theme: 'default', // 日历主题，目前共两款可选择，默认 default 及 elegant，自定义主题色在参考 /theme 文件夹
      inverse: true, // 单选模式下是否支持取消选中,
      markToday: '今', // 当天日期展示不使用默认数字，用特殊文字标记
      takeoverTap: true, // 是否完全接管日期点击事件（日期不会选中)
      emphasisWeek: true, // 是否高亮显示周末日期
      highlightToday: true, // 是否高亮显示当天，区别于选中样式（初始化时当天高亮并不代表已选中当天）
      preventSwipe: true, // 是否禁用日历滑动切换月份
      firstDayOfWeek: 'Mon', // 每周第一天为周一还是周日，默认按周日开始
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      autoChoosedWhenJump: true, // 设置默认日期及跳转到指定日期后是否需要自动选中
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
    * 日期点击事件（此事件会完全接管点击事件），需自定义配置 takeoverTap 值为真才能生效
    * currentSelect 当前点击的日期
    */
  takeoverTap(e) {
    console.log('takeoverTap', e.detail) // => { year: 2019, month: 12, date: 3, ...}
  },
  /**
   * 当改变月份时触发
   * => current 当前年月 / next 切换后的年月
   */
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail)
    // => { current: { month: 3, ... }, next: { month: 4, ... }}
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    const calendar = this.selectComponent('#calendar').calendar;
    calendar.setTodos({
      // 待办点标记设置
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dotColor: 'purple', // 待办点标记颜色
      circle: true, // 待办圆圈标记设置（如圆圈标记已签到日期），该设置与点标记设置互斥
      showLabelAlways: true, // 点击时是否显示待办事项（圆点/文字），在 circle 为 true 及当日历配置 showLunar 为 true 时，此配置失效
      dates: [
        {
          year: 2021,
          month: 3,
          date: 1,
          todoText: '待办',
          color: '#f40' // 单独定义代办颜色 (标记点、文字)
        },
        {
          year: 2021,
          month: 3,
          date: 15
        }
      ]
    })
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