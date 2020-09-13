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
        code: '/api/access/v1/member/captcha/'
    },

    // 上传图片/视频
    upload: {
        imgUpload: '/api/v1/app/imgUpload',
        videoUpload: '/api/v1/app/imgUpload',
    },

    // 消息
    message: {
        messageList: '/api/access/v1/member/message/list',
        messageDetails: '/api/access/v1/member/message/details/',
    },

    // 用户端
    personalHome: {
        banner: '/api/v1/index/banner/list',
        icon: '/api/v1/index/icon/list',
        news: '/api/v1/index/news/list',
        articleClassify: '/api/access/v1/article/classify/list',//文章分类
        newsList: '/api/access/v1/news/list',
        postList: '/api/access/v1/post/list',
        newsDetail: (newsId)=>{ return `/api/access/v1/news/details/${newsId}`},
        postDetail: (postId)=>{return `/api/access/v1/post/details/${postId}`},
        addPost: '/api/access/v1/post/add',//发帖
        commentNewPost: '/api/access/v1/news/post/comment',//新闻或帖子评论
        commentReply: '/api/access/v1/comment/reply',//新闻或评论回复
        constructClassify: '/api/access/v1/house/construct/classify/list',//建筑类型列表
        metroList: '/api/access/v1/house/metro/line/list'//地铁配置列表
    },

    personalMine: {},

    // 经纪人端
    brokerHome: {},

    brokerMine: {},
}
module.exports = {
    api: api
}