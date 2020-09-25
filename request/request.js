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
  infoUpData: (params) => {
    return http({
      url: api.information.infoUpData,
      method: "POST",
      params:params
    });
  },
  code: (params) => {
    return http({
      url: api.information.code + params.phone,
      method: "POST",
    });
  },
  phone: () => {
    return http({
      url: api.information.phone,
      method: "GET",
    });
  },
  link: (params) => {
    return http({
      url: api.information.link,
      method: "POST",
      params:params,
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

  // 房源列表
  newListings: (params) => {
    return http({
      url: api.listings.newListings,
      method: "GET",
      params: params,
    });
  },
  towListings: (params) => {
    return http({
      url: api.listings.towListings,
      method: "GET",
      params: params,
    });
  },
  tenancyListings: (params) => {
    return http({
      url: api.listings.tenancyListings,
      method: "GET",
      params: params,
    });
  },
  quartersListings: (params) => {
    return http({
      url: api.listings.quartersListings,
      method: "GET",
      params: params,
    });
  },

  //房源列表详情
  newListingsDetails: (params) => {
    return http({
      url: api.listings.newListingsDetails+params.houseId,
      method: "GET",
    });
  },
  towListingsDetails: (params) => {
    return http({
      url: api.listings.towListingsDetails+params.houseId,
      method: "GET",
    });
  },
  tenancyListingsDetails: (params) => {
    return http({
      url: api.listings.tenancyListingsDetails+params.houseId,
      method: "GET",
    });
  },
  quartersListingsDetails: (params) => {
    return http({
      url: api.listings.quartersListingsDetails+params.houseId,
      method: "GET",
    });
  },

  // 猜你喜欢
  likeListings: (params) => {
    return http({
      url: api.listings.likeListings,
      method: "GET",
      params:params,
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
      url: api.message.messageDetails + params.messageId,
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
      url: api.favorites.myFavoritesHouse + params.type,
      method: "GET",
      params: params,
    });
  },
  myFavoritesOther: (params) => {
    return http({
      url: api.favorites.myFavoritesOther + params.type,
      method: "GET",
      params: params,
    });
  },
  browseListingsList: (params) => {
    return http({
      url: api.browse.browseListingsList + params.type,
      method: "GET",
      params: params,
    });
  },
  browseOtherList: (params) => {
    return http({
      url: api.browse.browseOtherList + params.type,
      method: "GET",
      params: params,
    });
  },

  // 运营之类的接口
  storeList: (params) => {
    return http({
      url: api.operation.storeList,
      method: "GET",
      params: params,
    });
  },
  street: (params) => {
    return http({
      url: api.operation.street,
      method: "GET",
      params: params,
    });
  },
  subway: (params) => {
    return http({
      url: api.operation.subway,
      method: "GET",
      params: params,
    });
  },
  unitPrice: () => {
    return http({
      url: api.operation.unitPrice,
      method: "GET",
    });
  },
  totalPrice: () => {
    return http({
      url: api.operation.totalPrice,
      method: "GET",
    });
  },
  rent: () => {
    return http({
      url: api.operation.rent,
      method: "GET",
    });
  },
  type: () => {
    return http({
      url: api.operation.type,
      method: "GET",
    });
  },
  map: (params) => {
    return http({
      url: api.operation.map,
      method: "GET",
      params:params,
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

  application:(params)=> {
    return http({
      url: api.broker.application,
      method: 'POST',
      params: params
    })
  },

  result:()=> {
    return http({
      url: api.broker.result,
      method: 'GET',
    })
  },

  constructClassify: (params)=> {//建筑类型列表(勿删)
    return http({
      url: api.broker.constructList,
      method: 'GET',
      params: params
    })
  },

  brokerHome: (params)=> {
    return http({
      url: api.broker.home+params.agentId,
      method: 'GET',
    })
  },
  
  brokerList: (params)=> {
    return http({
      url: api.broker.list+params.agentId,
      method: 'GET',
    })

  },
  
  getHouseProperty: ()=>{//物业(勿删)
      return http({
        url: '/api/access/v1/house/property/classify/list',
        method: 'GET',
        params:{}
      })
  },
  getConstructClassify: ()=>{//建筑类型列表(勿删)
      return http({
        url: '/api/access/v1/house/construct/classify/list',
        method: 'GET',
        params:{}
      })
  }

}




module.exports = {
  request,
}
