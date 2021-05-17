// 用户删除功能
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 获取get参数  id
    const { id } = req.query;

    // 查找并删除数据库信息
    await User.findOneAndDelete({_id: id});

    // 重定向会用户列表页面
    res.redirect('user');
}