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
     phone: '/api/access/v1/member/service-hot-line/list',
     //  link: '/api/access/v1/app/link',
     link: '/api/v1/app/link',
   },

   // 上传图片/视频
   upload: {
     imgVideoUpload: '/api/v1/app/imgUpload',
   },

   // 收藏
   favorites: {
     addFavorites: '/api/access/v1/member/collection/add',
     cancelFavorites: '/api/access/v1/member/collection/cancel',
     myFavoritesHouse: '/api/access/v1/member/collection/house/list/',
     myFavoritesOther: '/api/access/v1/member/collection/list/',
   },

   //浏览
   browse: {
     browseListingsList: '/api/access/v1/member/browsing/history/house/list/',
     browseOtherList: '/api/access/v1/member/browsing/history/list/',
     browserHistoryAdd: '/api/access/v1/user/member/browsing/history/add'
   },

   //房源
   listings: {
     newListingsList: '/api/access/v1/house/introduction/estate/list',
     towListingsList: '/api/access/v1/house/introduction/second/hand/list',
     sellHouse: '/api/access/v1/house/selling/add',
     customers: '/api/access/v1/recommend/customers/add',
     demand: '/api/access/v1/customer/house/demand/list',
     newListings: '/api/access/v1/house/estate/list',
     newListingsDetails: '/api/access/v1/house/estate/details/',
     towListings: '/api/access/v1/house/second/hand/list',
     towListingsDetails: '/api/access/v1/house/second/hand/details/',
     tenancyListings: '/api/access/v1/house/tenancy/list',
     tenancyListingsDetails: '/api/access/v1/house/tenancy/details/',
     quartersListings: '/api/access/v1/house/residential/quarters/list',
     quartersListingsDetails: '/api/access/v1/house/residential/quarters/details/',
     likeListings: '/api/access/v1/house/guess/like/list',
     addAgent: '/api/access/v1/house/relation/agent/add',
     webView: '/index.html',
   },

   // 运营之类的接口
   operation: {
     storeList: '/api/access/v1/store/list',
     street: '/api/v1/hms/area/street/list',
     area: '/api/v1/hms/area/street/list',
     subway: '/api/access/v1/house/metro/line/list',
     unitPrice: '/api/access/v1/single/price/list',
     totalPrice: '/api/access/v1/total/price/list',
     rent: '/api/access/v1/rental/price/list',
     type: '/api/access/v1/house/type/list',
     map: '/api/access/v1/house/around/list',
     ahistoryAdd: '/api/access/v1/user/member/browsing/history/add',
     visitorList: '/api/access/v1/member/visitors/list', //访客记录
     supportList: '/api/access/v1/supporting/text/list', //获客配文
     supportPoster: '/api/access/v1/poster/list' //获客海报
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
     articleClassify: '/api/access/v1/article/classify/list', //文章分类
     newsList: '/api/access/v1/news/list',
     postList: '/api/access/v1/post/list',
     newsDetail: (newsId) => {
       return `/api/access/v1/news/details/${newsId}`
     },
     postDetail: (postId) => {
       return `/api/access/v1/post/details/${postId}`
     },
     addPost: '/api/access/v1/post/add', //发帖
     commentNewPost: '/api/access/v1/news/post/comment', //新闻或帖子评论
     commentReply: '/api/access/v1/comment/reply', //新闻或评论回复
     constructClassify: '/api/access/v1/house/construct/classify/list', //建筑类型列表
     metroList: '/api/access/v1/house/metro/line/list', //地铁配置列表
     customerList: '/api/access/v1/customers/list', //获客文章列表
     customerArticleDetail: (customersId) => {
       return `/api/access/v1/customers/details/${customersId}`
     }
   },

   // 经纪人
   broker: {
     application: '/api/access/v1/member/agent/certified',
     result: '/api/access/v1/member/agent/certified/result',
     home: '/api/access/v1/member/agent/details/',
     delete: '/api/access/v1/house/around/del',
     list: '/api/access/v1/house/around/list/',
     promote: '/api/access/v1/house/around/promotion',
     portLsit: '/api/access/v1/order/port/set/meal/list',
     snatchLsit: '/api/access/v1/order/snatch/set/meal/list',
     submitOrder: '/api/access/v1/order/buy/confirm',
     wxPay: '/api/access/v1/fund/pay',
     myPackageList: '/api/access/v1/order/set/meal/list',
     superPromotion: '/api/access/v1/order/extension/set/meal/list',
     superSubmitOrder: '/api/access/v1/order/super/buy/confirm',
     superCalculation: '/api/access/v1/order/extension/set/meal/calculation',
     constructList: '/api/access/v1/house/construct/classify/list', //建筑类型列表
     pushCustomerList: '/api/access/v1/order/push/customers/list', //推送客源列表
     watiCustomerList: '/api/access/v1/order/waiting/customers/list', //待抢客源
     snatchCustomerList: '/api/access/v1/order/snatch/customers/list', //已抢客源
     visitorsList: '/api/access/v1/house/visitors/history/list', //房源访客
     houseAroundList: (agentId) => {
       return `/api/access/v1/house/around/list/${agentId}` //經紀人房源列表
     },
     snatchCustomer: '/api/access/v1/order/snatch/customers', //搶客
     superAdvert: (houseType, houseId) => {
       return `/api/access/v1/house/details/advert/${houseType}/${houseId}`
     }
   },
 }
 module.exports = {
   api: api
 }