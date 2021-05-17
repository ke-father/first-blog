// 引用express框架
const express = require('express');
// 引入path模块
const path = require('path')
// 引入三方模块body-parser
const bodyParser = require('body-parser');
// 引入三方模块session
const session = require('express-session');
// 引入三方模块 dataformat 处理时间
const dateFormat = require('dateformat');
// 引入三方模块 morgan  打印请求信息
const morgan = require('morgan');
// 引入三方模块 config 处理系统配置
const config = require('config');
// 引入模板引擎 art-template
const template = require('art-template');
// 引入数据库模块
require('./model/connect');
// 接收用户集合
const user = require('./model/user');

// 接受路由对象
const home = require('./route/home');
const admin = require('./route/admin');

// 设置服务器
const app = express();

// 配置session模块
app.use(session({secret: 'secret key', saveUninitialized: false, cookie: {maxAge: 24 * 60 * 60}}));

// 配置全局  使用bodyParser.urlencoded方法  在res下创建body方法 储存post参数
app.use(bodyParser.urlencoded({extended: true}));

// 向模板开放dateformat
template.defaults.imports.dateFormat = dateFormat;

// 配置模板路径
app.set('views', path.join(__dirname,'views'));
// 配置模板后缀
app.set('view engine', 'art');
// 配置模板渲染引擎
app.engine('art', require('express-art-template'));

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 获取当前环境信息
console.log(config.get('title'));

// console.log(process.env)
// 判断当前环境  是开发环境还是生产环境
if (process.env.NODE_ENV == 'development') {
    //当前是开发环境  development
    app.use(morgan('dev'))
    // console.log('当前是开发环境')
} else {
    //当前是生产环境 production
    // console.log('当前是生产环境')

}

// 设置请求拦截
app.use('/admin', require('./middleware/loginward'))

// 创建一级路由
app.use('/home', home);
app.use('/admin', admin);

// 添加错误处理中间件
app.use((err, req, res, next) => {
    // 将传递回的字符串参数转换为对象
    let result = JSON.parse(err);

    // 用于储存字符串拼接
    let parmas = [];

    // 遍历result
    for (let attr in result) {
        // 将属性名不是path的属性进行拼接
        if (attr != 'path') {
            // 拼接成 例如: message='这是message的值'
            parmas.push(attr + '=' + result[attr]);
        }
    }
    
    // 将parmas数组中的值使用join方法 以 & 拼接
    res.redirect(`${result.path}?${parmas.join('&')}`);
})

// 监听80端口
app.listen(80);

console.log('服务器已开启')