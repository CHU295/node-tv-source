var express = require('express');
var request = require('request');
var app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/" + "index.html")     
});

//定义方法
app.get('/getUrl', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  request({
    url: 'http://share.egame.qq.com/cgi-bin/pgg_async_fcgi',//请求路径
    method: "POST",//请求方式，默认为get
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: {
      param: JSON.stringify({
        0: {
          module: 'pgg_live_read_svr',
          method: 'get_live_and_profile_info',
          param: {
            anchor_id: req.query.id,
            layout_id: 'hot',
            index: 1,
            other_uid: 0
          }
        }
      })
    },
  }, function (error, response, body) {
    const resp = JSON.parse(body)
    let url = ''
    try {
      const video_info = resp.data['0'].retBody.data.video_info
      const real_url = video_info.stream_infos[0].play_url.match(/([\w\W]+?)&uid=/)[1]
      url = real_url
    } catch (error) {
      url = '无法观看'
    }
    res.json({
      data: url
    })
  });
});

//定义端口
var server = app.listen(2901, function () {
  console.log('启动成功！端口号：' + 2901);
})