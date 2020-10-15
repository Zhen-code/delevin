// const domain = "http://192.168.2.27:8080";
const domain = "https://dev.delevin.beiru168.com";
let header = {
  Authorization: wx.getStorageSync('token') || '',
}
const http = (config) => {
  return new Promise((resolve, reject) => {
    let params = { ...config };
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: domain + config.url,
      data: config.params,
      header: config.header ? Object.assign({
        Authorization: wx.getStorageSync('token')
      }, config.header) : {
        Authorization: wx.getStorageSync('token') || '',
      },
      method: config.method,
      success: function (res) {
        wx.hideLoading();
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else if (res.data.code === 403) {
          wx.showToast({
            title: "为确保能向您提供最准确的服务，请重新登录",
            icon: "none"
          });
          // reject("请重新登录");
          wx.navigateTo({
            url: "/pages/login/index"
          })
        } else {
          reject(res)
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
        resolve(res.data);
      },
      fail: function (err) {
        // fail调用接口失败
        reject(err);
        wx.showToast({
          title: '网络错误',
          icon: "none"
        })
      },
      complete: function () {
        setTimeout(() => {
          // wx.hideLoading();
        }, 1000)
      }
    });
  });
}

module.exports = {
  http,
  domain,
}
