
Page({
  /**
   * 页面的初始数据
   */
  data: {
    comment: [],   //用户评论
    showModal: false,
    showToast: false,
    toastMessage: '',
    userId:""
  },

<<<<<<< HEAD
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
<<<<<<< HEAD
      const comment=wx.getStorageSync("comment")||[];
      this.setData({
        comment,
        count:comment.length
      });
=======
      var that=this
      wx.getStorage({
        key: 'openid', // 缓存的键名
        success(res) {
          var openid = res.data; // 获取到的值赋给变量x
          wx.request({
            url: 'http://47.115.221.21:8080/api/get_user_comment', // 替换为你的接口地址
            method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
            data: {
              openid:openid
            },
            success: function (res) {
              // 请求成功回调函数
              console.log(res.data); // 输出接口返回的数据
              that.setData({
                comment:res.data.comments
              })
            },
            fail: function (res) {
              // 请求失败回调函数
              console.error(res);
            }
          });

        },
        fail(err) {
          console.log(err); // 如果获取失败，打印错误信息
        }
      });

      // const comment=wx.getStorageSync("comment")||[];
      // this.setData({
      //   comment,
      //   count:comment.length
      // });
>>>>>>> zhouyuxiang
        
    },
    handleTabsItemChange(e) {
      // 1 获取被点击的标题索引
      const { index } = e.detail;
      // 2 修改源数组
      let { tabs } = this.data;
      tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
      // 3 赋值到data中
=======
  //请求用户评论
  get_comment(){
    var that = this;
    wx.request({
      url: 'http://47.115.221.21:8080/api/get_user_comment',
      data: {
        openid: that.data.userId 
      },
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
        openid: that.data.userId,     //用户id
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
>>>>>>> zhouyuxiang
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