// 用户请求login  post
// 引入用户集合
const { User } = require('../../model/user');
// 引入bcryptjs模块
const bcryptjs = require('bcryptjs')


const login = async (req, res) => {
    // 通过解构获得各个的值
    const {email, password} = req.body;

    // 二次验证
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', {
            msg: '你输入的信息错误'
        })
    }

    // 查询用户集合内用户email
    let userEmail = await User.findOne({email});

    // 查询到用户email
    if (userEmail) {

        // 使用bcryptjs.compareSync比对密码  返回  布尔值
        let isPwd = bcryptjs.compareSync(password, userEmail.password);

        // 查询用户密码  如果密码一致
        if (isPwd) {
            // 在req下面存储一个username属性
            req.session.username = userEmail.username;
            // 将用户角色存储在session属性下
            req.session.role = userEmail.role;

            // 在app.locals下存储用户信息  公开
            req.app.locals.userInfo = userEmail;

            // 判断用户类型
            if (userEmail.role == 'normal') {
                return res.redirect('/home/')
            }

            // res.send(userEmail)


            res.redirect('user');
        } else {
            // 用户密码错误
            res.status(400).render('admin/error', {
                msg: '用户账号或者密码输入错误'
            })
        }

    }else {
        // 未查询到用户email
        res.status(400).render('admin/error', {
            msg: '未查询到用户'
        })
    }

}

module.exports = login;