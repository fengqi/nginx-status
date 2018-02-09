// pages/add/add.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        showView: false,
        host: {
            host: '',
            label: '',
            username: '',
            password: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var date = new Date();
        console.log(date.toLocaleString())
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        //
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        //
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        //
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        //
    },

    onChangeShowAuth: function (e) {
        this.setData({
            showView: e.detail.value
        })
    },

    formSubmit: function (e) {
        var host = e.detail.value
        var cacheKey = 'server_list'
        var server = wx.getStorageSync(cacheKey)
        
        if (!server) {
            server = {};
        }
        
        if (!host.label) {
            wx.showToast({
                title: 'Label不能为空',
                icon: "none"
            });
            return false;
        }

        server[host.label] = {
            host: host.host,
            label: host.label,
            username: host.username,
            password: host.password,
        }

        var that = this;
        wx.setStorage({
            key: cacheKey,
            data: server,
            success: function (e) {
                wx.showToast({
                    title: '添加成功',
                    icon: "success"
                });

                that.setData({
                    showView: false,
                    host: {},
                })
            },
            complete: function (e) {
                console.log(e)
            },
        })
    },

    formReset: function (e) {
        console.log('form发生了reset事件，携带数据为：', e.detail.value)
        this.setData({
            showView: false,
            host: {},
        })
    }
})