function baiduTranslate(appId, secret, query, to, cb) {
    var salt = (new Date).getTime();
    var str1 = appId + query + salt + secret;
    var sign = MD5(str1);
    $.ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        type: 'POST',
        dataType: 'jsonp',
        data: {
            q: query,
            appid: appId,
            salt: salt,
            from: 'auto',
            to: to || 'zh',
            sign: sign
        },
        success: function (data) {
            // console.log(data);
            cb && cb(data)
        }
    });
}
