// pages/home/home.js
const app = getApp();
const that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    display_per_a: 'block',
    display_per_b: 'block',
    display_car_a: 'none',
    display_car_b: 'none',
    mode_per_bgcolor: '#f6b26b',
    mode_car_bgcolor: '#E9E7E7'
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
      display_per_a: 'block',
      display_per_b: 'block',
      display_car_a: 'none',
      display_car_b: 'none',
      mode_per_bgcolor: '#f6b26b',
      mode_car_bgcolor: '#E9E7E7'
    });
  },
  mode_car_tap: function(){
    this.setData({
      display_per_a: 'none',
      display_per_b: 'none',
      display_car_a: 'block',
      display_car_b: 'block',
      mode_per_bgcolor: '#E9E7E7',
      mode_car_bgcolor: '#f6b26b'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var fetch
    //抓取主页轮播图
    wx.request({
      url: 'https://www.acampus.cn/get_carousel',
      method: 'POST',
      success: function (result) {
        fetch = result.data.msg
        console.log(fetch)
        that.setData({
          imgUrls: fetch
        })
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