
// var file = require("../models/file.js");
var formidable = require("formidable");
var express = require("express");
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");
// var routerOne = express.Router();
var mongoose = require("mongoose");

var User = require("../models/User");
var video = require("../models/video");
var place = require("../models/place");
// var concern = require("../models/concern");

// 1、登录页面 —— finished
exports.login = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        var username = fields.username;
        var password = fields.password;
        // 查找数据
        User.findOne({ "username": username }, function (err, result) {
            // 密码配对
            if (result != null && password == result.password) {
                req.session.login = "1";
                req.session.users = result;
                // console.log(req.session);
                res.json(result);
            } else {
                res.json('没有这个帐号！')    
            }
        })
    });

},

// 2、注册页面 —— finished
exports.register = function (req, res)  {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        console.log(fields)
        var responseData = {
            code: 0, //为零，请求成功  1，2，3，4，5，6，7，8
            message: "" //信息提示
    };
        // 注册时间
        var ttt = sd.format(new Date(), "YY.MM.DD HH.mm.s");

        var username = fields.username;
        var password = fields.password;
        // console.log(username);

        // 1.用户名不能为空
        if (username == "") {
            responseData.code = "1";
            responseData.message = "用户名不能为空";
            res.json(responseData);
            return;
        }

        // 密码不能为空
        if (password == "") {
            responseData.code = "2";
            responseData.message = "密码不能为空";
            res.json(responseData);
            return;
        }

        // 注册用户
        User.findOne({
            username: username
        }).then(function (userInfo) {
            if (userInfo) {
                //表示数据库有该数据
                responseData.code = "3";
                responseData.message = "用户名已被注册";
                res.json(responseData);
                return;
            }
            // 保存用户名
            var user = new User({
                username: username,
                password: password,
                addTime: ttt
            })
            return user.save();
        }).then(function (newUserInfo) {
            responseData.message = "注册成功";
            res.json(responseData);
        })

    })
},

// 3、大致展示页面  —— finished
exports.showPic = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        place.find().then(function (result) {
            res.json({message: result })
        })
    });
},

// 5、评分页面  —— finished
exports.score = function (req, res) {
    var reback = req.query
    // console.log(reback)
    var avgScore
    // 1、查找数据库数据
    place.findOne({placeName: reback.placeName}).then(function (result) {
        // console.log(result) ——查询到数据库信息是什么
        avgScore = (result.score * result.people + parseInt(reback.score) )
                     / (result.people + 1)
        // 保留评分两位小数
        avgScore = avgScore.toFixed(2)
        people = result.people + 1
        // 2、插入数据到数据库
        place.updateMany({ placeName: reback.placeName }, {
            score: avgScore,
            people: people 
        }).then(function (err) {
            res.json({ message: 'success' })
        })
    })
},

// 6(1)评论 —— 添加评论页面  —— finished
exports.commentAdd = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        // var comment = fields.data.comment
        var newReply = fields.data.newReply[0]
        // console.log(newReply)
        // 修改时间 
        var time = sd.format(new Date(), "YY.MM.DD HH.mm.s");
        newReply.time = time
        var placeName = fields.data.placeName
        var i = fields.data.index
        // console.log(newReply)
        place.findOne({placeName: placeName}).then(function (result) {
            // console.log(result.comment[0])
            result.commentInfo(newReply, i)
        })
        res.json({ message: 'success' })
    });
},

// 6(2)评论 —— 添加回复页面  - finished
exports.commentReply = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        var user = fields.data.user
        var placeName = fields.data.placeName
        var i = fields.data.index
        commentReply = fields.data.commentReply[0]

        // console.log(fields)
    
        place.findOne({ placeName: placeName }).then(function (result) {
            // 引用方法，处理数组
            result.commentReply(i, commentReply)
            
        })
        res.json({ message: 'success' })
    });
},
// 6(3)评论 —— 点赞页面  —— finished
exports.commentPraise = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        var i = fields.data.index
        // console.log(i)
        var placeName = fields.data.placeName
        // 接受从前端传递过来的值
        var praise = fields.data.praise
        // console.log(praise)
        // var user = fields.data.user
        // 查找对应的数据
        place.findOne({ placeName: placeName }).then(function (result) {
            // var praise = result.comment[i].praise + 1
            result.praiseChange(i, praise)
        })
        res.json({ message: 'success' })
    });
},

