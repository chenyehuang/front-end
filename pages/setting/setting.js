// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:" ",
    // nickname:"未设置",
    userinfo:{},
    //gpt修改用户名测试
    userName: '未设置',
    showModal: false,
    newName: ''
  },
///////////////////////////////////////////////////////////////////////////////
showModal() {
  this.setData({
    showModal: true
  });
},

cancelModify() {
  this.setData({
    showModal: false,
    newName: ''
  });
},

inputNewName(event) {
  const newName = event.detail.value;
  this.setData({
    newName: newName
  });
},

confirmModify() {
  const newName = this.data.newName;
  if (newName) {
    //弹窗确认提示框
    wx.showModal({
      title: '确认修改',
      content: `是否修改为"${newName}"？`,
      success: (res) => {
        //修改缓存内容
        // 从缓存中获取 userInfo 数据
        var userInfo = wx.getStorageSync('userInfo');
        // 判断 userInfo 是否存在;存在，进行数据替换;不存在，创建新的对象并设置 nickName
        if (userInfo) {
          userInfo.nickName = newName;
        } else {
          userInfo = {
            nickName: newName
          };
        }
        // 将更新后的 userInfo 数据存入缓存
        wx.setStorageSync('userInfo', userInfo);
        if (res.confirm) {
          this.setData({
            userName: newName,
            showModal: false,
            newName: ''
          });
        }
        const openid = wx.getStorageSync('openid');
        // console.log("AA",openid)
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
            forChangeName:"yes",
          },
          header: {
            // 根据接口要求设置请求头
          },
          success: function (res) {
            // 请求成功回调函数
            if(res.data.is_registered==true){// 是否已注册
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
        // TODO: 在这里添加发送请求的代码
        console.log('用户信息：', userInfo);
        wx.setStorageSync('userInfo', userInfo);
        wx.navigateBack({
        delta: 1
        });
    

    }
  })
  } else {
    wx.showToast({
      title: '请输入新名称',
      icon: 'none'
    });
  }
},














  // onLogin: function () {
  //   console.log(ssssssssssss)
  //   wx.getUserProfile({
  //     desc: '用于完善会员资料',
  //     success: function (res) {
  //       const userInfo = res.userInfo;
  //       // 发送用户信息到后端进行注册
  //       // TODO: 在这里添加发送请求的代码
  //       console.log('用户信息：', userInfo);
  //     },
  //     fail: function (err) {
  //       console.log('获取用户信息失败', err);
  //     }
  //   })
  // },
  onShow: function() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
        userInfo,
        userName:userInfo.nickName,
        collectNumber: collect.length,
    })
},
logOut(){
  wx.removeStorage({
    key: 'userInfo',  // 要清理的缓存项1的键名
  });
  wx.showToast({
    title: '已退出登录',
    icon: 'none',
    duration: 2000, // 提示框持续时间，单位为毫秒
    success: function() {
      // 提示框显示成功后的回调函数
      // 可在此处执行其他操作
    }
  });

  // 执行后重新进入页面，更新头像和用户名
  wx.reLaunch({url: '/pages/mine/mine' });
  
}
  // // 修改头像
  // chooseImage: function () {
  //   var that = this
  //   wx.showActionSheet({
  //     itemList: ['从相册选择', '拍照'],
  //     success: function (res) {
  //       if (res.tapIndex == 0) {
  //         wx.chooseImage({
  //           sourceType: ['album'],
  //           success: function (res) {
  //             that.setData({
  //               avatarUrl: res.tempFilePaths[0],
  //             })
  //           }
  //         })
  //       } else if (res.tapIndex == 1) {
  //         wx.chooseImage({
  //           sourceType: ['camera'],
  //           success: function (res) {
  //             that.setData({
  //               avatarUrl: res.tempFilePaths[0],
  //             })
  //           }
  //         })
  //       }
  //     },
  //     fail: function (res) {
  //       console.log(res.errMsg)
  //     },
  //   })
  // },
  // // 修改昵称, 这部分修改昵称不会搞
  // editNickname: function() {  
  //   var that = this;  
  //   wx.showModal({  
  //     title: '修改昵称',  
  //     content: '请输入昵称',  
  //     confirmText: '确定',  
  //     cancelText: '取消',  
  //     success: function(res) {  
  //       if (res.confirm) {  
  //         wx.showModal({  
  //           title: '确认修改',  
  //           content: '是否将昵称修改为 ' + that.data.inputValue + ' ?',  
  //           confirmText: '是',  
  //           cancelText: '否',  
  //           success: function(res) {  
  //             if (res.confirm) {  
  //               that.setData({  
  //                 nickname: that.data.inputValue,  
  //               })  
  //               wx.showToast({  
  //                   title: '昵称修改成功',  
  //                   icon: 'success',  
  //                 })  
  //               }  
  //             }  
  //           })  
  //         }  
  //       },  
  //       // 添加 input 框，保存输入的昵称  
  //       input: function(res) {  
  //         that.setData({  
  //           inputValue: res.detail.value,  
  //         })  
  //       },  
  //     })  
  //   },

})