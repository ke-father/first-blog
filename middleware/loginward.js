// 请求拦截模块
const ward = (req, res, next) => {
    // 判断用户是否访问不是登录页面  且  用户未登录
    if (req.url != '/login' && !req.session.username) {
        // 重定向回登陆页面
        res.redirect('login');
    } else {
        // 判断用户角色
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }

        next();
    }
}

module.exports = ward;