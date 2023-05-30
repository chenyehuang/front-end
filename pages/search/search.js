// 确定数据库之后写接口再做

// import regeneratorRuntime from '../../lib/runtime/runtime';
// const { request } = require('../../request/index.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //商品列表
        goods: [],
        //按钮的显示
        btnShow: false,
        //输入值
        inputValue: ''
    },
    timeId: -1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    //输入框变化
    inputChange(e) {
        const { value } = e.detail;
        if (!value.trim()) {
            this.setData({
                btnShow: false,
                goods: [],
                inputValue: value
            })
            return
        };
        clearInterval(this.timeId);
        this.timeId = setTimeout(() => {
            this.getGoods(value);
        }, 1000);
        this.setData({
            btnShow: true
        })
    },
    //发送查询商品请求str（string），用户openid和搜索范围mode（string）
    async getGoods(query) {
        //访问后端数据
        var that=this
        wx.getStorage({
            key: 'openid', // 缓存的键名
            success(res) {
              var openid = res.data; // 获取到的值赋给变量x
             wx.request({
                url: 'http://47.115.221.21:8080/api/search_products', // 替换为你的接口地址
                method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
                data: {
                    str:query,
                    openid:openid,
                    mode:"all"
                },
                header: {
                    // 'Content-Type': 'application/json' // 根据接口要求设置请求头
                },
                success: function (res) {
                    // 请求成功回调函数
                    // console.log(res.data); // 输出接口返回的数据
                    // const goods = wx.request({ url: "http://47.115.221.21:8080/api/search_products", data: { str:query,openid:openid,mode:"all" } });
                    const goods = res.data.products
                    // console.log("goods",goods)
                    if (that.data.btnShow === false) return
                    that.setData({
                        goods
                    })
                },
                fail: function (res) {
                    // 请求失败回调函数
                    console.error(res);
                }
            });


              // 在这里可以对获取到的值x进行进一步的处理
            },
            fail(err) {
              console.log(err); // 如果获取失败，打印错误信息
            }
          });
        // wx.getStorage('openid', openid);
        // console.log("openid",openid)
        // const goods = await wx.request({ url: "http://47.115.221.21:8080/api/search_products", data: { str:query,openid:openid,mode:"all" } });
        // console.log("goods",goods)
        // if (this.data.btnShow === false) return
        // this.setData({
        //     goods
        // })
    },
    //点击取消按钮
    handleCancel() {
        this.setData({
            inputValue: '',
            btnShow: false,
            goods: []
        })
    }
})