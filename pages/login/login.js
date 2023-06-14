// pages/login/login.js
<<<<<<< HEAD
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // avatarUrl:'',
        // userInfo:""
    },
    //登陆
    handleGetUserInfo(e) {
        let that=this
        wx.getStorage({//异步获取缓存
            key:"name",//本地缓存中指定的 key
            success:(res)=>{ 
              console.log('获取缓存成功',res.data)      
                this.setData({
                    name:res.data.nickName, //将得到的缓存给key 
                     
                     avatarUrl:res.data.avatarUrl         
                })        
            },
            fail(res){
                console.log(res)
                wx.showModal({
                    title: '感谢您使用！',
                    content: '请允许小程序可以使用您的头像和名字！',
                    success (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        that.getUserProfile()
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
            }   
        })

        // that.getUserProfile()
        const { userInfo } = e.detail;
        wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
            delta: 1
        });
        // const { userInfo } = e.detail;
        // wx.setStorageSync('userInfo', userInfo);
        // wx.navigateBack({
        //     delta: 1
        // });


        // wx.getUserProfile({
        //     desc: '用于保存用户的昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         console.log(res)
        //       this.setData({
        //         userInfo: res.userInfo,
                
        //       })
        //       wx.setStorage({
        //           key:'name',//本地缓存中指定的 key(类型：string)
        //           data:res.userInfo,//需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象(类型:any)
        //           success:(s)=>{  
        //               this.setData({
        //                   avatarUrl:res.userInfo.avatarUrl,         
        //                    name:res.userInfo.nickName
        //               })
        //           },
        //           fail:(f)=>{
        //              console.log('存储缓存失败====',f);    
   
        //           }
        //       })
        //     }
        //   })
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗    
        wx.getUserProfile({
          desc: '用于保存用户的昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
              console.log(res)
            this.setData({
              userInfo: res.userInfo,

            })
            wx.setStorage({
                key:'name',//本地缓存中指定的 key(类型：string)
                data:res.userInfo,//需要存储的内容。只支持原生类型、Date、及能够通过JSON.stringify序列化的对象(类型:any)
                success:(s)=>{  
                    this.setData({
                        avatarUrl:res.userInfo.avatarUrl,         
                         name:res.userInfo.nickName
                    })
                },
                fail:(f)=>{
                  //  console.log('存储缓存失败====',f);    
 
                }
            })
          }
        })
      },


    // onLoad(options) {
    //     let that=this
    //     wx.getStorage({//异步获取缓存
    //         key:"name",//本地缓存中指定的 key
    //         success:(res)=>{ 
    //           console.log('获取缓存成功',res.data)      
    //             this.setData({
    //                 name:res.data.nickName, //将得到的缓存给key 
                     
    //                  avatarUrl:res.data.avatarUrl         
    //             })        
    //         },
    //         fail(res){
    //             console.log(res)
    //             wx.showModal({
    //                 title: '感谢您使用！',
    //                 content: '请允许小程序可以使用您的头像和名字！',
    //                 success (res) {
    //                   if (res.confirm) {
    //                     console.log('用户点击确定')
    //                     that.getUserProfile()
    //                   } else if (res.cancel) {
    //                     console.log('用户点击取消')
    //                   }
    //                 }
    //               })
    //         }   
    //     })

    //     const { userInfo } = e.detail;
    //     wx.setStorageSync('userInfo', userInfo);
    //     wx.navigateBack({
    //         delta: 1
    //     });


    // },
})
=======
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
              url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxef773e30b4fbc429&secret=c312d462ceafb79c1effbacc185a864e&js_code=${code}&grant_type=authorization_code`,
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
                      wx.setStorageSync('userInfo', userInfo);
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

>>>>>>> zhouyuxiang
