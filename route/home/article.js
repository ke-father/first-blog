// 博客详情页面
// 引入数据库
const { Article } = require('../../model/article');
// 引入评论
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 获取get参数id
    const id = req.query.id;
    // console.log(id)

    // 查询数据库
    const articles = await Article.findOne({_id: id}).populate('author').lean();
    // 查询评论数据库
    const comments = await Comment.find({aid: id}).populate('uid').lean()

    // res.send(articles)
    // res.send(comments)

    res.render('home/article', {
        articles,
        comments
    });
}
