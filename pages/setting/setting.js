// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:" ",
    nickname:"未设置",
    userinfo:{},
  },
  onLogin: function () {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: function (res) {
        const userInfo = res.userInfo;
        // 发送用户信息到后端进行注册
        // TODO: 在这里添加发送请求的代码
        console.log('用户信息：', userInfo);
      },
      fail: function (err) {
        console.log('获取用户信息失败', err);
      }
    })
  },
  onShow: function() {
    const userInfo = wx.getStorageSync('userInfo');
    const collect = wx.getStorageSync('collect') || [];
    this.setData({
        userInfo,
        collectNumber: collect.length
    })
},
  // 修改头像
  chooseImage: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['从相册选择', '拍照'],
      success: function (res) {
        if (res.tapIndex == 0) {
          wx.chooseImage({
            sourceType: ['album'],
            success: function (res) {
              that.setData({
                avatarUrl: res.tempFilePaths[0],
              })
            }
          })
        } else if (res.tapIndex == 1) {
          wx.chooseImage({
            sourceType: ['camera'],
            success: function (res) {
              that.setData({
                avatarUrl: res.tempFilePaths[0],
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      },
    })
  },
  // 修改昵称, 这部分修改昵称不会搞
  editNickname: function() {  
    var that = this;  
    wx.showModal({  
      title: '修改昵称',  
      content: '请输入昵称',  
      confirmText: '确定',  
      cancelText: '取消',  
      success: function(res) {  
        if (res.confirm) {  
          wx.showModal({  
            title: '确认修改',  
            content: '是否将昵称修改为 ' + that.data.inputValue + ' ?',  
            confirmText: '是',  
            cancelText: '否',  
            success: function(res) {  
              if (res.confirm) {  
                that.setData({  
                  nickname: that.data.inputValue,  
                })  
                wx.showToast({  
                    title: '昵称修改成功',  
                    icon: 'success',  
                  })  
                }  
              }  
            })  
          }  
        },  
        // 添加 input 框，保存输入的昵称  
        input: function(res) {  
          that.setData({  
            inputValue: res.detail.value,  
          })  
        },  
      })  
    },

})