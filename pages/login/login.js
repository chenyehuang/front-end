// pages/login/login.js
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