// components/clock_calendar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days: Object,
    firstWeek: Number,
    date: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeMonth(event) {
      let date = this.data.date.date;
      let type = event.currentTarget.dataset.type;
      this.triggerEvent(
        "changeMonth",
        { date: date, type: type },
        {}
      );
    },
    checkIn(event) {
      let date = this.data.date.date;
      let day = event.currentTarget.dataset.day;
      let ischeck = event.currentTarget.dataset.ischeck;
      this.triggerEvent(
        "checkIn",
        { date: date, day: day, ischeck: ischeck },
        {}
      );
    }
  }
})
