// 用户文章修改页面
// 引入三方模块  解析 文件上传
const formidable = require('formidable');
// 引入path 路径
const path = require('path');
// 引入数据库与验证模块
const { Article,validataArticle } = require('../../model/article');

module.exports = (req, res, next) => {

    const id = req.query.id;

    // 创建表单解析实例
    const form = new formidable.IncomingForm();
    // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../../public', 'uploads');
    // 保存上传文件扩展名
    form.keepExtensions = true;
    // 对表单对象进行解析
    form.parse(req, async (err, fields, files) => {

        let articleFile = {};

        // for (let attr in files) {
        //     articleFile[attr] = files[attr];
        // }
        let filesCH = JSON.stringify(files);

        for (let attr in JSON.parse(filesCH)) {
            articleFile[attr] = files[attr];
        }

        for (let attr in fields) {
            articleFile[attr] = fields[attr];
        }

        // res.send(req.query)

        // 添加文章验证
        try {
            await validataArticle(articleFile)
        } catch (e) {
            // 如果已有邮箱注册 返回邮箱已注册
            // return res.redirect(`user-edit?message=${e.message}`);
            // 如果验证没有通过则重定向回用户添加页面  并且渲染错误  e.message  中  储存错误信息
            // JSON.stringify()  对象转字符串
            return next(JSON.stringify({
                path: `article-edit`,
                id: id,
                message: e.message
            }))
        }

        await Article.updateOne({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })

        res.redirect('article')

    })
}