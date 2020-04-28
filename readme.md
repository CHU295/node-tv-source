使用nodejs搭建服务器，获取企鹅直播斗鱼TV直播源并网页在线播放

[github](https://github.com/CHU295/node-tv-source)

[在线demo](http://118.25.55.180:2901/)

# 由来
作为一个前端，不用用nodejs真的是浪费啊

需求来源为平时看直播斗鱼什么的网页太卡，还偷偷挖矿

所有萌生了自己搞的想法（能看就行）

# 思路
其实这玩意很简单，大致就分两块
- 直播源
- 播放

直播源直接去它们网站找即可，然后就是播放，很多播放器都支持的

如果是网页的话可以用大神的flv.js

至于上面提到的nodejs服务端接口，是因为获取直播源的接口会有跨域等等限制，浏览器端无法完成，所以需要使用nodejs搭建服务端完成

# 使用步骤
```
npm i express request
node server.js
```
打开网页`localhost:2901` 即可体验
# nodejs服务端搭建
使用express便捷搭建，代码也很简洁
```
var express = require('c');
var request = require('request');
var app = express();
app.get('/getUrl', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // 跨域
  if (req.method == 'OPTIONS') {
    res.send(200);
  }
  request({}, function (error, response, body) {
    res.json({})
  });
});

//定义端口
var server = app.listen(2901, function () {
  console.log('启动成功！端口号：' + 2901);
})
```
