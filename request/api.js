 const api = {
   // 登录
   login: {
     login: '/api/v1/member/login/wx',
     authorization: '/api/v1/member/login/authorization',
   },

   // 用户信息
   information: {
     info: '/api/access/v1/member/info',
     infoUpData: '/api/access/v1/user/member/info/update',
     code: '/api/access/v1/member/captcha/',
   },

   // 上传图片/视频
   upload: {
     imgVideoUpload: '/api/v1/app/imgUpload',
   },

   // 收藏
   favorites: {
     addFavorites: '/api/access/v1/member/collection/add',
     cancelFavorites: '/api/access/v1/member/collection/cancel',
     myFavoritesHouse: '/api/access/v1/member/collection/house/list',
     myFavoritesOther: '/api/access/v1/member/collection/list',
   },

   //房源
   listings: {
     newListingsList: '/api/access/v1/house/introduction/estate/list',
     towListingsList: '/api/access/v1/house/introduction/second/hand/list',
     sellHouse: '/api/access/v1/house/selling/add',
   },

   // 消息
   message: {
     messageList: '/api/access/v1/member/message/list',
     messageDetails: '/api/access/v1/member/message/details/',
   },

   // 用户首页端
   personalHome: {
     search: '/api/access/v1/house/hot/word/search/list',
     banner: '/api/v1/index/banner/list',
     icon: '/api/v1/index/icon/list',
     news: '/api/v1/index/news/list',
   },

   // 经纪人
   broker: {
    application:'/api/access/v1/member/agent/certified',
    result:'/api/access/v1/member/agent/certified/result',
    home:'/api/access/v1/member/agent/details/{agentId}',
    delete:'/api/access/v1/house/around/del',
    list:'/api/access/v1/house/around/list/{agentId}',
    promote:'/api/access/v1/house/around/promotion',
   },
 }
 module.exports = {
   api: api
 }