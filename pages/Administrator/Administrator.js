// pages/Administrator/Administrator.js
<<<<<<< HEAD
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
=======
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
  },
  onLogin: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function (res) {
        const userInfo = res.userInfo;
        // 发送用户信息到后端进行注册
        // TODO: 在这里添加发送请求的代码
        console.log('用户信息：', userInfo);
      },
      fail: function (err) {
        console.log('获取用户信息失败', err);
      }
    })
  },
  onShow: function() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
        userInfo,
        collectNumber: collect.length
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
>>>>>>> zhouyuxiang

  },

  /**
<<<<<<< HEAD
   * 组件的方法列表
   */
  methods: {

  }
})
=======
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */


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
>>>>>>> zhouyuxiang
