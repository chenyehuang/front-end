Page({
  data: {
    name: '',
    price: '',
    description: '',
    purchaseChannel: '',
    recommendationReason: '',
    imageUrl_1: '',
    imageUrl_2: '',
    imageUrl_3: '',
    imageUrl_4: '',
    userId: '',
    prices: [],
    dateValue: "",
    priceValue: "",
    startDate: "2021-01-01",
    endDate: "2023-12-31"
  },

  onLoad: function () {
    var userId = wx.getStorageSync('openid');
    if (userId) {
    this.setData({
    userId: userId
    });
    } else {
    wx.showToast({
    title: '请先登录',
    icon: 'none',
    duration: 2000
    });
    setTimeout(function () {
    wx.switchTab({
    url: '/pages/index/index'
    });
    }, 2000);
    }
    },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  priceInput: function (e) {
    this.setData({
      price: e.detail.value
    });
  },


  descriptionInput: function (e) {
    this.setData({
      description:e.detail.value
    });
  },

  purchaseChannelInput: function (e) {
    this.setData({
      purchaseChannel: e.detail.value
    });
  },

  recommendationReasonInput: function (e) {
    this.setData({
      recommendationReason: e.detail.value
    });
  },

  imageUrlInput_1: function (e) {
    this.setData({
      imageUrl_1: e.detail.value
    });
  },
  imageUrlInput_2: function (e) {
    this.setData({
      imageUrl_2: e.detail.value
    });
  },
  imageUrlInput_3: function (e) {
    this.setData({
      imageUrl_3: e.detail.value
    });
  },
  imageUrlInput_4: function (e) {
    this.setData({
      imageUrl_4: e.detail.value
    });
  },


  priceChangeInput: function(e) {
    this.setData({
      priceValue: e.detail.value
    });
  },

  dateChangeInput: function(e) {
    this.setData({
      dateValue: e.detail.value
    });
  },

  confirmPrice: function() {
    const newPrice = {
      Date: this.data.dateValue,
      Price: this.data.priceValue,
    };
    this.setData({
      prices: [...this.data.prices, newPrice],
      dateValue: "",
      priceValue: "",
    });
  },

  formSubmit: function () {
    var that = this;
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    wx.request({
      url: 'http://47.115.221.21:8080/api/add_product/',
      method: 'GET',
      data: {
        name: that.data.name,           //商品名字
        price: that.data.price,         //商品价格
        description: that.data.description,   //商品描述
        purchaseChannel: that.data.purchaseChannel, //购买渠道
        recommendationReason: that.data.recommendationReason,//推荐理由
        imageUrl_1: that.data.imageUrl_1,     //图片链接
        imageUrl_2: that.data.imageUrl_2, 
        imageUrl_3: that.data.imageUrl_3, 
        imageUrl_4: that.data.imageUrl_4, 
        userId: that.data.userId,          //用户id
        prices: that.data.prices           //最近的价格及日期
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            name: '',
            price: '',
            latestPrice: '',
            description: '',
            purchaseChannel: '',
            recommendationReason: '',
            imageUrl_1: '',
            imageUrl_2: '',
            imageUrl_3: '',
            imageUrl_4: '',
            prices: []
          });
        } else {
         wx.showToast({
            title: '提交失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }

})