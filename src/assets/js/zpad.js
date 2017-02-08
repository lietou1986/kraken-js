/**
 * 广告平台
 * 后期更改为类模式
 */
var storeWithExpire = {
    set: function (key, val, exp) {
        store.set(key, { val: val, exp: exp, time: new Date().getTime() })
    },
    get: function (key) {
        var info = store.get(key)
        if (!info) { return null }
        if (new Date().getTime() - info.time > info.exp) { store.remove(key); return null; }
        return info.val;
    }
}

window.zpad = zpad = {
    url: 'http://bms.zhaopin.com/Publish/ZPBMS/ZHAOPINSEARCHRESULT4IN1.htm',
    data: 'nodata',
    callback: function () {

    },
    cacheTime: 1000 * 60 * 20,
    storeKey: 'zpadcache',
    init: function (callback, cacheTime) {
        if (callback)
            this.callback = callback;
        if (cacheTime)
            this.cacheTime = cacheTime;

        this.restore();
        if (this.data && this.data.length > 0) {
            if (this.data == 'nodata')
                return;
            this.render();
            return;
        }
        $.ajax({
            url: this.url, cache: false, success: function (body) {
                if (body && body.length >= 24) {
                    /*数据加工*/
                    if ((body.substr(0, 24) == '<!-- Begin ADS Block -->') &&
                        ((body.substr((body.Length - 24), 22) == '<!-- End ADS Block -->') ||
                            (body.substr((body.Length - 22), 22) == '<!-- End ADS Block -->'))) {
                        body = body.replaceAll('id=\'ads\'', 'class=\'no-resulte-adv\'');
                        body = body.replaceAll('ads', '');
                        return body;
                    }
                    zpad.data = body;
                }
                zpad.store();
                zpad.render();
            },
            error: function (e) {
                zpad.store();
            }
        })
    },
    store: function () {
        storeWithExpire.set(this.storeKey, this.data, this.cacheTime);
    },
    restore: function () {
        this.data = storeWithExpire.get(this.storeKey);
    },
    render: function () {
        if (this.callback) {
            this.callback(this.data);
        }
    }
}