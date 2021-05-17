// 用户修改功能
// 引入用户集合文件
const { User } = require('../../model/user');
// 引入bcryptjs模块
const bcryptjs = require('bcryptjs');

module.exports = async (req, res, next) => {
    // 获取get参数
    const id = req.query.id;
    //获取post参数
    const { username, email, password, role, state } = req.body;

    // 查询用户
    const user = await User.findOne({_id: id});

    // 比对密码
    let comParePwd = bcryptjs.compareSync(password, user.password);

    if (comParePwd) {
        // 密码比对成功
        // 修改数据库用户信息
        await User.updateOne({_id: id} , {
            username,
            email,
            role,
            state
        })

        res.redirect('user')

    } else {
        // 密码比对失败
        let obj = {path: '/admin/user-edit', message: '密码输入错误', id: id}

        next(JSON.stringify(obj));
    }
}