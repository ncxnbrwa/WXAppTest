// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');

Page({
  data: {
    movies:[],
    navigateTitle: ""
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
    util.getMovieData(dataUrl, this.callBack)
  },
  callBack: function(datas) {
    var movies = [];
    for (var i in datas.subjects) {
      var subject = datas.subjects[i];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var tmp = {
        stars: util.convertToStarArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(tmp);
    }
    this.setData({
      movies: movies
    });
  },
  onReady: function(event) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }

})