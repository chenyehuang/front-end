
Page({
  data: {
    cartList: [ // 购物车列表
      // { id: 9, name: '维达抽纸整箱24包家用实惠', img_src:'/image/我的关注/goods1.png',price:9.9,checked: false },
      // { id: 99, name: '100%每日黑巧克力纯可可脂', img_src:'/image/我的关注/goods2.png',price:8.9,checked: false },
      // { id: 566, name: '文具按动签字学生用中性笔', img_src:'/image/我的关注/goods3.png',price:9.9,checked: false }
    ],
    isManage: false, // 是否为管理状态
    goodsList: [],        // 商品数据
    offset: 0,
    limit: 3,//每次排行榜显示数量
    sort_type:'default'//排序方式
  },


  onShow: function () {
    //导入用户关注信息
    var that=this
  wx.getStorage({
    key: 'openid', // 缓存的键名
    success(res) {
      var openid = res.data; // 获取到的值赋给变量x
      wx.request({
        url: 'http://47.115.221.21:8080/api/user_collect/'+openid, // 替换为你的接口地址
        method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
        success: function (res) {
          // 请求成功回调函数
          const carlist=res.data.products
          var productsWithChecked = carlist.map(function(car) {
            return { ...car, checked: false };
          });
          that.setData({
            cartList:productsWithChecked
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

    

  },  
  // 选择购物车中的商品
  selectItem(e) {
    const { value } = e.detail;
    const { cartList } = this.data;
    cartList.forEach(item => {
      if (value.includes(item.id.toString())) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    
    this.setData({ cartList });
  },
  // 购物车管理按钮点击事件
  manageCart() {
    // 改变isManage变量
    this.setData({ isManage: !this.data.isManage });
    // 将所有已经选中的商品取消选中
    const { cartList } = this.data;
    cartList.forEach(item => {
        item.checked = false;
    });
    this.setData({ cartList });
  },
  // 删除购物车中选中的商品
  deleteCart() {
    const { cartList } = this.data;
    const selectedItems = cartList.filter(item => item.checked);
    if (selectedItems.length === 0) {
      wx.showToast({ title: '请选择要删除的商品', icon: 'none' });
      return;
    }
    wx.showModal({
      title: '提示',
      content: `确定要删除${selectedItems.length}件商品吗？`,
      success: (res) => {
        var that=this
        if (res.confirm) {
          const newCartList = cartList.filter(item => !item.checked);
          this.setData({ cartList: newCartList, isManage: false });
          //通知后端删除
          var checked_id = [];
          for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].checked === true) {
              checked_id.push(cartList[i].id);
            }
          }
          // console.log(checked_id);
          checked_id.forEach(function(good_id) {
            wx.getStorage({
              key: 'openid', // 缓存的键名
              success(res) {
                var openid = res.data; // 获取到的值赋给变量x
                wx.request({
                  url: 'http://47.115.221.21:8080/api/delete_collect', // 替换为你的接口地址
                  method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
                  data:{
                    openid:openid,
                    good_id:good_id
                  },
                  success: function (res) {
                    // 请求成功回调函数
                    const carlist=res.data.products

                    if (Array.isArray(carlist) && carlist.length > 0) {
                      var productsWithChecked = carlist.map(function(car) {
                        return { ...car, checked: false };
                      });
                    }
                    that.setData({
                      cartList:productsWithChecked
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
          });
          wx.showToast({ title: '删除成功' });
        }
      }
    });
  },

  onLoad: function () {

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
});

