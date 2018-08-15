Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.showShareMenu({
    //   withShareTicket: false,
    //   success: function(res) {
    //     console.log(res);
    //   }
    // })
  },
  onShareAppMessage: function(res) {
    console.log(res);
    return {
      title: '自定义转发标题',
      path: 'pages/read/read'
    }
  },
  chooseAddress: function(event) {
    wx.chooseAddress({
      success: function(res) {
        console.log(res);
      }
    })
  },
  getUserInfo: function(event) {
    // wx.login({
    //   success: function(res) {
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      }
    })
    //   }
    // })
  },
  bindGetUserInfo: function(e) {
    console.log(e.detail);
  },
  checkSession: function(event) {
    wx.checkSession({
      success: function() {
        console.log("session_key 未过期，并且在本生命周期一直有效");
      },
      fail: function() {
        console.log("session_key 已经失效，需要重新执行登录流程");
        // wx.login() //重新登录
      }
    })
  },
  getSetting: function(e) {
    // wx.OpenSetting({
    //   success:(res)=>{
    //     console.log(res);
    //   }
    // })
  }
})