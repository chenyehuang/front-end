// pages/Administrator/comment_management/comment_management.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Users: [],   //用户列表
    user_comment:[],
  },



  onLoad: function (options) {
    var that=this
      //请求用户信息
    wx.request({
      url: 'http://47.115.221.21:8080/api/user',
      success: (res) => {
        var users=res.data.users
        for (var i = 0;i<users.length;i++){
          var openid = users[i].openid; // 获取到的值赋给变量x
          // console.log(openid)
          wx.request({
            url: 'http://47.115.221.21:8080/api/get_user_comment', // 替换为你的接口地址
            method: 'GET', // 请求方法，可选值包括：GET、POST、PUT、DELETE等
            data: {
              openid:openid
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
        }
      },
    });



  }
})