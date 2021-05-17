// 用户文章编辑
const { Article } = require('../../model/article');

module.exports = async (req, res) => {

    // 创建标识
    req.app.locals.currentLink = 'article'

    const { id,message } = req.query;

    if (id) {
        // 如果有id 进入修改页面
        let article = await Article.findOne({_id: id});

        // res.send(article)

        res.render('admin/article-edit', {
            article,
            message,
            link: `/admin/article-modify?id=${id}`,
            button: '修改'
        })


    } else {
        // 没有id进入提交页面
        res.render('admin/article-edit', {
            message,
            link: `/admin/article-add`,
            button: '提交'
        })

    }
}