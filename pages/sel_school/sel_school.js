// pages/sel_school/sel_school.js
var that
var list = []
var user_province
var user_school
var user_province_id
var user_school_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_province: '',
    user_school: ''
  },
  //下拉出现和隐藏
  pull_school: function (e) {
    //历史订单fetch 
    var that = this
    var temp
    var fetch
    var user_province_id = 12
    wx.request({
      url: 'https://www.acampus.cn/pull_school',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        user_province_id: user_province_id,
      },
      success: result => {
        if (result.data.result == 'success') {
          fetch = result.data.msg;
          user_school_id = fetch;
          user_school = fetch[fetch.length-1];
          fetch = user_school;
          that.setData({
            array: fetch,
            hasHistoryOrder: true
          })
          wx.showActionSheet({
            itemList: fetch,
            success: function (res) {
              user_school_id = user_school_id[res.tapIndex];
              console.log(user_school_id);
            },
            fail: function (res) {
              console.log(res.errMsg)
            }
          })
        } else if (result.data.msg == 'session已过期') {
          var temp = wxlogin.wxLoginAgain()
          wx.showToast({
            title: '请重试',
            image: '/image/wrong.png',
            duration: 3000
          })
        } else if (result.data.msg == '无历史订单') {
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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