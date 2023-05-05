// index.js
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
    imgURLs: ['/image/img1.jpg', '/image/img2.jpg', '/image/img3.jpg'],
    indicatorDots: true,
    vertical: false, //滑动方向是否为纵向
    autoplay: true,  //是否自动切换
    interval: 3500,  //自动切换时间间隔
    duration: 500,   //滑动动画时长
    activeColor:"#ffffff",  //当前选中的指示点颜色
    circular:true    // 是否采用衔接滑动
  },

    })
