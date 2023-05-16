
Page({
  data: {
    cartList: [ // 购物车列表
      { id: 9, name: '维达抽纸整箱24包家用实惠', img_src:'/image/我的关注/goods1.png',price:9.9,checked: false },
      { id: 99, name: '100%每日黑巧克力纯可可脂', img_src:'/image/我的关注/goods2.png',price:8.9,checked: false },
      { id: 566, name: '文具按动签字学生用中性笔', img_src:'/image/我的关注/goods3.png',price:9.9,checked: false }
    ],
    isManage: false // 是否为管理状态
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
        if (res.confirm) {
          const newCartList = cartList.filter(item => !item.checked);
          this.setData({ cartList: newCartList, isManage: false });
          wx.showToast({ title: '删除成功' });
        }
      }
    });
  }
});
