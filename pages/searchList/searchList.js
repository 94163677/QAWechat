// pages/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    app: getApp(),
    inputShowed: false,
    inputVal: "",
    i: 0,
    clickIndex: -1,
    showList: [],
    allList: [
      { que: "合同（施工合同、监理合同）需要备案吗", ans: ["不需要"] },
      { que: "申报施工许可需要核查原件/收取原件吗", ans: ["全线上审批，只需提供彩色电子版扫描件（PDF格式），无需提供纸质版，也不需要核实原件 "] },
      { que: "线上审批的流程/怎么在线上提交", ans: ["施工许可核准", "→新增（此时你看到这个页面那个大项目编号是空白的）", "→查询已有工程规划数据", "→输入建设工程规划许可证号", "→选择项目", "→跳转至选择单体进行施工许可证办理页面", "→左边全部勾选", "→右上角点选择", "→此时会跳转到刚刚第二步那个新增的页面（此时你看到这个页面那个大项目编号里有数据）", "→点报建", "→这时你看到一个页面，里面都是空白的，上面一栏有建设项目登记、基本信息、项目概况、项目范围等等，全部都填写，附件信息那上传对应的扫描资料", "→中途可以点暂存", "→全部完成点提交"] },
      { que: "项目经理能在多少个项目上任职", ans: ["1个"] },
      { que: "总监理工程师能在多少个项目上任职", ans: ["3个"] },
      { que: "申请表需要盖章（公章、注册章）吗", ans: ["申请表需要五方盖章（盖公章），各主要负责人无需盖注册章"] },
      { que: "我在系统上报建，人员（施工单位、监理单位）找不到选不了是什么原因，怎么办", ans: ["1、若施工单位或监理单位被停牌，则会暂停一切报建业务，系统上是搜索不到人员的。只能把停牌原因处理掉恢复原状才行。", "2、人员未备案，系统无信息。则需去珠海市市住建局备案人员。"] },
      { que: "人员备案了，为什么显示证件过期？已经续期了", ans: ["第一次备案的时候有有效期，有效期到了会显示超期。续期后需要去市住建局备案人员那更新信息，否则续期后系统还是会显示证件已过期。"] },
      { que: "幕墙、燃气、装修工程要办理施工许可到底怎么办", ans: ["1、专业承包单位（施工单位）是与建设单位签订合同的，则需单独办理施工许可", "2、专业承包单位（施工单位）是与总包单位签订合同的，则办理专业分包，在总包主体施工证上做变更"] },
      { que: "办理施工许可是否一定要取得人防批复？", ans: ["基坑、桩基础工程办理施工许可无需考虑人防，主体工程报建施工许可前必须取得人防报建批复"] }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    });
  },

  cellItemClick: function(e){
    var index = e.currentTarget.dataset.index;
    var data = "";
    
    if(index >= 0 && index < this.data.showList.length){
      data = JSON.stringify(this.data.showList[index]);
    }
    this.setData({
      clickIndex: data
    });
    wx.navigateTo({
     url: ('../oneResult/oneResult?qadata=' + data)
    });
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setData({
          inputVal: value
        });
        if (this.isNull(value)){
          this.setData({
            showList: []
          });
          return;
        }
        this.searchByKey(value);
      }, 200)
    })
  },

  searchByKey: function(key){
    var isOr = key.indexOf('|') >= 0;
    var keys = [];
    var sepStr = key.split(' ');
    if (this.isNull(sepStr)){
      sepStr = [key];
    }
    for (var idx = 0; idx < sepStr.length; idx++){
      if (this.isNull(sepStr[idx])){
        continue;
      }
      var sep = sepStr[idx].split('|');
      if (this.isNull(sep)){
        keys.push(sepStr[idx]);
        continue;
      }
      for(var jdx=0; jdx<sep.length; jdx++){
        if (this.isNull(sep[jdx])) {
          continue;
        }
        keys.push(sep[jdx]);
      }
    }
    if (isOr){
      this.searchByKeysOr(keys);
    }else{
      this.searchByKeysAnd(keys);
    }
  },

  searchByKeysAnd(keys){
    var resultList = [];
    var totalList = this.data.allList;
    var found = false;
    if (this.isNull(keys)){
      this.setData({
        showList: resultList
      });
      return;
    }
    for (var idx = 0; idx < totalList.length; idx++){
      found = true;
      for(var jdx=0 ;jdx<keys.length; jdx++){
        if (totalList[idx].que.indexOf(keys[jdx]) < 0){
          found = false;
          break;
        }
      }
      if(found){
        resultList.push(totalList[idx]);
      }
    }
    this.setData({
      showList: resultList
    });
  },

  searchByKeysOr(keys){
    var resultList = [];
    var totalList = this.data.allList;
    var found = false;
    if (this.isNull(keys)) {
      this.setData({
        showList: resultList
      });
      return;
    }
    for (var idx = 0; idx < totalList.length; idx++) {
      found = false;
      for (var jdx = 0; jdx < keys.length; jdx++) {
        if (totalList[idx].que.indexOf(keys[jdx]) >= 0) {
          found = true;
          break;
        }
      }
      if (found) {
        resultList.push(totalList[idx]);
      }
    }
    this.setData({
      showList: resultList
    });
  },

  isNull: function(string){
    return string == null || string.length <= 0;
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