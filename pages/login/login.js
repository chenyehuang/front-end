// pages/login/login.js
// login.js

const app = getApp();

Page({
  onLoad: function () {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      });
    }
  },

  onLogin: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function (res) {
        const userInfo = res.userInfo;
        // 发送用户信息到后端进行注册
        // TODO: 在这里添加发送请求的代码
        console.log('用户信息：', userInfo);
        wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
        delta: 1
    });
      },
      fail: function (err) {
        console.log('获取用户信息失败', err);
      }
    })
    
  }


})

