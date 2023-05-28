// pages/login/login.js
// login.js

const app = getApp();

Page({
  onLoad: function () {
    const userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
      });
    }
  },

  // onLoad: function () {
  //   // 获取用户openid
  //   let that = this
  //   wx.login({
  //       success: function (res) { //请求自己后台获取用户openid
  //           console.log('q',res.code)
  //           // wx.request({
  //           //     url: '开发者后台接口',
  //           //     data: {
  //           //         appid: '自己的微信公众号获取',
  //           //         secret: '自己的微信公众号获取',
  //           //         code: res.code
  //           //     },
  //           //     success: function (response) {
  //           //         var openid = response.data.openid;
  //           //         console.log('请求获取openid:' + openid); //可以把openid存到本地，方便以后调用
  //           //         wx.setStorageSync('openid', openid);
  //           //         that.setData({
  //           //             openid: "获取到的openid：" + openid
  //           //         })
  //           //     }
  //           // })
  //       }
  //   })
  // },


  onLogin: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function (res) {
        const userInfo = res.userInfo;
        // 发送用户信息到后端进行注册
        //获取openId（需要code来换取）这是用户的唯一标识符
        // 获取code值
        wx.login({
          //成功放回
          success:(res)=>{
            var that = this
            let code=res.code
            // 通过code换取openId
            wx.request({
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxc2ac191ba5df5dd2&secret=0dbc1c8d11316c8012c2b18bccc61bd7&js_code=${code}&grant_type=authorization_code`,
              success:(res)=>{
                userInfo.openid=res.data.openid
                const openid=res.data.openid
                wx.setStorageSync('openid', openid);
                // console.log('openid',openid)
                const nickName=userInfo.nickName
                const avatarUrl=userInfo.avatarUrl
                 wx.request({//提供用户信息进行用户注册
                  url: 'http://47.115.221.21:8080/api/create_user/', // 替换为你的接口地址
                  method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
                  data: {
                    // 如果需要发送请求参数，可以在这里设置
                    openid: openid,
                    nickName: nickName,
                    avatarUrl: avatarUrl,
                    forChangeName:"no",
                  },
                  header: {
                    // 根据接口要求设置请求头
                  },
                  success: function (res) {
                    // 请求成功回调函数
                    if(res.data.is_registered==true){// 是否已注册
                      userInfo.nickName=res.data.user_name//更新为数据库中的用户名
                      console.log(userInfo)
                      wx.setStorageSync('userInfo', userInfo);
                      wx.showToast({ title: '欢迎回来'+nickName, icon: 'none' });
                    }
                    else{
                      wx.showToast({ title: '已经为您自动注册', icon: 'none' });
                    }
                  },
                  fail: function (res) {
                    // 请求失败回调函数
                    console.error(res);
                  }
                });
              }
            })
          }
        })
        // TODO: 在这里添加发送请求的代码
        console.log('用户信息：', userInfo);
        // wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
        delta: 1
    });
      },
      fail: function (err) {
        console.error('获取用户信息失败', err);
      }
    })

    // wx.getUserInfo({
    //   //成功后会返回
    //   success:(res)=>{
    //     // 把你的用户信息存到一个变量中方便下面使用
    //     let userInfo= res.userInfo
    //     // console.log('res',res)
    //     //获取openId（需要code来换取）这是用户的唯一标识符
    //     // 获取code值
    //     // wx.login({
    //     //   //成功放回
    //     //   success:(res)=>{
    //     //     let code=res.code
    //     //     // 通过code换取openId
    //     //     wx.request({
    //     //       url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxc2ac191ba5df5dd2&secret=0dbc1c8d11316c8012c2b18bccc61bd7&js_code=${code}&grant_type=authorization_code`,
    //     //       success:(res)=>{
    //     //         userInfo.openid=res.data.openid
    //     //         console.log(userInfo.openid);
    //     //         console.log('userInfo:',userInfo);
    //     //          wx.request({//提供用户信息进行用户注册
    //     //           url: 'http://47.115.221.21:8080/api/create_user/', // 替换为你的接口地址
    //     //           method: 'POST', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
    //     //           data: {
    //     //             // 如果需要发送请求参数，可以在这里设置
    //     //             openId: userInfo.openid,
    //     //             nickName: userInfo.nickName,
    //     //             avatarUrl: userInfo.avatarUrl,
    //     //           },
    //     //           header: {
    //     //             // 根据接口要求设置请求头
    //     //           },
    //     //           success: function (res) {
    //     //             // 请求成功回调函数
    //     //             console.log(res.data); // 输出接口返回的数据
    //     //           },
    //     //           fail: function (res) {
    //     //             // 请求失败回调函数
    //     //             console.error(res);
    //     //           }
    //     //         });
    //     //       }
    //     //     })
    //     //   }
    //     // })
   
    //   }
    // })

    




    
  },
  


})

