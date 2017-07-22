'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'index',
    userInfo: null,
    userSite: '定位',
    order: {
      navTitle: '现场点菜',
      navIcon: 'iconfont icon-shalou'
    }, 
    waimai:{
      navTitle: '精品外卖',
      navIcon: 'iconfont icon-chuliyuyue'
    },
    imgUrls: [],
    hotShop: []
  },
  /**
   * 用户选择位置
   * @returns {boolean}
   */
  chooseLocation: function chooseLocation() {
    // console.log(1)
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        console.log(res);
        if (res.address.length <= 0) {
          return that.setData({
            userSite: res.address
          });
        }
        that.setData({
          userSite: res.address
        });
        wx.setStorageSync('location', res.address)
      }
    });
    console.log(this.data.userSite)
  },

  /**
   * 用户搜索
   */
  goSearch: function goSearch() {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var _this = this;
    wx.getLocation({
      success: function success(res) {
       // console.log(res);
      }
    });


    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/food_hot_controller.php',
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        _this.setData({ hotShop: res.data.hot_foods })
      },
      fail: function () {
        console.log('获取热门推荐失败！')
      }
    }) 



    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/turn_image_controller.php',
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        _this.setData({ imgUrls: res.data.imgUrls })
      },
      fail: function () {
        console.log('获取轮播图片失败！')
      }
    }) 

    // console.dir(app.data)
    // app.getUserInfo().then(function (info) {
    //   return _this.setData({ userInfo: info });
    // }).catch(console.info);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    console.log(' ---------- onReady ----------');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    console.log(' ---------- onShow ----------');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    console.log(' ---------- onHide ----------');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    console.log(' ---------- onUnload ----------');
  },
  onReachBottom: function () {
    // Do something when page reach bottom.
    // console.log('circle 下一页');
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log(' ---------- onPullDownRefresh ----------');
  }
});
// sourceMappingURL=index.js.map
