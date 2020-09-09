const http = require('./http.js').http;
const api = require('./api.js').api;
const request = {

  //登录注册
  login: (params) => {
    return http({
      url: api.login.login,
      method: "POST",
      params: params,
    });
  },

  //用户首页
  banner: (params) => {
    return http({
      url: api.personalHome.banner,
      method: "GET",
      params: params,
    });
  },
  icon: (params) => {
    return http({
      url: api.personalHome.icon,
      method: "GET",
      params: params,
    });
  },
  news: (params) => {
    return http({
      url: api.personalHome.news,
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