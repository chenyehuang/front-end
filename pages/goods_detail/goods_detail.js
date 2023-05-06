// import regeneratorRuntime from '../../lib/runtime/runtime';
// const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 图片路径
        pic:[
            "https://img14.360buyimg.com/n1/jfs/t1/105870/29/37356/181321/64182990Ff1348ae8/393261931108d053.jpg",
            "https://img14.360buyimg.com/n1/jfs/t1/36890/6/19494/160561/63a26700Efb418de8/6c7017a0c9caa09a.jpg",
            "https://img14.360buyimg.com/n1/jfs/t1/114869/11/27313/408591/6285e6c3E2b8c6aaf/8592e0b8336b83ec.jpg"
        ],
        //详情数据
        goodInfo: {},
        //是否被保存
        isCollect: false
    },
    GoodInfo: {},

    // 点击图片预览
    see(e){
        console.log(e)
        let indx = e.currentTarget.dataset.index // 找到点击图片的索引位置
        wx.previewImage({
          current: this.data.pic[indx], // 当前显示图片的http链接，将点击图片的索引数指定好
          urls: this.data.pic // 需要预览的图片http链接列表
        })
      },
    

    //点击收藏
    // 重写这个函数
    collectHandle() {
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = false
        let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        if (index === -1) {//未收藏，改为已收藏
            collect.push(
                this.GoodInfo
            );
            isCollect = true
        } else {//已收藏，改为未收藏
            collect.splice(index, 1)
            isCollect = false
        }
        wx.setStorageSync("collect", collect)
        this.setData({ isCollect })

        // wx.showToast({
        //     title: '已经加入收藏',
        //     icon: 'success',
        //     // true 防止用户 手抖 疯狂点击按钮 
        //     mask: true
        // })
    },



    // 加入关注
    //重写这个函数
    focusAdd() {
        // let cart = wx.getStorageSync("cart") || [];
        // let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
        // if (index === -1) {
        //     this.GoodInfo.num = 1
        //     this.GoodInfo.checked = true
        //     cart.push(this.GoodInfo)
        // } else {
        //     cart[index].num++
        // }
        // wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '已经加入关注',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮 
            mask: true
        })
    },
    //获取详情数据
    // async getGoodInfo(goods_id) {
    //     const goodInfo = await request({ url: "/goods/detail", data: { goods_id } });
    //     this.GoodInfo = goodInfo
    //         //获取收藏信息
    //     let collect = wx.getStorageSync("collect") || [];
    //     let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
    //     this.setData({
    //         goodInfo: {
    //             goods_name: goodInfo.goods_name,
    //             goods_price: goodInfo.goods_price,
    //             goods_introduce: goodInfo.goods_introduce,
    //             pics: goodInfo.pics
    //         },
    //         isCollect: index !== -1 ? true : false
    //     })

    // },
    //添加购物车
    // handleCartAdd() {
    //     let cart = wx.getStorageSync("cart") || [];
    //     let index = cart.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
    //     if (index === -1) {
    //         this.GoodInfo.num = 1
    //         this.GoodInfo.checked = true
    //         cart.push(this.GoodInfo)
    //     } else {
    //         cart[index].num++
    //     }
    //     wx.setStorageSync('cart', cart)
    //     wx.showToast({
    //         title: '已经加入购物车',
    //         icon: 'success',
    //         // true 防止用户 手抖 疯狂点击按钮 
    //         mask: true
    //     })
    // },
    // //点击收藏
    // collectHandle() {
    //     let collect = wx.getStorageSync("collect") || [];
    //     let isCollect = false
    //     let index = collect.findIndex(v => v.goods_id === this.GoodInfo.goods_id)
    //     if (index === -1) {
    //         collect.push(
    //             this.GoodInfo
    //         );
    //         isCollect = true
    //     } else {
    //         collect.splice(index, 1)
    //         isCollect = false
    //     }
    //     wx.setStorageSync("collect", collect)
    //     this.setData({ isCollect })
    // },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {
        let pages = getCurrentPages();
        let goods_id = pages[pages.length - 1].options.goods_id
        this.getGoodInfo(goods_id)
    }
})