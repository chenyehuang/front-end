const goodsData = [
  {
    id: 1,
    name: '商品1',
    image: '../../image/goods/goods1.png',//商品图片（缩略图）
    pics:['../../image/goods/goods1.png','../../image/goods/goods1.png','../../image/goods/goods1.png'],//商品页面轮播图，数量任意，但要大于一个
    price: 1110.0,//价格
    value: 90,//认为值得买人数
    notvalue: 118,//认为不值得买人数
    views:203,//浏览次数
    referrer_id:10086,//推荐人id(第一次)
    recommended_time:1684063608,//推荐时间
    purchase_method:"淘宝",//购买渠道
    recommendation_reason:"因为很好",//推荐原因
    recent_prices: [
      { price: 10.2, time: '2023-05-10' },
      { price: 15.5, time: '2023-05-11' },
      { price: 12.8, time: '2023-05-12' },
      { price: 18.0, time: '2023-05-13' },
      { price: 16.9, time: '2023-05-14' },
      { price: 20.0, time: '2023-05-15' }
    ],//近期价格

    introduce:"维达纸巾是一种高品质的纸质产品，以其柔软、耐用和吸水性而著名。它采用优质的原材料和先进的生产工艺，每一张纸巾都经过严格的品质检测，确保产品的质量和卫生性。维达纸巾不仅可以用于擦拭家庭的日常污垢，还可以用于洗脸、擦手和擦汗等多种用途。与其他品牌的纸巾相比，维达纸巾更加柔软和吸水，让您的生活更加舒适和方便。无论是在家中、办公室还是旅行中，维达纸巾都是不可或缺的必备品。"
  },
  {
    id: 2,
    name: '商品2',
    image: '../../image/goods/goods1.png',//商品图片（缩略图）
    pics:['../../image/goods/goods1.png','../../image/goods/goods1.png','../../image/goods/goods1.png'],//商品页面轮播图，数量任意，但要大于一个
    price: 1110.0,//价格
    value: 200,//认为值得买人数
    notvalue: 118,//认为不值得买人数
    views:203,//浏览次数
    referrer_id:10086,//推荐人id
    recommended_time:1684063608,//推荐时间
    purchase_method:"淘宝",//购买渠道
    recommendation_reason:"因为很好",//推荐原因
    recent_prices: [
      { price: 10.2, time: '2023-05-10' },
      { price: 15.5, time: '2023-05-11' },
      { price: 12.8, time: '2023-05-12' },
      { price: 18.0, time: '2023-05-13' },
      { price: 16.9, time: '2023-05-14' },
      { price: 20.0, time: '2023-05-15' }
    ],//近期价格
    introduce:"维达纸巾是一种高品质的纸质产品，以其柔软、耐用和吸水性而著名。它采用优质的原材料和先进的生产工艺，每一张纸巾都经过严格的品质检测，确保产品的质量和卫生性。维达纸巾不仅可以用于擦拭家庭的日常污垢，还可以用于洗脸、擦手和擦汗等多种用途。与其他品牌的纸巾相比，维达纸巾更加柔软和吸水，让您的生活更加舒适和方便。无论是在家中、办公室还是旅行中，维达纸巾都是不可或缺的必备品。"
  },{
    id: 3,
    name: '商品3',
    image: '../../image/goods/goods1.png',//商品图片（缩略图）
    pics:['../../image/goods/goods1.png','../../image/goods/goods1.png','../../image/goods/goods1.png'],//商品页面轮播图，数量任意，但要大于一个
    price: 1110.0,//价格
    value: 75,//认为值得买人数
    notvalue: 118,//认为不值得买人数
    views:203,//浏览次数
    referrer_id:10086,//推荐人id
    recommended_time:1684063608,//推荐时间
    purchase_method:"淘宝",//购买渠道
    recommendation_reason:"因为很好",//推荐原因
    recent_prices: [
      { price: 10.2, time: '2023-05-10' },
      { price: 15.5, time: '2023-05-11' },
      { price: 12.8, time: '2023-05-12' },
      { price: 18.0, time: '2023-05-13' },
      { price: 16.9, time: '2023-05-14' },
      { price: 20.0, time: '2023-05-15' }
    ],//近期价格
    introduce:"维达纸巾是一种高品质的纸质产品，以其柔软、耐用和吸水性而著名。它采用优质的原材料和先进的生产工艺，每一张纸巾都经过严格的品质检测，确保产品的质量和卫生性。维达纸巾不仅可以用于擦拭家庭的日常污垢，还可以用于洗脸、擦手和擦汗等多种用途。与其他品牌的纸巾相比，维达纸巾更加柔软和吸水，让您的生活更加舒适和方便。无论是在家中、办公室还是旅行中，维达纸巾都是不可或缺的必备品。"
  },{
    id: 4,
    name: '商品4',
    image: '../../image/goods/goods1.png',//商品图片（缩略图）
    pics:['../../image/goods/goods1.png','../../image/goods/goods1.png','../../image/goods/goods1.png'],//商品页面轮播图，数量任意，但要大于一个
    price: 1110.0,//价格
    value: 1,//认为值得买人数
    notvalue: 118,//认为不值得买人数
    views:203,//浏览次数
    referrer_id:10086,//推荐人id
    recommended_time:1684063608,//推荐时间
    purchase_method:"淘宝",//购买渠道
    recommendation_reason:"因为很好",//推荐原因
    recent_prices: [
      { price: 10.2, time: '2023-05-10' },
      { price: 15.5, time: '2023-05-11' },
      { price: 12.8, time: '2023-05-12' },
      { price: 18.0, time: '2023-05-13' },
      { price: 16.9, time: '2023-05-14' },
      { price: 20.0, time: '2023-05-15' }
    ],//近期价格
    introduce:"维达纸巾是一种高品质的纸质产品，以其柔软、耐用和吸水性而著名。它采用优质的原材料和先进的生产工艺，每一张纸巾都经过严格的品质检测，确保产品的质量和卫生性。维达纸巾不仅可以用于擦拭家庭的日常污垢，还可以用于洗脸、擦手和擦汗等多种用途。与其他品牌的纸巾相比，维达纸巾更加柔软和吸水，让您的生活更加舒适和方便。无论是在家中、办公室还是旅行中，维达纸巾都是不可或缺的必备品。"
  },{
    id: 5,
    name: '商品5',
    image: '../../image/goods/goods1.png',//商品图片（缩略图）
    pics:['../../image/goods/goods1.png','../../image/goods/goods1.png','../../image/goods/goods1.png'],//商品页面轮播图，数量任意，但要大于一个
    price: 1110.0,//价格
    value: 120,//认为值得买人数
    notvalue: 118,//认为不值得买人数
    views:203,//浏览次数
    referrer_id:10086,//推荐人id
    recommended_time:1684063608,//推荐时间
    purchase_method:"淘宝",//购买渠道
    recommendation_reason:"因为很好",//推荐原因
    recent_prices: [
      { price: 10.2, time: '2023-05-10' },
      { price: 15.5, time: '2023-05-11' },
      { price: 12.8, time: '2023-05-12' },
      { price: 18.0, time: '2023-05-13' },
      { price: 16.9, time: '2023-05-14' },
      { price: 20.0, time: '2023-05-15' }
    ],//近期价格
    introduce:"维达纸巾是一种高品质的纸质产品，以其柔软、耐用和吸水性而著名。它采用优质的原材料和先进的生产工艺，每一张纸巾都经过严格的品质检测，确保产品的质量和卫生性。维达纸巾不仅可以用于擦拭家庭的日常污垢，还可以用于洗脸、擦手和擦汗等多种用途。与其他品牌的纸巾相比，维达纸巾更加柔软和吸水，让您的生活更加舒适和方便。无论是在家中、办公室还是旅行中，维达纸巾都是不可或缺的必备品。"
  },
  
  // ...
];

module.exports = {
  goodsData: goodsData
};




