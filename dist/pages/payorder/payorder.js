// 'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    table:null,
    title: 'payorder',
    numbers:0,
    order:null,
    shows: [],
    chooseGoods: {
      // 饭店id
      restaurant_id: 'renmaid',
      // 选择的商品数量
      goods: {},
      // 总金额
      money: 0,
      numbers: [],
      sigleprice: [],
      names: [],
      time: null,
      openid: null,
      // 总数
      allCount: 0
    }
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
  
    var that = this;
    if (this.data.table==null || this.data.table.trim()=="") {
      return wx.showToast({
        title: '请填写桌号',
        icon: 'success',
        mask: true
      });
    }
    // todo 付款流程
    // wx.requestPayment({
    //   'timeStamp': res.timeStamp,
    //   'nonceStr': res.nonceStr,
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success':function(res){
    //   },
    //   'fail':function(res){
    //   }
    // })
    console.log(this.data.shows)
    var opid = wx.getStorageSync('openid')
      wx.request({
        url: 'https://11335227.qcloud.la/xcx_web/controller/order_add_no_pay_controller.php',
        data: { 'table': that.data.table, 'time': that.data.order.time, 'allCount': that.data.order.allCount, 
          'shows': that.data.shows, 'money': that.data.order.money, 'numbers': that.data.numbers, 'openid': opid},
        method: 'get',
        header: { 'Content-Type': 'application/json' },
        success: function () {
          console.log('success')
          
        },
        fail: function () {
          console.log('获取菜单失败！')
        }
      }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var choosegoods = wx.getStorageSync('chooseGoods');
    this.setData({order:choosegoods});
    var _shows=[];
    var k=0;
    for(var i = 0 ;i<choosegoods.numbers.length;i++){
      if(choosegoods.numbers[i]<=0 || choosegoods.numbers[i]==null){
        continue;
      }
      _shows[k] = { 'numbers': choosegoods.numbers[i], 'name': choosegoods.names[i], 'price': choosegoods.sigleprice[i]}
      k++
    }
    this.setData({shows:_shows})
    var timestamp = Date.parse(new Date()); 
    this.setData({ numbers: timestamp})
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
