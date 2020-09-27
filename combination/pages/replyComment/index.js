const topHeight = require('../../../request/topHeight.js').topHeight;
const {http} = require('../../../request/http');
Page({
    data: {
        commentValue: '',
        disable:true,
        paddingTop: topHeight,
        bgColor: {
            "color": true,
            "border": true
        },
        placeholder: ''
    },
    timeFlag: '',
    fatherId: '',
    targetId: '',
    type:'',
    commentInput(e){
            let {value} = e.detail;
            if(value===''||value===null){
                this.setData({
                    disable:true
                });
            }else{
                this.setData({
                    commentValue:value,
                    disable:false
                })
            }
    },
    go(){
        let {commentValue} = this.data;
        if(commentValue === '' || !commentValue || commentValue===undefined) return;
        if(this.type==='posts'){
            console.log('post')
            http({
                url: '/api/access/v1/comment/reply',
                method: 'POST',
                params:{
                    "content": commentValue,
                    "fatherId": this.fatherId,
                    "targetId": this.targetId,
                    "type": "POST"
                }
            }).then(res=>{
                console.log(res)
                wx.navigateBack({
                    delta: 1
                });
            }).catch(err=>{
                console.log(err)
            })
        }else if(this.type === 'news'){
            console.log('new')
            http({
                url: '/api/access/v1/comment/reply',
                method: 'POST',
                params:{
                    "content": commentValue,
                    "fatherId": this.fatherId,
                    "targetId": this.targetId,
                    "type": "NEWS"
                }
            }).then(res=>{
                console.log(res)
                wx.navigateBack({
                    delta: 1
                });
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    onLoad: function (options) {
        console.log(options);
        let {fatherid,targertid,nickName,type} = options;
        this.fatherId = Number(fatherid);
        this.targetId = Number(targertid);
        this.type = type;
        let placeholder = '回复@'+nickName;
        this.setData({
           placeholder
        });
    }
});
