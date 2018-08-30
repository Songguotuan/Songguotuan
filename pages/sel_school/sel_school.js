// pages/sel_school/sel_school.js
var that
var list = []
var session_now
var user_province
var user_school
var user_province_id
var user_school_id
var option_school
var option_school_yes = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user_province: '',
    user_school: '',
    option_school: '',
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
          wx.showActionSheet({
            itemList: fetch,
            success: function (res) {
              user_school_id = user_school_id[res.tapIndex];
              option_school_yes = 1;              
              that.setData({
                option_school: user_school[res.tapIndex]
              })
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

  signup: function(){
    //发送用户学校信息
    if (option_school_yes == 0){
      wx.showToast({
        title: '请选择学校',
        image: '/image/wrong.png',
        duration: 3000
      })
      return 0;
    }
    wx.request({
      url: 'https://www.acampus.cn/send_school_id',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        session: session_now,
        // 注意哦，省id固定了
        province_id: 12,
        school_id: user_school_id
      },
      success: result => {
        if (result.data.result == 'success') {
          wx.setStorage({
            key: 'user_school_id',
            data: user_school_id
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
    });
    wx.redirectTo({
      url: '../home/home',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后//缀
      // success: function () { }        //成功后的回调；
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'user_session',
      success: res => {
        session_now = res.data
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