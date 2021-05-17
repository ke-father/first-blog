// 引用express框架
const express = require('express');

// 创建路由
const admin = express.Router();

// get请求login页面
admin.get('/login', require('./admin/loginpage'));

// post请求login页面
admin.post('/login', require('./admin/login'));

// get请求user页面
admin.get('/user', require('./admin/userpage'));

//get请求logout页面
admin.get('/logout', require('./admin/logout'));

// get请求用户添加页面
admin.get('/user-edit', require('./admin/user-edit'));

// 用户添加提交功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 用户修改功能
admin.post('/user-modify', require('./admin/user-modify'));

// 用户删除功能
admin.get('/user-delete', require('./admin/user-delete'));

// 添加用户文章管理页面
admin.get('/article', require('./admin/article'));

// 用户文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

// 用户文章添加
admin.post('/article-add', require('./admin/article-add'));

// 用户文章修改功能
admin.post('/article-modify', require('./admin/article-modify'))

// 用户文章删除功能
admin.get('/article-delete', require('./admin/article-delete'))

// 开放admin
module.exports = admin;