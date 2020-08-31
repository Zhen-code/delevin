const http = require('./http.js').http;
const api = require('./api.js').api;
const request = {
  //首页
  home: (params) => {
    return http({
      url: api.home.index,
      method: "GET",
      params: params,
    });
  },

  //我的
  mine: (params) => {
    return http({
      url: api.MINE.index,
      method: "GET",
      params: params,
    });
  },
}

module.exports = {
  request,
}