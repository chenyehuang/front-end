<<<<<<< HEAD
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
=======
// index.js
// const goodsData = require('../../data/goods.js');
// import regeneratorRuntime from '../../lib/runtime/runtime';
// const { request } = require('../../request/index.js')


  







Page({


    data: {
        //zjk代码中新增内容
        like: 1,
        goodsData:{},
        userinfo:{},
        //绘制饼图
        value: 0,
        notValue: 0,
        //商品历史数据曲线
        recent_prices: [],
        //商品评论信息
        comment:[],
        //输入评论文本
        commentText:'',
        // 图片路径
        // pics:[
        //     "https://img14.360buyimg.com/n1/jfs/t1/105870/29/37356/181321/64182990Ff1348ae8/393261931108d053.jpg",
        //     "https://img14.360buyimg.com/n1/jfs/t1/36890/6/19494/160561/63a26700Efb418de8/6c7017a0c9caa09a.jpg",
        //     "https://img14.360buyimg.com/n1/jfs/t1/114869/11/27313/408591/6285e6c3E2b8c6aaf/8592e0b8336b83ec.jpg"
        // ],
>>>>>>> zhouyuxiang
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
    
<<<<<<< HEAD

=======
    //获取评论输入
    onInput: function (event) {
      this.setData({
        commentText: event.detail.value
      });
    },
    //评论发送后端
    onConfirm: function () {
      var commentText = this.data.commentText;
      var that=this
      wx.getStorage({
        key: 'openid', // 缓存的键名
        success(res) {
          var openid = res.data; // 获取到的值赋给变量x
          wx.request({
            url: 'http://47.115.221.21:8080/api/add_comment/', // 替换为你的接口地址
            method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
            data: {
              openid:openid,
              good_id:that.data.goodInfo.id,
              commentStr:commentText
            },
            header: {
              // 'Content-Type': 'application/json' // 根据接口要求设置请求头
            },
            success: function (res) {
              // 请求成功回调函数
              console.log(res.data); // 输出接口返回的数据
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

      // 将评论内容传递给后端
      // 调用后端接口发送评论内容
    },
>>>>>>> zhouyuxiang
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

        wx.showToast({
            title: '已经加入收藏',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮 
            mask: true
        })
    },
<<<<<<< HEAD



    // 加入关注
    //重写这个函数
    focusAdd() {
=======
    // 加入关注
    focusAdd() {
      // 从缓存中获取值x
      var that=this
      wx.getStorage({
        key: 'openid', // 缓存的键名
        success(res) {
          var openid = res.data; // 获取到的值赋给变量x
          // console.log(openid)
          console.log(that.data.goodInfo)
          wx.request({
            url: 'http://47.115.221.21:8080/api/add_collect', // 替换为你的接口地址
            method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
            data: {
              // 如果需要发送请求参数，可以在这里设置id：good_id以及用户的openid
              good_id:that.data.goodInfo.id,
              openid:openid
            },
            success: function (res) {
              // 请求成功回调函数
              console.log("关注",res.data); // 输出接口返回的数据
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


>>>>>>> zhouyuxiang
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
<<<<<<< HEAD
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
=======
    async getGoodInfo(goods_id) {
      var that=this
      wx.request({
      url: 'http://47.115.221.21:8080/api/product/'+goods_id, // 替换为你的接口地址
      method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
      success: function (res) {
        // 请求成功回调函数
        const goodInfo = res.data.products[0];
        // const goodsData = require('../../data/goods.js');
        // const goodInfo = goodsData.goodsData.find(item => item.id === parseInt(goods_id));
        console.log(goodInfo)
        // that.GoodInfo = goodInfo
        that.setData({
            goodInfo: {
                goods_name: goodInfo.name,
                goods_price: goodInfo.price,
                goods_introduce: goodInfo.introduce,
                pics: goodInfo.pics,
                id:goodInfo.id,
                
            },
            recent_prices:goodInfo.recent_prices,
            value:goodInfo.value,
            notValue:goodInfo.notvalue
            // isCollect: index !== -1 ? true : false
        })
        wx.request({
          url: 'http://47.115.221.21:8080/api/get_product_comment', 
          method: 'GET', 
          data: {
            good_id:goodInfo.id
          },
  
          success: function (res) {
            // 请求成功回调函数
            console.log(res.data.comment); // 输出接口返回的数据
            that.setData({
              comment:res.data.comment
            })
          },
          fail: function (res) {
            // 请求失败回调函数
            console.error(res);
          }
        });
      },
      fail: function (res) {
        // 请求失败回调函数
        console.error(res);
      }
    });

        
    },
>>>>>>> zhouyuxiang
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
      var that = this
      wx.request({
        url: 'http://47.115.221.21:8080/api/product', //需更换需请求数据的接口
        method: 'GET',//请求方式 OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        data: {
          // 如果需要发送请求参数，可以在这里设置
          // param1: 'value1',
          // param2: 'value2'
        },
        headers: {
          
        },
        success: function (res) {
          var data = res.data.products;
          console.log(data);
          that.setData({
            goodsData:data
          })

        },          

        fail: function (err) {console.log("失败") },//请求失败
      })
        let pages = getCurrentPages();
        let goods_id = pages[pages.length - 1].options.goods_id
        this.getGoodInfo(goods_id)
<<<<<<< HEAD
    }
=======
    },
    onLoad: function () {
        // 加载饼图、折线图
        this.position = {
          x: 150,
          y: 150,
          vx: 2,
          vy: 2
        }
        this.x = -100
    
        // 通过 SelectorQuery 获取 Canvas 节点
        wx.createSelectorQuery()
          .select('#canvas1')
          .fields({
            node: true,
            size: true,
          })
          .exec(this.init1.bind(this))


        //   加载饼图、折线图
        this.position = {
            x: 150,
            y: 150,
            vx: 2,
            vy: 2
          }
          this.x = -100
      
          // 通过 SelectorQuery 获取 Canvas 节点
          wx.createSelectorQuery()
            .select('#canvas2')
            .fields({
              node: true,
              size: true,
            })
            .exec(this.init2.bind(this))
      },    




    
      init1(res) {
        const width = res[0].width
        const height = res[0].height
    
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
    
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
    
        const renderLoop = () => {
          this.render1(canvas, ctx)
          canvas.requestAnimationFrame(renderLoop)
        }
        canvas.requestAnimationFrame(renderLoop)
    
      },
      init2(res) {
        const width = res[0].width
        const height = res[0].height
    
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
    
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
    
        const renderLoop = () => {
          this.render2(canvas, ctx)
          canvas.requestAnimationFrame(renderLoop)
        }
        canvas.requestAnimationFrame(renderLoop)
    
      },
      render1(canvas, ctx) {
        // ctx.clearRect(0, 0, 300, 300)
        this.drawPie(ctx)
        // ctx.moveTo(0,300)
        // this.drawLineChart(ctx)
      },
      render2(canvas, ctx) {
        // ctx.clearRect(0, 0, 300, 300)
        // this.drawPie(ctx)
        // ctx.moveTo(0,300)
        this.drawLineChart(ctx)
      },
      //绘制饼图
      drawPie(ctx) {
        const canvasWidth=320
        const canvasHeight=320
        const dpr = wx.getSystemInfoSync().pixelRatio;
        const total = this.data.value + this.data.notValue;
        const valueAngle = 2 * Math.PI * (this.data.value / total);
        // const notValueAngle = 2 * Math.PI * (this.data.notValue / total);
    
        // // 平移饼图位置
        // const translateX = 0;
        // const translateY = 500 ;
        // ctx.translate(translateX, translateY);


        // 绘制值部分
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
        ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2 - 1,0,valueAngle);
        ctx.closePath();
        ctx.fillStyle = '#39b54a'
        ctx.fill();
    
        // 绘制不值部分
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
        ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2 - 1,   valueAngle, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#e6e6e6'
        ctx.fill();
    
        // 绘制文本
        // ctx.setFontSize(16*dpr);
        // ctx.fontsize=500
        ctx.font ='20px sans-serif';
        ctx.fillStyle = '#333333'
    
        ctx.fillText(`${this.data.notValue} 不值`, canvasWidth / 2 + 30 * dpr, canvasHeight / 2 - 20 * dpr);
        ctx.fillText(`${this.data.value} 值`, canvasWidth / 2 + 30 * dpr, canvasHeight / 2 + 30 * dpr);
      },

      //绘制折线图
      drawLineChart(ctx) {
        // const dpr = wx.getSystemInfoSync().pixelRatio;
        // const canvasWidth = 300 * dpr;
        // const canvasHeight = 200 * dpr;
        const paddingLeft = 40 ; // 左侧留白宽度
        const paddingRight = 20 ; // 右侧留白宽度
        const paddingTop = 40 ; // 顶部留白高度
        const paddingBottom = 30 ; // 底部留白高度
    
        const canvasWidth = 300  - paddingLeft - paddingRight;
        const canvasHeight = 200  - paddingTop - paddingBottom;
    
        ctx.canvas.width = canvasWidth;
        ctx.canvas.height = canvasHeight;
    
    
      // 计算折线图绘制参数
      const prices = this.data.recent_prices.slice(-5); // 获取最近的5个价格
      const maxValue = Math.max(...prices.map(item => item.price)); // 最大价格
      const minValue = Math.min(...prices.map(item => item.price)); // 最小价格
      const xStep = (canvasWidth / (prices.length - 1))/1.4; // x 轴步长
      const yScale = (canvasHeight / (maxValue - minValue))/4; // y 轴缩放比例
    
    
      // 绘制折线图路径
      ctx.beginPath();
      prices.forEach((item, index) => {
        const x = index * xStep;
        const y = (maxValue - item.price) * yScale;
        if (index === 0) {
          // ctx.moveTo(x, y);
          ctx.moveTo(paddingLeft + x, paddingTop + y);
        } else {
          ctx.lineTo(paddingLeft + x, paddingTop + y);
          // ctx.lineTo(x, y);
        }
      });
      ctx.strokeStyle='#39b54a'
      // ctx.setLineWidth(2 * dpr);
      ctx.stroke();
    
      // 绘制价格点和提示框
      ctx.font ='10px sans-serif';
      prices.forEach((item, index) => {
        // const x = index * xStep;
        // const y = (maxValue - item.price) * yScale;
        const x = paddingLeft + index * xStep;
        const y = paddingTop + (maxValue - item.price) * yScale;
    
        ctx.beginPath();
        ctx.arc(x, y, 2 , 0, 2 * Math.PI);
        // ctx.setFillStyle('#39b54a');
        ctx.fillStyle='#39b54a'
        ctx.fill();
    
        // 绘制价格提示框
        const text = `${item.price}`;
        const textWidth = ctx.measureText(text).width+6;
        const textHeight = 13 ;
        const rectX = x - textWidth / 2 - 4 ;
        const rectY = y - textHeight - 8 ;
        const rectWidth = textWidth + 8 ;
        const rectHeight = textHeight + 4 ;
        // ctx.setFillStyle('#39b54a');
        ctx.fillStyle='#39b54a'
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        // ctx.setFontSize(12 * dpr);
        // ctx.setFillStyle('#ffffff');
        ctx.fillStyle='#ffffff'
        ctx.fillText(text+'￥', x - textWidth / 2, y - textHeight / 2);
    
        ctx.closePath();
      });
    
      // 绘制 x 轴刻度和时间标签
      // ctx.setFontSize(12 * dpr);
    //   改字体和字号
      ctx.font ='8px sans-serif';
      // ctx.setFillStyle('#333333');
      ctx.fillStyle='#333333'
      prices.forEach((item, index) => {
      const x = index * xStep;
      ctx.beginPath();
      ctx.moveTo(paddingLeft +x, canvasHeight-60);
      ctx.lineTo(paddingLeft +x, canvasHeight -50);
      ctx.strokeStyle='#333333'
      ctx.stroke();
      // ctx.fillText(item.time, paddingLeft + x, paddingTop + canvasHeight + 20 * dpr);
      ctx.fillText(item.time, paddingLeft + x-30,   paddingTop +canvasHeight-80);
      ctx.closePath();
      });
    
    
      },


      //zjk
      handleChange(e){
        

        console.log(e);
       let like = e.detail.value
      // var that = this,
       const openid = wx.getStorageSync('openid');
       

       if(like !== undefined){
         const onum = this.data.value;
         const onum1 = this.data.notValue 
         console.log(like);
       if(like == 0){
         this.data.value = (onum + 1);        
         this.setData({
         like:"0",
         value:this.data.value,
         notValue:this.data.notValue})
       }
       if(like == 1){
         this.data.notValue = (onum1 + 1);
         this.setData({
           like:"1",
           value:this.data.value,
           notValue:this.data.notValue})
       }
      }

       

       console.log(this.data.goodInfo.goods_name)
       wx.request({
         url: 'http://47.115.221.21:8080/api/value_or_not/',
         data:{
          userId: openid, //用户id
         goodInfo:this.data.goodInfo.goods_name,
         value:this.data.value
         },
         method:'GET',
         success:function(res){
           console.log("成功");
           console.log(res.data)
         },
         fail:function(res){
           console.log("失败");
         }
       })
     },












     

>>>>>>> zhouyuxiang
})