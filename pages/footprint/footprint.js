Page({
  data: {
    record:[],
    tabs: [
      {
        id: 0,
        value: "最新",
        isActive: true
      },
      {
        id: 1,
        value: "最赞",
        isActive: false
      },
    ]
  },
  //用于获取小程序本地存储中名为 "record" 的数据。若该数据不存在，则会设置变量 record 为一个空数组 []；若该数据存在，则会将它设置给变量 record，这部分可以看情况去掉。
  onShow(){
    const record=wx.getStorageSync("record")||[];
    this.setData({
      record
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