// 文章集合
const mongoose = require('mongoose');
// 引入第三方模块joi  表单验证
const joi = require('joi');

// 指定创建规则
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 40,
        minlength: 4,
        require: [true, '请输入文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: [true, '请传入作者id']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})

// 创建文章集合
const Article = mongoose.model('Article', articleSchema);

// 文章验证
const validataArticle = async (article) => {
    const schema = joi.object({
        title: joi.string().min(4).max(40).required().error(new Error('文章标题不符合要求')),
        author: joi.string(),
        publishDate: joi.date().error(new Error('请选择时间')),
        cover: joi.object(),
        content: joi.string().trim().required().error(new Error('请输入文章内容'))
    })

    return schema.validateAsync(article);
}

// 开放文章集合
module.exports = {
    Article,
    validataArticle
}