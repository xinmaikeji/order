'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'search',
    order: [],
    searchText: null,
    history: [],
    chooseHistory: null,
    searchShow: true,
    rest:[]
  },
  /**
   * 清空搜索记录
   */
  cleanHistory: function cleanHistory() {
    this.setData({
      history: [],
      searchShow: false
    });
    wx.removeStorageSync('history');
  },

  /**
   * 改变标签选择
   * @param e
   */
  chooseTip: function chooseTip(e) {
    var index = e.currentTarget.dataset.choose;
    this.setData({
      chooseHistory: index
    });
  },

  /**
   * 键盘输入改变搜索结果
   */
  searchInput: function searchInput(e) {
    console.log(e.detail.value);
    this.setData({
      searchText: e.detail.value
    });

  },

  searchShop: function searchShop(){
    // var k = 0;
    // var _rest = [];
    // var text = this.data.searchText;
    // console.log(this.data.searchText)
    // var result = [];
    // result = this.data.order
    // for (var i = 0; i < result.length; i++) {
    //   String str = result[i]
    //   if (str.indexOf(text) >= 0) {
    //     _rest[k++] = result[i];
    //   }
    // }
    // console.log(_rest)
    // this.setData({ rest: _rest })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var that = this;
    var _order = [];
    wx.request({
      url: 'https://11335227.qcloud.la/xcx_web/controller/food_controller.php',
      method: 'get',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        var k = 0;
        var menulist = res.data.foods.menuList;
        for (var i = 0; i < menulist.length; i++) {
          var list = menulist[i].list;
          for(var j = 0 ; j<list.length;j++){
            _order[k] = { 'img': list[j].food_image_url, 'name': list[j].food_name, 'price': list[j].food_price}
            k++;
          }
        }
        that.setData({order:_order})
      },
      fail: function () {
        console.log('获取菜单失败！')
      }
    }) 
    // this.setData({order:wx.getStorageSync('order')})
    // console.log(this.data.title)
    // console.log(this.data.order)
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
//# sourceMappingURL=search.js.map
