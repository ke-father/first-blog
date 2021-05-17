// 退出
module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function () {
        // 输出cookie
        res.clearCookie('connect.sid');
        // 重定向回登陆页面
        res.redirect('login');
        //退出清空userInfo
        req.app.locals.userInfo = '';
    })
}