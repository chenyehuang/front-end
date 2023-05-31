Page({
  // 设置收藏界面的每一bar

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
        
    },
    handleTabsItemChange(e) {
      // 1 获取被点击的标题索引
      const { index } = e.detail;
      // 2 修改源数组
      let { tabs } = this.data;
      tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
      // 3 赋值到data中
      this.setData({
        tabs
      })
    }
  })