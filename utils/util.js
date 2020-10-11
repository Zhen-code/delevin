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

/**
 * 时间戳转化为年 月 日 时 分 秒
 * dateStamp: 传入时间戳
 * 2026-06-24 00:00:00 格式
*/
function formatTimeTwo(dateStamp) {

  let date = new Date(dateStamp);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let Mi = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let S = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  let tempDate = Y + M + D + H + Mi + S;
  return tempDate;
}
function getTime(val) {
  let time = new Date(val);
  let year = time.getFullYear();
  let month = formatNumber(time.getMonth()+1);
  let date = formatNumber(time.getDate());
  return (year+'/'+month+'/'+date);
}
function getImageInfo(path) {
  console.log(66)
  console.log(path)
  return new Promise((resolve,reject)=>{
    wx.getImageInfo({
      src: path,
      success: (res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
function to2Px(clientWidth,x){
  return Number(clientWidth*x/750);
}
const key = 'YGYBZ-XGBWW-WEERF-R7V27-PJIIK-O6BWA';
const referer = 'delevin-mini-program'; //调用插件的app的名称
let min_time = new Date("1900-01-01 00:00:00").getTime();
let currentDate = new Date().getTime();
module.exports = {
  formatTime,
  formatTimeTwo,
  key,
  referer,
  min_time,
  currentDate,
  getTime,
  getImageInfo,
  to2Px
};
