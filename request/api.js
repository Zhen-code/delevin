 const api = {
   // 登录
   login: {
     login: '/api/v1/member/login/wx',
     authorization: '/api/v1/member/login/authorization',
   },

   // 用户信息
   information:{
     info:'/api/access/v1/member/info',
     infoUpData:'/api/access/v1/user/member/info/update',
     code:'/api/access/v1/member/captcha/'
   },

   // 上传图片/视频
   upload: {
     imgUpload: '/api/v1/app/imgUpload',
     videoUpload: '/api/v1/app/imgUpload',
   },

   // 消息
   message:{
     messageList:'/api/access/v1/member/message/list',
     messageDetails:'/api/access/v1/member/message/details/',
   },

   // 用户端
   personalHome: {
     banner: '/api/v1/index/banner/list',
     icon: '/api/v1/index/icon/list',
     news: '/api/v1/index/news/list',
   },

   personalMine: {

   },

   // 经纪人端
   brokerHome: {

   },

   brokerMine: {

   },
 }
 module.exports = {
   api: api
 }