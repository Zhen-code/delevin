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

  //用户信息
  information: () => {
    return http({
      url: api.information.info,
      method: "GET",
    });
  },
  code: (params) => {
    return http({
      url: api.information.code+params.phone,
      method: "POST",
    });
  },

  //推荐新、二房源
  newListingsList: (params) => {
    return http({
      url: api.listings.newListingsList,
      method: "GET",
      params: params,
    });
  },
  towListingsList: (params) => {
    return http({
      url: api.listings.towListingsList,
      method: "GET",
      params: params,
    });
  },

  //消息列表
  messageList: (params) => {
    return http({
      url: api.message.messageList,
      method: "GET",
      params: params,
    });
  },
  messageDetails: (params) => {
    return http({
      url: api.message.messageDetails+params.messageId,
      method: "GET",
    });
  },

  // 收藏
  addFavorites: (params) => {
    return http({
      url: api.favorites.addFavorites,
      method: "POST",
      params: params,
    });
  },
  cancelFavorites: (params) => {
    return http({
      url: api.favorites.cancelFavorites,
      method: "POST",
      params: params,
    });
  },
  myFavoritesHouse: (params) => {
    return http({
      url: api.favorites.myFavoritesHouse,
      method: "GET",
      params: params,
    });
  },
  myFavoritesOther: (params) => {
    return http({
      url: api.favorites.myFavoritesOther,
      method: "GET",
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
  search: (params) => {
    return http({
      url: api.personalHome.search,
      method: "GET",
    });
  },
  icon: (params) => {
    return http({
      url: api.personalHome.icon,
      method: "GET",
      params: params,
    });
  },
  sellHouse: (params) => {
    return http({
      url: api.listings.sellHouse,
      method: "POST",
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
