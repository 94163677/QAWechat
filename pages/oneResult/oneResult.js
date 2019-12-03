// pages/oneResult/oneResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queTitle: "问题：",
    ansTitle: "回答：",
    qa: {
      que: "",
      ans: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.qadata == undefined || options.qadata == null || options.qadata.length <= 0){
      return;
    }
    var qaObj = JSON.parse(options.qadata);
    if(qaObj == null){
      return;
    }
    this.setData({
      qa: qaObj
    });
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