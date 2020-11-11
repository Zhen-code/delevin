const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
const {getImageInfo} = require('../../../utils/util');
Page({
    data: {
        paddingTop:topHeight,
        bgColor: {
            "color": true,
            "border": true
        },
        name: '',
        newsDesc: '',
        painting:{},
        userId: '',
        agentId: '',
        avatar: '',
        nickName: '',
        phone: '',
        storeName: '',
        logo:'',
        phoneImg: '',
    },
    onLoad: function (options) {
        const info = wx.getStorageSync('info');
        getImageInfo(info.headImgUri).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
        getImageInfo('../../image/icon_logo_w@2x').then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
        getImageInfo('../../image/icon_phonecall_30@2x.png').then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        });
        console.log(options);
        const {articleId} = options;
        this.getNewsDetail(articleId);
    },
    getNewsDetail(id){
        http({
            url: api.personalHome.newsDetail(id),
            method: 'GET',
            params:{}
        }).then(res=>{
            console.log(res);
            this.setData({
                name: res.name,
                newsDesc: res.newsDesc
            })
        }).catch(err=>{
            console.log(err);
        })
    },
    getImage(e){
        console.log(e)
    }
});
