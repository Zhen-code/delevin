import drawQrcode from '../../../miniprogram_npm/weapp-qrcode/index';
const topHeight = require('../../../request/topHeight.js').topHeight;
const {api} = require('../../../request/api');
const {http} = require('../../../request/http');
const {getImageInfo,to2Px} = require('../../../utils/util');

Page({
    data: {
        paddingTop:topHeight,
        bgColor: {
            "color": true,
            "border": true
        },
        title: '二维码分享',
        pageHome: false,
        backHome: true,
        imgPath: '',
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
        qrCodePath:'',
        bgImg: '',
        articlesId:''
    },
    onLoad: function (options) {
        const info = wx.getStorageSync('info');
        this.setData({
            userId: info.userId,
            agentId: info.agentId
        });
        getImageInfo(info.headImgUri).then(res=>{
            console.log(res)
            this.setData({
                avatar: res.path
            })
        }).catch(err=>{
            console.log(err)
        });
        getImageInfo('../../image/icon_logo_w@2x.png').then(res=>{
            console.log(res)
            this.setData({
                logo: '../../'+res.path
            })
        }).catch(err=>{
            console.log(err)
        });
        getImageInfo('../../image/bg_share_h667@2x.png').then(res=>{
            console.log(res)
            this.setData({
                bgImg: '../../'+res.path
            })
        }).catch(err=>{
            console.log(err)
        })
        console.log(options);
        const {articleId} = options;
        this.setData({
            articlesId:articleId
        })
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
        this.setData({
            imgPath: e.detail.tempFilePath
        });
        console.log(e)
    },
    drawCode(agentId,userId){
        const systemInfo = wx.getSystemInfoSync();
        const screenWidth = systemInfo.screenWidth;
        const that = this;
        let qrCodeCtx =  wx.createCanvasContext('myQrcode');
        drawQrcode({
            width: to2Px(screenWidth,220),
            height: to2Px(screenWidth,220),
            canvasId: 'myQrcode',
            ctx: qrCodeCtx,
            text: `https://dev.delevin.beiru168.com/aspectDetail?agentId=${agentId}&userId=${userId}&hideBack=true&articleId=${that.data.articlesId}`,
            callback: (e)=>{
                console.log(e)
                console.log('二维码')
                if(e['errMsg'].includes('ok')){
                    console.log('二维码绘制完成');
                    setTimeout(()=>{
                        wx.canvasToTempFilePath({
                            canvasId: 'myQrcode',
                            quality: 1,
                            success: (res) => {
                                console.log(res)
                                this.setData({
                                    qrCodePath: res.tempFilePath
                                },()=>{
                                    that.eventDraw(that.data.bgImg,that.data.avatar,that.data.logo,res.tempFilePath,that.data.name,that.data.newsDesc);
                                })
                            },
                            fail: (err) => {
                                console.log(err)
                            }
                        })
                    },1000)
                }else{
                    wx.showToast({
                        title: '二维码生成失败，请重新再试!'
                    })
                }
            }
        });
    },
    eventDraw(bgImg,avatar,logo,qrCodePath,name,newsDesc){
        this.setData({
            painting:{
                width: 750,
                height: 1334,
                clear: true,
                views: [
                    {
                        type: 'image',
                        url: bgImg,
                        top: 0,
                        left: 0,
                        width: 750,
                        height: 1334
                    },
                    {
                        type: 'image',
                        url: avatar,
                        top: 196,
                        left: 32,
                        width: 100,
                        height: 100
                    },
                    {
                        type: 'image',
                        url: logo,
                        top: 86,
                        left: 522,
                        width: 184,
                        height: 46
                    },
                    {
                        type: 'rect',
                        background: '#FFFFFF',
                        top: 336,
                        left:32,
                        width: 686,
                        height: 532
                    },
                    {
                        type: 'text',
                        content: name,
                        fontSize: 48,
                        color:'#333333',
                        textAlign: 'left',
                        top: 372,
                        left: 72,
                        lineHeight: 66,
                        width: 606,
                        MaxLineNumber: 2,
                        breakWord: true,
                        bolder: true
                    },
                    {
                        type: 'text',
                        content: newsDesc,
                        fontSize: 32,
                        color:'#666666',
                        textAlign: 'left',
                        top: 528,
                        left: 72,
                        lineHeight: 50,
                        width: 606,
                        MaxLineNumber: 6,
                        breakWord: true,
                        bolder: true
                    },
                    {
                        type: 'rect',
                        background: '#FFFFFF',
                        top: 930,
                        left:264,
                        width: 220,
                        height: 220
                    },
                    {
                        type: 'image',
                        url: qrCodePath,
                        top: 946,
                        left: 280,
                        width: 188,
                        height: 188
                    },
                    {
                        type: 'text',
                        content: '识别小程序码查看更多房源资讯',
                        fontSize: 28,
                        color:'#333333',
                        textAlign: 'left',
                        top: 1174,
                        left: 180
                    }
                ]
            }
        })
    },
    onShow() {
        this.drawCode(this.data.agentId,this.data.userId);
    }
});
