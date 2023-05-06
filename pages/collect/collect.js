// pages/collect/index.js
Page({
// 设置收藏界面的每一bar
  data: {
    collect:[],
    tabs: [
      {
        id: 0,
        value: "商品收藏",
        isActive: true
      },
      {
        id: 1,
        value: "服务收藏",
        isActive: false
      },
      {
        id: 2,
        value: "资讯收藏",
        isActive: false
      },
    ]
  },
  onShow(){
    const collect=wx.getStorageSync("collect")||[];
    this.setData({
      collect
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