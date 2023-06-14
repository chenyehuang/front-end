
// const startupData = require('../../../data/startup.js');

// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    showToast: false,
    toastMessage: '',
    goodsList: [],        // 商品数据
    userId:""
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
  console.log(that.data.goodsList.products[index].name);//打印删除的商品名字
  wx.request({
    url: 'http://47.115.221.21:8080/api/delete_product/',
    data: {
      name: that.data.goodsList.products[index].name 
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

  //请求商品信息
  get_goodsList(){
    wx.request({
      url: 'http://47.115.221.21:8080/api/product',
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