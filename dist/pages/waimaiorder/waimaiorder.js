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
    numbers:0,
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
    },
    name:null,
    tel:null,
    address:null,
    ps:null,
    waimai_order:{}
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
    // todo 付款流程
    var that = this;
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success':function(){
    //   },
    //   'fail':function(){
    //   }
    // })
    console.log(this.data.shows)
    var opid = wx.getStorageSync('openid')
    this.setData({ waimai_order:{ 'name': that.data.name, 'time': that.data.order.time, 'allCount': that.data.order.allCount,
      'shows': that.data.shows, 'money': that.data.order.money, 'numbers': that.data.numbers, 'openid': opid,
      'tel': that.data.tel, 'address': that.data.address,'ps':that.data.ps}})

    wx.setStorageSync('waimai_order',that.data.waimai_order)
      console.log(wx.getStorageSync('waimai_order'))

    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/take_out_order_add.php',
      data: {'waimai_order':that.data.waimai_order},
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
    var k = 0;
    for(var i = 0 ;i<choosegoods.numbers.length;i++){
      console.log('1');
      if(choosegoods.numbers[i]<=0){
        continue;
      }
      // this.setData({ shows[i] : { 'numbers': choosegoods.numbers[i], 'name': choosegoods.names, 'price': choosegoods.sigleprice }})
      _shows[k] = { 'numbers': choosegoods.numbers[i], 'name': choosegoods.names[i], 'price': choosegoods.sigleprice[i]}
      k++
    }
    this.setData({shows:_shows})
    var timestamp = Date.parse(new Date()); 
    this.setData({ numbers: timestamp});
    var _name = wx.getStorageSync('waimainame');
    this.setData({name:_name})
    console.log('waimia'+_name)
    var _tel = wx.getStorageSync('tel');
    this.setData({ tel: _tel })
    var _ps = wx.getStorageSync('ps');
    this.setData({ ps: _ps })
    var _address = wx.getStorageSync('address');
    this.setData({ address: _address })
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
