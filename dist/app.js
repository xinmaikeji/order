App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate',
    version: '0.1.0',
    userInfo: null,
    openid: null
  },


  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function onLaunch() {
    console.log(' ========== Application is launched ========== ');
    var that = this;
    wx.login({
      success: function (r) {
        var code = r.code;//登录凭证
        if (code) {
          //2、调用获取用户信息接口
          wx.getUserInfo({
            success: function (res) {
              //3.请求自己的服务器，解密用户信息 获取信息
              wx.request({
                url: 'https://11335227.qcloud.la/xcx_web/controller/user_login.php',
                method: 'get',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: { iv: res.iv, code: code },
                success: function (data) {
                  console.log('返回成功')
                  wx.setStorageSync('openid', data.data.openid)  
                  var opid = wx.getStorageSync('openid');
                  wx.getUserInfo({
                    success: function (res) {
                      // that.setData({userInfo:res.userInfo})
                      that.data.userInfo = res.userInfo
                      // console.log(that.data.userInfo)
                      wx.request({
                        url: 'https://11335227.qcloud.la/xcx_web/controller/user_info_save.php',
                        data: {'userInfo':res.userInfo,'openid':opid},
                        method:'get',
                        success:function(){
                          console.log('发送成功')
                        },
                        fail:function(){
                          console.log('发送userinfo失败')
                        }
                      })
                    }  
                  })
                },

                fail: function () {
                  console.log('系统错误')
                }
              })
            },
            fail: function () {
              console.log('获取用户信息失败')
            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      },
      fail: function () {
        console.log('登陆失败')
      }
    })
  },

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function onShow() {
    console.log(' ========== Application is showed ========== ');
  },

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function onHide() {
    console.log(' ========== Application is hid ========== ');
  }
});
//# sourceMappingURL=app.js.map
