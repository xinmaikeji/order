'use strict';
var util = require('../../utils/util.js');
// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'ordering',
    restaurant: {
      img: '',
      name: '',
      id: '',
      address: '',
      tel: '123412341234',
      grade: 'four-star',
      gradeNumber: '4.8',
      menuList: [],
      coupon: {
        id: 'code123123',
        delmoney: 10,
        condition: 100,
        time: '2017-12-12'
      }
    },
    // 当前的tab
    currentmenu: 0,
    // 当前的left栏
    currentleftmenu: 0,
    // 侧边栏联动当前值
    currentmenuid: 'list1',
    // 设置scroll-view的高度
    scrollHeight: 880,
    needDistance: 0,
    scrollHeight2: 815,
    showShopCarContent: false,
    showMask: false,
    menu1content: [{
      icon: 'iconfont icon-canshi',
      title: '催促上菜'
    }, {
      icon: 'iconfont icon-lingdang-copy',
      title: '呼叫服务员'
    }, {
      icon: 'iconfont icon-mifen2',
      title: '加米饭'
    }, {
      icon: 'iconfont icon-jiubei',
      title: '加酒水'
    }],
    chooseGoods: {
      // 饭店id
      restaurant_id: '',
      // 选择的商品数量
      goods: {},
      // 总金额
      money: 0,
      numbers:[],
      sigleprice:[],
      names : [],
      time:null,
      openid:null,
      // 总数
      allCount: 0
    }
  },
  /**
   * 确认订单
   */
  goCheckOrder: function goCheckOrder() {
    if (this.data.chooseGoods.allCount <= 0) {
      return wx.showToast({
        title: '您还没有点餐',
        icon: 'success',
        mask: true
      });
    }

    var choosegoods = wx.getStorageSync('chooseGoods');
    choosegoods.restaurant_id = this.data.restaurant.name
    var date = new Date()
    var time = util.formatTime(date)

    if(choosegoods.openid==null){
      var opid = wx.getStorageSync('openid');
      choosegoods.openid = opid;
    }
    choosegoods.time = time;
    wx.setStorage({
      key: 'chooseGoods',
      data: choosegoods,
    })

    wx.navigateTo({
      url: '../waimaiorder/waimaiorder?operation=checkOrder'
    });
  },

  /**
   * 计算消费金额
   */
  calculateMoney: function calculateMoney() {
    var goods = this.data.chooseGoods.goods;
    var menuList = this.data.restaurant.menuList;
    var money = 0;
    var singleMoney = 0;
    for (var goodsId in goods) {

      // console.log(goodsId)
      // console.log(goods[goodsId])
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = menuList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var lists = _step.value;

          // console.log(lists)
          // 具体列表内的菜单
          var list = lists.list;
          // console.log(list)
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var goodsID = _step2.value;
              if (goodsID.id === goodsId) {
                singleMoney = goodsID.food_price * goods[goodsId];
              }
              // return console.log(goodsID)
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      money += singleMoney;
    }
    return money;
  },

  /**
   * 显示购物车内容
   */
  showContent: function showContent() {
    if (this.data.chooseGoods.money <= 0) return;
    this.setData({
      showShopCarContent: !this.data.showShopCarContent,
      showMask: !this.data.showMask
    });
  },

  /**
   * 获取优惠券
   * @param e
   */
  getCoupon: function getCoupon(e) {
    wx.showToast({
      title: '详情请联系店长！',
      icon: 'success',
      duration: 2000,
      mask: true
    });
  },

  /**
   * 设置右侧滚动栏的位置
   */
  setNeedDistance: function setNeedDistance() {
    this.setData({
      needDistance: 142
    });
  },

  /**
   * 改变menu选择
   * @param e
   */
  choose: function choose(e) {
    // console.log(e)
    this.setData({
      currentmenu: e.currentTarget.dataset.tab
    });
  },

  /**
   * 改变left menu选择
   * @param e
   */
  leftChoose: function leftChoose(e) {
    this.setData({
      currentleftmenu: e.currentTarget.dataset.menu,
      currentmenuid: e.currentTarget.dataset.menulistid
    });
  },

  /**
   * 户呼叫服务
   * @param e
   */
  menu1choose: function menu1choose(e) {
    console.log(e.currentTarget.dataset.tabmenu);
  },

  /**
   * 拨打电话
   */
  callPhone: function callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.restaurant.tel
    });
  },

  /**
   * 修改标题栏文字
   */
  setNavigatorText: function setNavigatorText() {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.restaurant.name
    });
  },

  /**
   * 添加商品
   * @param e
   */
  addorder: function addorder(e) {
    // console.log(e.currentTarget)
    var goodsId = e.currentTarget.dataset.goodsid;
    // console.log(goodsId)
    var food_price = e.currentTarget.dataset.food_price;
    var food_name = e.currentTarget.dataset.foodname;
    // console.log(food_name);
    if (goodsId==null) {
      return wx.showModal({
        title: '抱歉',
        content: '您选的菜品暂时无法提供',
        showCancel: false,
        confirmText: '我知道了'
      });
    }
    var chooseGoods = this.data.chooseGoods;
    var goods = chooseGoods.goods;
    var names = chooseGoods.names;
    var numbers = chooseGoods.numbers;
    var count = goods[goodsId];
    var sigalprice = chooseGoods.sigleprice;
    // 已有该商品
    if (count) {
      goods[goodsId] = ++count;
      numbers[goodsId] = count;
    } else {
      goods[goodsId] = 1;
      numbers[goodsId] = 1;
      sigalprice[goodsId] = food_price;
      names[goodsId] = food_name;
      // console.log(sigalprice)
      // console.log(names)
    }
    // chooseGoods.sigalprice = sigalprice;
    chooseGoods.goods = goods;
    // chooseGoods.numbers = numbers;
    // chooseGoods.names = names;
    this.setData({
      chooseGoods: chooseGoods
    });
    var money = this.calculateMoney();
    chooseGoods.money = money;
    // 增加计数
    ++chooseGoods.allCount;
    this.setData({
      chooseGoods: chooseGoods
    });
    wx.setStorageSync('chooseGoods', this.data.chooseGoods);
  },

  /**
   * 删除商品
   * @param e
   */
  delorder: function delorder(e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    var food_price = e.currentTarget.dataset.food_price;
    var food_name = e.currentTarget.dataset.foodname;
    
    var chooseGoods = this.data.chooseGoods;
    var goods = chooseGoods.goods;
    var sigalprice = chooseGoods.sigleprice;
    var names = chooseGoods.name;
    var count = goods[goodsId];
    var numbers = chooseGoods.numbers;
    goods[goodsId] = --count;
    numbers[goodsId] = count;
    if(goods[goodsId]<=0){
      // console.log(sigalprice)
      // console.log(names)
      sigalprice[goodsId] = -1;
     
    }
    // chooseGoods.sigalprice = sigalprice;
    chooseGoods.goods = goods;
    // chooseGoods.numbers = numbers;
    // chooseGoods.names = names;
    this.setData({
      chooseGoods: chooseGoods
    });
    var money = this.calculateMoney();
    chooseGoods.money = money;
    // 减少计数
    --chooseGoods.allCount;
    if (chooseGoods.allCount <= 0) {
      this.setData({
        showMask: false,
        showShopCarContent: false
      });
    }
    this.setData({
      chooseGoods: chooseGoods
    });
    wx.setStorageSync('chooseGoods', this.data.chooseGoods);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    // 改变标题栏文字
    this.setNavigatorText();
    var that = this;
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/food_controller.php',
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({ restaurant: res.data.foods })
      },
      fail: function () {
        console.log('获取菜单失败！')
      }
    })

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
    this.setNeedDistance();
    // this.setData({ restaurant : wx.getStorageSync('menuList') } )
    // console.log('onready')
    // console.log(this.data.restaurant.menuList)
    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {

    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=ordering.js.map
