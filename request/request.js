const http = require('./http.js').http;
const api = require('./api.js').api;
const request = {

  //登录注册
  login: (params) => {
    return http({
      url: api.login.index,
      method: "GET",
      params: params,
    });
  },

  //用户首页
  personalHome: (params) => {
    return http({
      url: api.personalHome.index,
      method: "GET",
      params: params,
    });
  },

  //用户我的
  personalMine: (params) => {
    return http({
      url: api.personalMine.index,
      method: "GET",
      params: params,
    });
  },
}

module.exports = {
  request,
}