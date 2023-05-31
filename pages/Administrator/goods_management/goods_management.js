
const startupData = require('../../../data/startup.js');

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
    offset: 0,
    limit: 3,//每次排行榜显示数量
    sort_type:'default',//排序方式
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
  console.log(that.data.goodsList[index].name);//打印删除的商品名字
  wx.request({
    url: 'http://47.115.221.21:8080/api/delete_product/',
    data: {
      name: that.data.goodsList[index].name  //数组里是以0开始的，故减一
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

  
  //获取主页轮播图url信息
  const startupList = startupData.startupData.imgURLs;
  this.setData({
    imgURLs: startupList,
  });
  // 从 goodsData 中获取商品列表
  var event = {
    currentTarget: {
      dataset: {
        type: 'default' // 
      }
    }
  };
  this.goods_sort(event);


},

loadMoreGoods: function () {
  // 获取按钮的 data-type 属性值
  var type = this.data.sort_type;
  // 根据不同的排序类型执行相应的功能
  var goodsurl;
  if (type === 'default') {
    // 执行默认排序的功能
    goodsurl='http://47.115.221.21:8080/api/product';
  } else if (type === 'latest') {
    // 执行最新排序的功能
     goodsurl='http://47.115.221.21:8080/api/product_new';
  } else if (type === 'hot') {
    // 执行最热排序的功能
    goodsurl='http://47.115.221.21:8080/api/product_hot';
  }
  // 从 goodsData 中获取商品列表
  var that = this;
  wx.request({
    url: goodsurl, // 接口地址
    method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
    data: {
      // 如果需要发送请求参数，可以在这里设置
      // param1: 'value1',
      // param2: 'value2'
    },
    header: {
      // 'Content-Type': 'application/json' // 根据接口要求设置请求头
    },
    success: function (res) {
      // 请求成功回调函数
      // console.log(res.data); // 输出接口返回的数据
      const goodsList = res.data.products;
      const endIndex = that.data.offset + that.data.limit;
      // 如果商品已经全部展示，则不再加载
      if (endIndex >= goodsList.length) {
        wx.showToast({ title: '显示到底了', icon: 'none' });
        return;
      }

      const goodsToShow = goodsList.slice(that.data.offset, endIndex);

      // 将新的商品列表合并到原来的列表中
      const newGoodsList = that.data.goodsList.concat(goodsToShow);

      // 将商品列表设置到 data 中
      that.setData({
        goodsList: newGoodsList,
        offset: endIndex
      });
    },
    fail: function (res) {
      // 请求失败回调函数
      console.error(res);
    }
  });

},
goods_sort: function(event) {
  // 获取按钮的 data-type 属性值
  var type = event.currentTarget.dataset.type;
  //保存data-type
  this.setData({
    sort_type:type
  });
  // 根据不同的排序类型执行相应的功能
  var goodsurl;
  if (type === 'default') {
    // 执行默认排序的功能
    goodsurl='http://47.115.221.21:8080/api/product';
  } else if (type === 'latest') {
    // 执行最新排序的功能
     goodsurl='http://47.115.221.21:8080/api/product_new';
  } else if (type === 'hot') {
    // 执行最热排序的功能
    goodsurl='http://47.115.221.21:8080/api/product_hot';
  }
    // 从 goodsData 中获取商品列表
    var that = this;
    wx.request({
      
      url: goodsurl, // 接口地址
      method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
      data: {
        // 如果需要发送请求参数，可以在这里设置
        // param1: 'value1',
        // param2: 'value2'
      },
      header: {
        // 'Content-Type': 'application/json' // 根据接口要求设置请求头
      },
      success: function (res) {
        // 请求成功回调函数
        // console.log(res.data); // 输出接口返回的数据
        const goodsList = res.data.products;
        // 随机获取 limit 个商品,商品数量小于limit进行判断，并显示所有商品
        // 第一次必定选择数据库中序号前1%的内容
        // console.log(app);
        const startIndex = Math.floor(Math.random() * (goodsList.length - that.data.limit))>0?Math.floor(Math.random() * (goodsList.length - that.data.limit))/100:0;
        const endIndex = startIndex + that.data.limit;
        const goodsToShow = goodsList.slice(startIndex, endIndex);
        // 将商品列表设置到 data 中
        that.setData({
          goodsList: goodsToShow,
          offset: endIndex
        });
      },
      fail: function (res) {
        // 请求失败回调函数
        console.error(res);
      }
    });
}

})