Page({
  data: {
    content:"",
    userId: ""
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
    }
    },

  descriptionInput: function (e) {
    this.setData({
      content:e.detail.value
    });
  },


  formSubmit: function () {
    var that = this;
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    wx.request({
      url: 'http://47.115.221.21:8080/api/opinion/',
      method: 'GET',
      data: {
        content: that.data.content,   //意见描述
        userId: that.data.userId          //用户id
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            content: ""
          });
        } else {
         wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }

})