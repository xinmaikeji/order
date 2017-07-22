var app = getApp();

var qqmapsdk;
Page({
  data:{
    addressInfo : {},
    site:null
  },
  address_id : '',
  

  onLoad: function (options) {

   var that = this;
   var address_id = options.address_id; 
   var location = wx.getStorageSync('location')
   if (location != '定位中') {
      this.setData({site:location})
   }
  },

  formSubmit : function(e){
    console.log(e)
    var consignee = e.detail.value.consignee,
    tel = e.detail.value.tel,
    address = e.detail.value.address;
    var ps = e.detail.value.ps;

    if(consignee == '' || tel == '' || address == ''){
      wx.showToast({
        title : '请填写相关信息',
        duration : 1000,
        mask : true
      })
      return;
    }	
    if(ps == '' || ps==null || ps==' '){
      ps = '无'
    }
    if(!/1[3-8]\d{9}/.test(tel)){
      wx.showToast({
        title : '请输入正确的手机号',
        duration : 1000,
        mask : true
      })
      return;
    }
    wx.setStorageSync('ps', ps)
    wx.setStorageSync('tel',tel);
    wx.setStorageSync('address', address);
    wx.setStorageSync('waimainame', consignee);
    wx.navigateTo({
      url: '../../waimai/waimai',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  backHome : function(e){
    app.backHome();
  }
})