var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
    style: String,
    descri: String,
    placeName: String,
    path: String,
    usename: String,
    score: Number,
    people: Number,
    city: String,
    addTime: {
        type:Date,
        default: new Date()
    },
    comment: [
        {
            pic: String,
            user: String,
            text: String,
            praise: Number,
            time: String,
            reply: Array
        }
    ],
});


// 在整个评论插入的方法
placeSchema.methods.commentInfo = function (obj, i) {
    // console.log(obj)
    // console.log(typeof(obj))
    this.comment.push(obj)
    this.save()
}

// 点赞数量增加的方法
placeSchema.methods.praiseChange = function (num, praise) {
    this.comment[num].praise = praise
    this.save()
    // console.log(this.comment[num].praise)
}
// 评论回复
placeSchema.methods.commentReply = function (num, commentReply) {
    this.comment[num].reply.push(commentReply)
    this.save()
}

module.exports = mongoose.model("place", placeSchema);