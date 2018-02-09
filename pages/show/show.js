// pages/show/show.js

var timer;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        label: '',
        host: {},
        status: {
            active_connections: 0,
            server: 0,
            accepts: 0,
            handled: 0,
            lost: 0,
            reading: 0,
            writing: 0,
            waiting: 0
        },
        orig: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onLoad');

        wx.setNavigationBarTitle({
            title: options.title,
        });

        var server = wx.getStorageSync('server_list');
        this.setData({
            host: server[options.title]
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('onReady')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (options) {
        // console.log('onShow')
        wx.showLoading({
            title: '加载中'
        })

        var that = this;
        var status = {};
        timer = setInterval(function() {
            that.requestNginxStatus(that.data.host, function (data) {
                wx.hideLoading();
                that.setData({
                    status: data
                });
            });
        }, 1500);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log('onHide')
        clearTimeout(timer);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearTimeout(timer);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 请求 nginx status 数据
     */
    requestNginxStatus: function (host, callback) {
        console.log('request');
        wx.request({
            url: 'https://nginx-status.fengqi.me/proxy?url=' + host.host,
            method: 'GET',
            responseType: 'text',
            success: function (res) {
                var status = res.data.split(" ");
                callback({
                    active_connections: status[2],
                    server: status[9],
                    accepts: status[7],
                    handled: status[8],
                    lost: status[7] - status[8],
                    reading: status[11],
                    writing: status[13],
                    waiting: status[15],
                });
            },
            fail: function () {
                clearInterval(timer);
                wx.hideLoading();
            }
        });
    }
})