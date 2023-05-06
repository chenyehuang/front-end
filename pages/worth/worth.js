Page({
    data: {
      worth:[],
      tabs: [
        {
          id: 0,
          value: "值",
          isActive: true
        },
        {
          id: 1,
          value: "不值",
          isActive: false
        },
      ]
    },
    onShow(){
      const worth=wx.getStorageSync("worth")||[];
      this.setData({
        worth
      });
        
    },
    handleTabsItemChange(e) {
      // 1 获取被点击的标题索引
      const { index } = e.detail;
      // 2 修改源数组
      let { tabs } = this.data;
      tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
      // 3 赋值到data中
      this.setData({
        tabs
      })
    }
  })