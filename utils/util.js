const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStarArray(stars) {
  var num = stars.substring(0, 1);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      arr.push(1);
    } else {
      arr.push(0);
    }
  }
  return arr;
}

function getMovieData(url, callback) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "application/json"
    },
    success: function(res) {
      callback(res.data);
    },
    fail:function(option){
      console.log(option);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStarArray: convertToStarArray,
  getMovieData: getMovieData
}