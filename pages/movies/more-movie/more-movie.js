// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
    movies: [],
    navigateTitle: "",
    requestUrl: "",
    totalCount: 0,
    isEmpty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    this.setData({
      navigateTitle: category
    })
    var dataUrl = "";
    //传入类别参数以显示不同标题
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "电影TOP250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.setData({
      requestUrl: dataUrl
    })
    util.getMovieData(dataUrl, this.callBack);
  },
  callBack: function(datas) {
    var movies = [];
    var totalMovies = [];
    for (var i in datas.subjects) {
      var subject = datas.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      //把需要的数据提取到tmp类
      var tmp = {
        stars: util.convertToStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      //把tmp类添加到movies数组
      movies.push(tmp);
    }
    //利用isEmpty判断是否是第一次加载数据
    if (!this.data.isEmpty) {
      totalMovies = movies;
      this.setData({
        isEmpty: false
      })
    } else {
      //concat合并数组
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies,
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  },
  onReachBottom: function(event) {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    util.getMovieData(nextUrl, this.callBack);
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh:function(){
    this.setData({
      isEmpty:true,
      totalCount:0,
      movies:[]
    })
    var nextUrl = this.data.requestUrl + "?start=0&count=20";
    util.getMovieData(nextUrl, this.callBack);
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh();
  }
})