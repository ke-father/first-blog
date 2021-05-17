// 引用express框架
const express = require('express');

// 创建路由
const home = express.Router();

// 博客首页
home.get('/', require('./home/index'));
home.get('/index', require('./home/index'));

//博客详情页
home.get('/article', require('./home/article'));

// 博客品论功能
home.post('/comment', require('./home/comment'))

home.get('/first', (res, req) => {
    res.send('数据')
})

// 开放home
module.exports = home;