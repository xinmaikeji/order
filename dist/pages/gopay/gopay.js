// 'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'payorder',
    table:null,
    numbers:0,
    shows: [],
    momey:null,
    allCount:0,
    time:null,
  },
  bindinput: function (e) {
    this.setData({
      table: e.detail.value
    })
  },
  /**
   * 支付货款
   */
  payMoney: function payMoney() {
    console.log(this.data.table)

    if (this.data.table==null || this.data.table.trim()=="") {
      return wx.showToast({
        title: '请填写桌号',
        icon: 'success',
        mask: true
      });
    // todo 付款流程
    wx.requestPayment({
      'timeStamp': res.timeStamp,
      'nonceStr': res.nonceStr,
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success':function(res){
      },
      'fail':function(res){
      }
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    var id = options.id;
    this.setData({ numbers:id} )
    var that = this;
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/order_by_order_id_controller.php',
      data: { 'id':id},
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res.data)
        that.setData({ momey: res.data.money, allCount: res.data.allCount, time: res.data.time, shows: res.data.shows,table:res.data.table})
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
//# sourceMappingURL=payorder.js.map
