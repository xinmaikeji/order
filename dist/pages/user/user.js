'use strict';

// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    userInfo: null,
    userDetail: [{
      title: '积分',
      number: 20
      }],
    userid:null,
    userList: [{
      icon: 'iconfont icon-lingdang',
      title: '消息',
      id: 'message'
    }, {
      icon: 'iconfont icon-fapiao',
      title: '反馈',
      id: 'integral'
    }, {
      icon: 'iconfont icon-dingdan',
      title: '我的订单',
      id: 'order'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    this.setData({
      userInfo: app.data.userInfo
    });
    var that = this;
    var cards;
    var opid = wx.getStorageSync('openid')
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/user_get_id.php',
      method: 'get',
      data: { 'openid': opid },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        cards = res.data.userid
        that.setData({ userid: cards })
      },
      fail: function () {
        console.log('fail')
      }
    }) 


    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
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
//# sourceMappingURL=user.js.map
