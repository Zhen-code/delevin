// components/uploader/index.js
const api = require('../../request/api').api;
const domain = require('../../request/http.js').domain;
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        disable: true,
        videoUrl: '',
        fileList:[]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        afterRead(event) {
            var that = this;
            const {file} = event.detail;
            let path = file.path;
            console.log(file)
            console.log(path)
                wx.uploadFile({
                    url: domain+api.upload.imgVideoUpload, // 仅为示例，非真实的接口地址
                    filePath: path,
                    name: 'file',
                    success: (response) => {
                        console.log(response);
                        let res = JSON.parse(response.data);
                        console.log(res)
                        if(res.code === 200){
                            console.log(res.data['fileUri'])
                            that.setData({
                                videoUrl: res.data['fileUri'],
                                fileList: [{url: res.data['fileUri']}]
                            });
                            that.triggerEvent('getVideoUrl',{e:res.data['fileUri']});
                        }
                    },
                    fail(err) {
                        console.log(err)
                        wx.showToast({
                            title: '上传失败！',
                            icon: 'none',
                            duration: 1000
                        })
                    }
                });
        },
        deleteImg(e) {
            console.log(e)
            let {
                index
            } = e.detail;
            let {
                fileList
            } = this.data;
            fileList.splice(index, 1);
            this.setData({
                fileList
            })
        },
    }
})
