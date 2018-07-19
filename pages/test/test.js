// pages/test/test.js
const app = getApp();
var that = this;
var rou;
var animation_bar_btn = 0;
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    homeColor:'black',
    orderColor:'black',
    chatColor: 'black',
    myColor:'black',
    rou: '#f6b26b',
    animation_bar_a:{},
    animation_bar_b:{},
    to_cover:'none'
  },
  // bar跳转
  the_home: function () {
    wx.redirectTo({
      url: '../home/home',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后//缀
      // success: function () { }        //成功后的回调；
    })
  },
  the_order: function () {
    wx.redirectTo({
      url: '../order/order',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后//缀
      // success: function () { }        //成功后的回调；
    })
  },
  the_chat:function(){
    wx.redirectTo({
      url: '../chat/chat',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后//缀
      // success: function () { }        //成功后的回调；
    })
  },
  the_my: function () {
    wx.redirectTo({
      url: '../my/my',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后//缀
      // success: function () { }        //成功后的回调；
    })
  },
  //弹出点击跳转
  bar_per:function(){

    wx.navigateTo({
      url:'../perSend',
      success: function (res) {
        console.log(res)
      },
    })
  },
  bar_per: function () {
    wx.navigateTo({
      url: '../perSend',
    })
  },

// 基于函数节流的按钮动画控制函数，降低bug率
  mid_start: util.throttle(function () {
    if (animation_bar_btn == 0) {
      // 人代取出现
      this.animation.translate(-115, -140).step(),
      this.animation.translate(-100, -120).step(),
      this.setData({
        animation_bar_a: this.animation.export(),
      })
      // 车代取出现
      this.animation.translate(115, -140).step(),
      this.animation.translate(100, -120).step()
      this.setData({
        animation_bar_b: this.animation.export()
      })
      //遮罩出现
      const that = this;      
      setTimeout(function () {
        that.setData({
          to_cover: 'block'
        })
      }, 10)

      animation_bar_btn++;
    } else {
      // 人代取消失
      this.animation.translate(-115, -140).step(),
      this.animation.translate(100, 120).step()
      this.setData({
        animation_bar_a: this.animation.export()
      })
      // 车代取消失
      this.animation.translate(115, -140).step(),
      this.animation.translate(-100, 120).step()
      this.setData({
        animation_bar_b: this.animation.export()
      })
      //遮罩消失
      setTimeout(function () {
        that.setData({
          to_cover: 'none'
        })
      }, 330)
      animation_bar_btn--;
    }
  }, 600),
  //点击覆盖层任意位置，回收按钮

  to_cover_over: function () {
    // 人代取消失
    this.animation.translate(-115, -140).step(),
    this.animation.translate(100, 120).step()
    this.setData({
      animation_bar_a: this.animation.export()
    })
    // 车代取消失
    this.animation.translate(115, -140).step(),
    this.animation.translate(-100, 120).step()
    this.setData({
      animation_bar_b: this.animation.export()
    })
    //遮罩消失
    const that = this;
    setTimeout(function () {
      that.setData({
        to_cover: 'none'
      })
    }, 330)
    animation_bar_btn--;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    rou = this.route;
    rou = rou.substr(rou.length - 4)
    rou = rou +"Color";
    console.log(rou);// 获取当前路径
    // res = str.substr(str.length - 4)
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
    // 弹出动画初始化
    var animation = wx.createAnimation({
      transformOrigin: "-50% -50%",
      duration: 230,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
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