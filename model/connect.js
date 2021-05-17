// 数据库链接模块
const mongoose = require('mongoose');
// 引入三方模块 config 处理系统配置
const config = require('config');

// 数据库链接
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}/${config.get('db.name')}`, { useUnifiedTopology: true, useNewUrlParser: true  })
    .then(() => console.log('数据库链接成功'))
    .catch(() => console.log('数据库链接失败'))