// components/one_detail/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object,
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
    onTap(event) {
      let id = event.currentTarget.dataset.id;
      this.triggerEvent(
        "delete",
        { id: id, },
        {}
      );
    },
    detail(event) {
      let id = event.currentTarget.dataset.id;
      this.triggerEvent(
        "details",
        { id: id, },
        {}
      );
    }
  }
})
