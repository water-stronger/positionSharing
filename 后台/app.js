var express = require("express");
var ejs = require("ejs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var formidable = require("formidable");
var routerOne = express.Router();

var router = require("./controller");

// 注册功能
// 统一放回数据格式
var responseData;
routerOne.use(function (req, res, next) {
    responseData = {
        code: 0, //为零，请求成功  1，2，3，4，5，6，7，8
        message: "" //信息提示
    };
    next();
})

var app = express();

app.use(express.static("./public"));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
// 数据调试代码
app.get("/api", function (req, res) {
    var aaa = req.query
    var bbb = 'success'
    console.log(aaa)
    res.jsonp({ bbb })
    // 如果这样写的话，会把前端的东西也重新传递回去 ——  res.jsonp({ aaa })
    res.end('success')
})

app.engine("html", ejs.__express);
app.set("view engine", "html");

// 1、登录页面
app.post("/api/login",router.login);
// 2、注册页面
app.post("/api/register",router.register);
// 3、大致展示页面
app.post("/api/showPic",router.showPic);
// 5、评分页面
app.get("/api/score",router.score);
// 6、全部评论展示页面
app.post("/api/commentAdd",router.commentAdd);
app.post("/api/commentReply", router.commentReply);
app.post("/api/commentPraise", router.commentPraise);
// 7、视频展示页面
app.get("/api/video",router.video);
// 8.1、在显示页面进行收藏
app.post("/api/collect", router.collect);
//8.2、收藏页面显示你收藏的地点
app.post("/api/concern", router.concern)
// 8.3、收藏页面删除功能
app.post("/api/del", router.del)
// 9、上传地点
app.post("/api/share", router.sharePlace);
// 10、编辑资料
app.post("/api/set",router.set);

// 连接数据库
mongoose.connect("mongodb://localhost:27017/graduation", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log("数据库连接失败");
    } else {
        app.listen("3000", () => console.log("服务器开启成功,请访问:http://172.20.10.2:3000"));
    }
});