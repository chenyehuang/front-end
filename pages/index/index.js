// index.js
// const goodsData = require('../../data/goods.js');
const startupData = require('../../data/startup.js');

// 获取应用实例
const app = getApp()

Page({
    onShareAppMessage() {
      return {
        title: 'swiper',
        path: 'page/component/pages/swiper/swiper'
      }
    },
  
     // 轮播js
  data: {
    // 商品数据
    goodsList: [],
    offset: 0,
    limit: 3,//每次排行榜显示数量
    sort_type:'default',//排序方式
    //轮播图片
    imgURLs: [],
    // 其他数据
    
    indicatorDots: true,
    vertical: false, //滑动方向是否为纵向
    autoplay: true,  //是否自动切换
    interval: 3500,  //自动切换时间间隔
    duration: 500,   //滑动动画时长
    activeColor:"#ffffff",  //当前选中的指示点颜色
    circular:true    // 是否采用衔接滑动
  },
  onLoad: function () {
    // wx.request({
    //   url: 'http://47.115.221.21:8080/api/product', // 替换为你的接口地址
    //   method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
    //   data: {
    //     // 如果需要发送请求参数，可以在这里设置
    //     // param1: 'value1',
    //     // param2: 'value2'
    //   },
    //   header: {
    //     // 'Content-Type': 'application/json' // 根据接口要求设置请求头
    //   },
    //   success: function (res) {
    //     // 请求成功回调函数
    //     console.log(res.data); // 输出接口返回的数据
    //   },
    //   fail: function (res) {
    //     console.log('&&'); 
    //     // 请求失败回调函数
    //     console.error(res);
    //   }
    // });
    
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

    // const goodsList = goodsData.goodsData;
    // // 随机获取 limit 个商品,商品数量小于limit进行判断，并显示所有商品
    // // 第一次必定选择数据库中序号前50%的内容
    // const startIndex = Math.floor(Math.random() * (goodsList.length - this.data.limit))>0?Math.floor(Math.random() * (goodsList.length - this.data.limit))/2:0;
    // const endIndex = startIndex + this.data.limit;
    // const goodsToShow = goodsList.slice(startIndex, endIndex);
    // // 将商品列表设置到 data 中
    // this.setData({
    //   goodsList: goodsToShow,
    //   offset: endIndex
    // });
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
          wx.showToast({ title: '没有了，再看看别的吧', icon: 'none' });
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
    // const goodsList = goodsData.goodsData;
    
    // const endIndex = this.data.offset + this.data.limit;
    // // 如果商品已经全部展示，则不再加载
    // if (endIndex >= goodsList.length) {
    //   wx.showToast({ title: '没有了，再看看别的吧', icon: 'none' });
    //   return;
    // }

    // const goodsToShow = goodsList.slice(this.data.offset, endIndex);

    // // 将新的商品列表合并到原来的列表中
    // const newGoodsList = this.data.goodsList.concat(goodsToShow);

    // // 将商品列表设置到 data 中
    // this.setData({
    //   goodsList: newGoodsList,
    //   offset: endIndex
    // });
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
