// 评论集合
const mongoose = require('mongoose');

// 指定评论规则
const commentSchema = mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: Date,
    comment: String
})

// 创建文章集合
const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
    Comment
}