'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'useroperation',
    operation: null,
    fankui_title:null,
    fankui_context:null,
    message: [],
    currentCouponTab: 0,
    orderNumber: ['待支付', '全部'],
    orderList: {},
    showMessage: null
  },

  bindtitle: function bindtitle(e){
    this.setData({
      fankui_title: e.detail.value
    });
  },
  bindcontext: function bindcontext(e) {
    this.setData({
      fankui_context: e.detail.value
    });
  },
  submit: function submit(e) {
    var context = this.data.fankui_context
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/feedback_controller.php',
      method: 'get',
      data: { 'feedback_content': context},
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('success')
        wx.showToast({
          title: '反馈提交成功',
          icon: 'success',
          mask: true
        });
      },
      fail: function () {
        console.log('fail')
      }
    }) 
  },
  /**
   * 选择消息显示
   */
  chooseMessage: function chooseMessage(e) {
    this.setData({
      showMessage: e.currentTarget.dataset.message
    });
  },

  /**
   * 设置couponTab
   * @param e
   */
  chooseCouponTab: function chooseCouponTab(e) {
    this.setData({
      currentCouponTab: e.currentTarget.dataset.tabid
    });
  },

  /**
   * 去支付
   * @param e
   */
  goPay: function goPay(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../gopay/gopay?id=' + e.currentTarget.dataset.id
    });
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // 由跳转链接设置标题
    var operation = params.operation;
    console.log(operation)
    console.log('onload')
    // 设置operation
    this.setData({
      operation: params.operation
    });
    // 判断传入类型
    if (operation === 'number') {
      operation = '我的排单号';
    } else if (operation === 'message') {
      operation = '消息';
    } else if (operation === 'integral') {
      operation = '反馈';
    } else {
      operation = '我的订单';
    } 
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: operation
    });
    var opid = wx.getStorageSync('openid')
    var that = this;
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/message_controller.php',
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        that.setData({ message: res.data.message })
      },
      fail: function () {
        console.log('获取消息失败！')
      }
    })

    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/order_get_by_openid.php',
      data: { 'openid': opid },
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log('获取订单成功')
        console.log(res.data.orderList)
        that.setData({ orderList: res.data.orderList })
      },
      fail: function () {
        console.log('获取订单失败！')
      }
    })   
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
//# sourceMappingURL=useroperation.js.map
