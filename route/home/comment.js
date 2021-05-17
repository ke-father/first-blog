// 博客评论功能
// 引入文章评论数据库
const { Comment } = require('../../model/comment');

module.exports = (req, res) => {
    // 获取req.body post参数
    const { uid, aid, comment } = req.body;

    // 向数据库中插入数据
    Comment.create({
        uid: uid,
        aid: aid,
        comment: comment,
        //当前时间
        time: new Date()
    })

    // res.send(req.body)

    res.redirect(`article?id=${aid}`)
}