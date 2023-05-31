// pages/Administrator/user_management/user_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Users: [],   //用户列表
    showModal: false,
    showToast: false,
    toastMessage: '',
    userId:""
  },

  //请求用户信息
  get_users(){
    wx.request({
      url: 'http://47.115.221.21:8080/api/user',
      success: (res) => {
        this.setData({
          Users: res.data,
        });
      },
    });
  },

  deleteProduct: function() {
    this.setData({
      showModal: true
    });
  },
  cancelDelete:function() {
    this.setData({
      showModal: false
    });
  },
  confirmDelete: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log("当前点击的元素索引为：" + index);
    console.log(that.data.Users.users[index].openid);//打印删除的用户openid
    wx.request({
      url: 'http://47.115.221.21:8080/api/delete_user/',
      data: {
        openid: that.data.Users.users[index].openid  //数组里是以0开始的，故减一
      },
      
      method: 'GET',
      success: function(res) {
        console.log(res.data);
        that.showToast('删除成功');
      },
      fail: function(res) {
        console.log(res.data);
        that.showToast('删除失败，请重试');
      }
    });
    this.setData({
      showModal: false
    });
  },
  showToast: function(message) {
    this.setData({
      showToast: true,
      toastMessage: message
    });
    setTimeout(() => {
      this.setData({
        showToast: false,
        toastMessage: ''
      });
    }, 2000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

    this.get_users()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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