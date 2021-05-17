// user界面
// 导入用户集合
const { User } = require('../../model/user')

module.exports = async (req, res) => {

    // 创建标识
    req.app.locals.currentLink = 'user'

    // 接受用户传递过来的页面参数 req.query用于接收get参数
    let page = req.query.page;
    // 每页的用户展示个数
    let pagesize = 10;
    // 查询当前用户的数量总数
    let count = await User.countDocuments();
    // 总页数
    let total = Math.ceil(count / pagesize)

    // 展现数据位置
    let place = (page - 1) * pagesize;
    // 查询数据库中所有用户文档
    let users = await User.find().limit(pagesize).skip(place);

    res.render('admin/user', {
        users,
        page,
        total
    })
}

