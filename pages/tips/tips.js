

// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],        // 爆料的内容
    userId:""
},

  //请求我的爆料内容
  get_goodsList(){
    var that = this;
    wx.request({
      url: 'http://47.115.221.21:8080/api/get_break/',
      data:{
        openid: that.data.userId
      },
      success: (res) => {
        this.setData({
          goodsList: res.data,
        });
      },
    });
  },
onLoad: function () {

  var userId = wx.getStorageSync('openid');
  if (userId) {
  this.setData({
  userId: userId
  });
  } else {
  wx.showToast({
  title: '请先登录',
  icon: 'none',
  duration: 2000
  });
  setTimeout(function () {
  wx.switchTab({
  url: '/pages/index/index'
  });
  }, 2000);
  };

  this.get_goodsList()
 
}

})