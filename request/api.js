 const api = {
   //登录
   login: {
     login: '/api/v1/member/login/wx',
     authorization:'/api/v1/member/login/authorization',
   },

   // 用户端
   personalHome: {
     index: '/api/access/v1/user/member/message/count',
   },

   personalMine: {
     index: '/api/access/v1/user/member/message/count',
   },

   // 经纪人端
   brokerHome: {
     index: '/api/access/v1/user/member/message/count',
   },

   brokerMine: {
     index: '/api/access/v1/user/member/message/count',
   },
 }
 module.exports = {
   api: api
 }