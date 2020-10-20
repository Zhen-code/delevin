var app = getApp();
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

function throttle(fn, delay) {
  // 记录上一次函数触发的时间
  var lastTime = 0;
  return function () {
    // 记录当前函数触发的时间
    var nowTime = Date.now();
    if (nowTime - lastTime > delay) {
      // 修正this指向问题
      fn.call(this);
      // 同步时间
      lastTime = nowTime;
    }
  }
}

function debounce(fn, interval) {
  let timer;
  let gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function () {
    clearTimeout(timer);
    let context = this;
    let args = arguments[0]; //保存此处的arguments，因为setTimeout是全局的，arguments无法在回调函数中获取，此处为闭包。
    timer = setTimeout(function () {
      fn.call(context, args); //args是事件处理函数默认事件参数event  call绑定当前page对象
    }, gapTime);
  };
}

module.exports = {
  formatTime: formatTime,
  debounce,
}