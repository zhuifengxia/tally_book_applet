const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const random = function generateMixed(n) {
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 35);
    res += chars[id];
  }
  return res;
}

const transTime = function transTime(unixtime, type) {
  var dateTime = new Date(unixtime)
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());
  var milliseconds = now_new - dateTime;
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (type == 0) {
    var timeSpanStr = year + '-' + month + '-' + day;
  } else {
    var timeSpanStr = month + '月' + day + "日";
  }

  return timeSpanStr;
}

const formatDate = function (type, time = "") {
  if (time) {
    var timestamp = time;
  } else {
    var timestamp = Date.parse(new Date());
  }

  //获取当前时间
  var n = timestamp;
  var date = new Date(n);
  //年
  var year = date.getFullYear();
  //月
  var month = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
  //日
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  if (type == 0) {
    var timeSpanStr = year + '-' + month + '-' + day;
  } else if (type == 1) {
    var timeSpanStr = month + '月' + day + "日";
  } else if (type == 2) {
    var timeSpanStr = year + '-' + month;
  } else if (type == 3) {
    var timeSpanStr = year + "年" + month + '月';
  }

  return timeSpanStr;
}

const promisic = function (func) {
  return function (params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res)
        },
        fail: (error) => {
          reject(error)
        }
      })
      func(args)
    })
  }
}

export {
  random,
  promisic,
  formatDate,
  transTime
}