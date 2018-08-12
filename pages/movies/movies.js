// pages/movies/movies.js
var app = getApp();
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheater: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false,
    searchResult: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheaterUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";

    this.getMovieData(inTheaterUrl, "inTheater", "正在热映");
    this.getMovieData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieData(top250Url, "top250", "电影TOP250");

  },
  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    // console.log(category);
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },

  getMovieData: function(url, settedKey, slogan) {
    var that = this;
    wx.request({
      url: url,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data);
        that.processData(res.data, settedKey, slogan);
      },
      fail: function(option) {
        console.log(option);
      }
    })
  },
  processData: function(datas, settedKey, slogan) {
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
    //设置data的另一种方法
    var readyData = {};
    readyData[settedKey] = {
      slogan: slogan,
      movies: movies
    }
    this.setData(readyData);
  },
  cancelSearchResult: function() {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: []
    })
  },
  onBindFocus: function() {
    this.setData({
      containerShow: false,
      searchPanelShow: true,
      searchResult: []
    })
  },
  onBindConfirm: function(event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieData(searchUrl, "searchResult", "");
  },
  onMovieTap: function(event) {
    var id = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + id,
    })
  }
})