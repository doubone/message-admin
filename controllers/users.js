
const connectionModel = require('../models/connection')
const bluebird = require('bluebird');

exports.login = async function (ctx, next) {
    await ctx.render('login')
}
exports.doLogin = async function (ctx, next) {
    try {
        const data = ctx.request.body;
        // 参数校验
        // 链接数据库查询
        const connection = connectionModel.getConnection()
        const query = bluebird.promisify(connection.query.bind(connection));
        const results = await query(`select * from user where username = '${data.username}' and password = '${data.password}'`);
        if (results.length) {
            let user = results[0];
            //登录成功，设置cookie
            ctx.cookies.set('userId', user.id, { httpOnly: false, sameSite: "none", secure: false });
            ctx.body = {
                code: 200,
                data: {
                    id: user.id,
                    name: user.name
                }
            }
        } else {
            throw new Error('登录失败，请稍后再试')
        }
        connection.end();
    } catch (err) {
        console.log(err)
    }
}