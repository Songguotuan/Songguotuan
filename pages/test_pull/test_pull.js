// pages/test_pull/test_pull.js
const app = getApp();
const that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open:false,
    pull_inner_data:'',
    hasOrder:false
  },
  accept_ads: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      })
    } else {
      this.setData({
        open: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var temp
    var fetch3
    var school_id = 10058
    // 查询收件点信息
    wx.request({
      url: 'https://www.acampus.cn/fetch_pull',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        school_id: school_id
      },
      success: result => {
        if (result.data.result == 'success') {
          // 是将json数组转换为字符串
          fetch3 =  JSON.parse(result.data.msg)
          console.log(fetch3)
          that.setData({
            pull_inner_data:fetch3,
            hasOrder: true
          })
        } else if (result.data.msg == 'session已过期') {
          var temp = wxlogin.wxLoginAgain()
          wx.showToast({
            title: '请重试',
            image: '/image/wrong.png',
            duration: 3000
          })

        } else if (result.data.msg == '无订单') {
          //do nothing
        } else {
          wx.showToast({
            title: result.data.msg,
            image: '/image/wrong.png',
            duration: 3000
          })
        }
      },
      fail: res => {
        wx.showToast({
          title: '网络不好哟',
          image: '/image/wrong.png',
          duration: 3000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})