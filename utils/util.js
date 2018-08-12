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

// 请求电影数据方法
function getMovieData(url, callback) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "application/json"
    },
    success: function(res) {
      callback(res.data);
    },
    fail: function(option) {
      console.log(option);
    }
  })
}

function convertToCastString(casts) {
  var castsJoin = "";
  for (let idx in casts) {
    castsJoin = castsJoin + casts[idx].name + "/";
  }
  return castsJoin.substring(0, castsJoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = [];
  for (let idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

// 暴露出来可以给其它地方使用的参数
module.exports = {
  formatTime: formatTime,
  convertToStarArray: convertToStarArray,
  getMovieData: getMovieData,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}