
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: [],   //用户评论
    showModal: false,
    showToast: false,
    toastMessage: '',
    openid:"",      //获取的用户的id
    userId:""       //管理员自己的id
  },

  //请求用户评论
  get_comment(){
    var that = this;
    wx.request({
      url: 'http://47.115.221.21:8080/api/get_all_comment/',
      success: (res) => {
        this.setData({
          comment: res.data,
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
    wx.request({
      url: 'http://47.115.221.21:8080/api/delete_manage_comment/',
      data: {
        openid: that.data.comment.comments[index].openid,     //用户id
        product_id: that.data.comment.comments[index].product_id,   //商品id
        content: that.data.comment.comments[index].content      //评论内容
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

    this.get_comment()
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