//用户文章删除功能
const { Article } = require('../../model/article')

module.exports = async (req, res) => {
    // 获取id参数
    const { id } = req.query;

    // 查找数据库并删除数据
    await Article.findOneAndDelete({_id:id});

    // 重定向回用户列表页面
    res.redirect('article');
}