// 7、视频展示页面 —— finished
exports.video = function (req, res) {
    video.find().then(function (result) {
        res.jsonp( { video: result })
        // console.log(req.session.username)
        // console.log(result)
    })
},

// 8.1、在显示页面进行收藏 —— finished
exports.collect = function (req, res) {
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
        // console.log(fields)
        var placeName = fields.item.placeName
        var username = fields.username
        User.findOne({ username: username }).then(function (result) {
            result.concernAdd(placeName)
            // console.log(result)
        
        })
        res.json({message:'收藏成功！'})
    });
},

// 8.2、收藏页面显示你收藏的地点  - finished
exports.concern = function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
          if(fields.username !== undefined){
              User.findOne({ username: fields.username }).then(function (result) {
                  var placeAll = result.concern
                  place.find({ placeName: placeAll }).then(function (result) {
                      // console.log(result)
                      res.json(result)
                  })
              })
          }
    });
},

// 8.3、收藏页面删除功能 —— finished
exports.del = function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw new Error("错误信息");
        }
    //    console.log(fields)
        User.findOne({ username: fields.username }).then(function (result) {
            // console.log(result.concern)
            result.concernDel(fields.placeName)
            res.json({message:'aaa'})
        })
    });
},

// 9、上传地点 —— finished
exports.sharePlace = function (req, res) {
    if (req.url == "/favicon.ico") {
        return;
    }
    var form = new formidable.IncomingForm();
    // console.log(form.uploadDir)
    form.uploadDir = "./picKeep";
    // console.log(form.uploadDir)
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        console.log(fields);
        // console.log(files);
        // 判断图片大小
        var size = parseInt(files.file.size / 1024 / 1024);
        // 删除本地图片
        if (size > 2) {
            fs.unlink("./" + files.file.path, function (err) {
                res.send("图片超出2m");
                return;
            })
        }
        // 时间戳
        var ttt = sd.format(new Date(), "YY.MM.DD HH.mm.s");
        // 后缀名
        var extname = path.extname(files.file.name);
        var oldpath = "./" + files.file.path;
        var newName = "/Users/apple/WebstormProjects/workSpace/gradution/static/img/uploads"
        var newpath = path.normalize(newName + "/" + fields.style + "/" + ttt + extname);
        // console.log(newpath)
        var picName = "/static/img/uploads/" + fields.style + "/" + ttt +extname
        console.log(picName)
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
        })
        // 把相关的数据上传到数据库中
        place.create({ "style": fields.style, "descri": fields.description, "placeName": fields.address,
         "path": picName, "username": fields.username, "score": 0, "people": 0, "city": fields.city },
          function (err) {
            console.log("保存成功");
        }); 
        res.json({ message: '上传成功！'})
    });
  
}
// 10、编辑资料  - finished
exports.set = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./picKeep";
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        // console.log(fields)
        var size = parseInt(files.file.size / 1024 / 1024);
        // 删除本地图片
        if (size > 2) {
            fs.unlink("./" + files.file.path, function (err) {
                res.send("图片超出2m");
                return;
            })
        }
        // 时间戳
        var ttt = sd.format(new Date(), "YY.MM.DD_HH.mm.s");
        // 后缀名
        var extname = path.extname(files.file.name);
        var oldpath = "./" + files.file.path;
        var newName = "/Users/apple/WebstormProjects/workSpace/gradution/static/img/uploads"
        var newpath = path.normalize(newName + "/set"  + "/" + ttt + extname);
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
        })
        // 数据库储存的图片路径
        dataName = "/static/img/uploads/set/" + ttt + extname
        // console.log(fields)
        var username = fields.user
        // console.log(username)
        User.updateOne({ username: username }, {
            pic: dataName,
        }).then(function () {
            res.json({ message: '上传图片成功！' })
        })
    });

}


