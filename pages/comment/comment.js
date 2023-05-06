Page({
  // 设置收藏界面的每一bar

    data: {
      comment:[],
      count:0, //这个数字我也不知道能不能用，主要是拿来记录有几条评论的
      tabs: [
        {
          id: 0,
          value: "收到的评论",
          isActive: true
        },
        {
          id: 1,
          value: "发出的评论",
          isActive: false
        },
      ]
    },
    onShow(){
      const comment=wx.getStorageSync("comment")||[];
      this.setData({
        comment,
        count:comment.length
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