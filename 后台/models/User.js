var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    pic: String,
    concern: Array,
    isAdmin: {
        type: Boolean,
        default: true
    },
   
    addTime: String
});

// 把喜欢地点的名字加进concern数组中
userSchema.methods.concernAdd = function (placeName) {
    // 去重复的数据
    if(this.concern) {
        let del = 0
        for (let i = 0; i < this.concern.length; i++) {
            if (this.concern[i] === placeName) {
                // console.log(this.concern[i])
                del ++
            }     
            // 循环下来，如果有相同数据，del!= 0,不把数据推进数据库 
        }
        if (del === 0) {
            this.concern.push(placeName)
            this.save()
        }
    }
    // console.log(this.concern)    
}
// 删除地点
userSchema.methods.concernDel = function (placeName) {
    for (let i = 0; i < this.concern.length; i++) {
        if (this.concern[i] === placeName) {
            // console.log(this.concern[i])
            this.concern.splice(i, 1)
        }
    }
    this.save()
    // console.log(this.concern)
}

module.exports = mongoose.model("user", userSchema);