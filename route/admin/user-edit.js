// 请求用户添加页面
const { User } = require('../../model/user');

module.exports = async (req, res) => {

    // 创建标识
    req.app.locals.currentLink = 'user'

    // 使用req.query获取请求参数
    const { message, id } = req.query;
    console.log(message)

    // 如果有id属性
    if (id) {
        // 在用户集合中查询用户
        let user = await User.findOne({_id: id});

        res.render('admin/user-edit', {
            message,
            user,
            link: `/admin/user-modify?id=${id}`,
            button: '修改'
        });

    } else {
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '提交'
        });
    }


}