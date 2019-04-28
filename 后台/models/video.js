var mongoose = require("mongoose");

var videoSchema = new mongoose.Schema({
    src: String,
    description: String,
    praise: Number,
    addTime: String
});

module.exports = mongoose.model("video", videoSchema);