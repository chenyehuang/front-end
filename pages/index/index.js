// index.js
const goodsData = require('../../data/goods.js');
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
    limit: 5,
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
    //获取主页轮播图url信息
    const startupList = startupData.startupData.imgURLs;
    this.setData({
      imgURLs: startupList,
    });
    // 从 goodsData 中获取商品列表
    const goodsList = goodsData.goodsData;
    // 随机获取 limit 个商品,商品数量小于limit进行判断，并显示所有商品
    // 第一次必定选择数据库中序号前50%的内容
    const startIndex = Math.floor(Math.random() * (goodsList.length - this.data.limit))>0?Math.floor(Math.random() * (goodsList.length - this.data.limit))/2:0;
    const endIndex = startIndex + this.data.limit;
    const goodsToShow = goodsList.slice(startIndex, endIndex);
    // 将商品列表设置到 data 中
    this.setData({
      goodsList: goodsToShow,
      offset: endIndex
    });
  },

  loadMoreGoods: function () {
    const goodsList = goodsData.goodsData;
    
    const endIndex = this.data.offset + this.data.limit;
    // 如果商品已经全部展示，则不再加载
    if (endIndex >= goodsList.length) {
      wx.showToast({ title: '没有了，再看看别的吧', icon: 'none' });
      return;
    }

    const goodsToShow = goodsList.slice(this.data.offset, endIndex);

    // 将新的商品列表合并到原来的列表中
    const newGoodsList = this.data.goodsList.concat(goodsToShow);

    // 将商品列表设置到 data 中
    this.setData({
      goodsList: newGoodsList,
      offset: endIndex
    });
  }
})
