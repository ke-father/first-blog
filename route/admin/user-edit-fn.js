// 用户添加功能提交

// 引入加密模块
const bcryptjs = require('bcryptjs');
// 引入用户集合
const { User, validateuser } = require('../../model/user');

// 异步函数
module.exports = async (req, res, next) => {

    try {
        await validateuser(req.body)
    } catch (e) {
        // 如果已有邮箱注册 返回邮箱已注册
        // return res.redirect(`user-edit?message=${e.message}`);
        // 如果验证没有通过则重定向回用户添加页面  并且渲染错误  e.message  中  储存错误信息
        // JSON.stringify()  对象转字符串
        return next(JSON.stringify({
            path: 'user-edit',
            message: e.message
        }));
    }

    // 查询邮箱是否已注册  没有返回null      关于  数据库的操作是异步函数
    let user = await User.findOne({email: req.body.email});

    if (user) {
        // 如果已有邮箱注册 返回邮箱已注册
        return next(JSON.stringify({
            path: 'user-edit',
            message: '邮箱已注册！'
        }));
    }

    // 验证成功对用户密码进行加密
    const password = bcryptjs.hashSync(req.body.password, 10);

    // 替换已有密码
    req.body.password = password;

    // 将用户储存进入数据库
    await User.create(req.body);

    // 将页面重定向至用户列表页面
    res.redirect('user')
}