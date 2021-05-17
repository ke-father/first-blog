//博客首页
const { Article } = require('../../model/article');
// 引入分页模块
const pagination = require('mongoose-sex-page')


module.exports = async (req, res) => {

    // 获取当前页
    let page = req.query.page;

    // 查找数据库数据
    let articles1 = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();

    // 将mongooseDocument转换成js object
    let articles2 = JSON.stringify(articles1);
    let articles = JSON.parse(articles2)

    // res.send(articles);

    res.render('home/default', {
        articles
    });
}