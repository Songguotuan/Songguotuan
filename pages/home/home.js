// pages/home/home.js
const app = getApp();
const that = this;
var rou;
var animation_bar_btn = 0;
const util = require('../../utils/util.js');
var order_id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    display_per: 'block',
    display_car: 'none',
    mode_per_bgcolor: '#f6b26b',
    mode_car_bgcolor: '#E9E7E7',
    order_data:'',
    open: false,
    actionSheetList:[],
    hasOrder: false,
    order_id: ''
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 点击顺风代取，出现per隐藏car
  mode_per_tap: function(){
    this.setData({
      display_per: 'block',
      display_car: 'none',
      mode_per_bgcolor: '#f6b26b',
      mode_car_bgcolor: '#E9E7E7'
    });
  },
  mode_car_tap: function(){
    this.setData({
      display_per: 'none',
      display_car: 'block',
      mode_per_bgcolor: '#E9E7E7',
      mode_car_bgcolor: '#f6b26b'
    })
  },
  //下拉出现和隐藏
  accept_ads: function (e) {
    //历史订单fetch 
    var that=this
    var temp
    var fetch
    var school_id = 10058
    wx.request({
      url: 'https://www.acampus.cn/fetch_pull',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        school_id: school_id,
      },
      success: result => {
        if (result.data.result == 'success') {
          fetch = result.data.msg
          that.setData({
            array: fetch,
            hasHistoryOrder: true
          })
          wx.showActionSheet({
            itemList: fetch,
            success: function (res) {
              console.log(res.tapIndex)
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
  //接单
  get_the_list:function(e){
    order_id = e.currentTarget.id;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var fetch1
    var fetch2
    var fetch3
    var temp
    var school_id = 10058
    //查询主页轮播图
    wx.request({
      url: 'https://www.acampus.cn/get_carousel',
      method: 'POST',
      success: function (result) {
        fetch2 = result.data.msg
        console.log(fetch2)
        that.setData({
          imgUrls: fetch2
        })
      },
      fail: res => {
        wx.showToast({
          title: '网络不好哟',
          image: '/image/wrong.png',
          duration: 3000
        })
      }
    }),
    //查询订单fetch
    wx.request({
      url: 'https://www.acampus.cn/fetch_order',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
      },
      success: result => {
        if (result.data.result == 'success') {
          fetch2 = result.data.msg
          console.log(fetch2)
          that.setData({
            order_data: fetch2,
            hasHistoryOrder: true
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