// Page({
//     data: {
//       worth:[],
//       tabs: [
//         {
//           id: 0,
//           value: "值",
//           isActive: true
//         },
//         {
//           id: 1,
//           value: "不值",
//           isActive: false
//         },
//       ]
//     },
//     onShow(){
//       const worth=wx.getStorageSync("worth")||[];
//       this.setData({
//         worth
//       });
        
//     },
//     handleTabsItemChange(e) {
//       // 1 获取被点击的标题索引
//       const { index } = e.detail;
//       // 2 修改源数组
//       let { tabs } = this.data;
//       tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
//       // 3 赋值到data中
//       this.setData({
//         tabs
//       })
//     }
//   })

Page({
  data: {
    worth:[],
    tabs:['值','不值'],
    tabIndex:0,

  },
  onShow(){
    
    const openid = wx.getStorageSync('openid');
    var that = this;
    

    wx.request({
      url: 'http://47.115.221.21:8080/api/get_user_value/',
      data:{
       openid: openid, //用户id

      },
      method:'GET',
      success:function(res){
        console.log("成功");
        console.log(res.data.user_values);
        that.setData({
          worth:res.data.user_values
          
        }, 
        )
        console.log(that.data.worth[0]);
  
      },

        
      

      fail:function(res){
        console.log("失败");
      }
    })
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
  },
  onTabClick(e) {
    let id = e.currentTarget.id;
    this.setData({
      tabIndex: id,
    })
  },
})