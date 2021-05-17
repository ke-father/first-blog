// 用户文章管理
const { Article } = require('../../model/article');
// 引入mongoose-sex-page 三方模块 处理分页
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let pages = req.query.page;

    // 创建标识
    req.app.locals.currentLink = 'article'

    let articles = await pagination(Article).find().page(pages).size(2).display(8).populate('author').exec();

    let articles1 = JSON.stringify(articles);
    let articles2 = JSON.parse(articles1)

    // res.send(articles)

    res.render('admin/article', {
        articles2
    });
}