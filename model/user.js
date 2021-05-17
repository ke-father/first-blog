// 创建用户集合模块
const mongoose = require('mongoose');
// 引入第三方模块joi  表单验证
const joi = require('joi');
// 引入bcryptjs密码加密模块
const bcryptjs = require('bcryptjs');

// 创建用户集合规则
const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: 2,
        maxlength: 10,
        require: true
    },
    email: {
        type: String,
        // unique  查询属性是否唯一
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    // 角色
    role: {
        type: String,
        require: true
    },
    // 状态
    state: {
        type: String,
        default: 0
    }
})

// 创建用户集合
const User = mongoose.model('User', userSchema);

// const pass =  bcryptjs.hashSync('123456', 10);
// const user =  User.create({
//     username: 'admin',
//     email: '123@qq.com',
//     password: pass,
//     role: 'admin',
//     state: 0
// })

// 用户表单数据验证
const validateuser = async (user) => {
    const schema = joi.object({
        username: joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
        email: joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: joi.number().valid(0, 1).required().error(new Error('状态值非法')),
    })

    // 进行验证
    return  schema.validateAsync(user);
}

// 开放用户集合
module.exports = {
    User,
    validateuser
};