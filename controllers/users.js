
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
        // const result = await connection.query(`select * from user where
        // username = '${data.username}'
        // and password = '${data.password}'`)
        // console.log(result)

        // const query = bluebird.promisify(connection.query.bind(connection));
        const query = connection.query
        
		const results = await connection.query(`select * from user where username = '${data.username}' and password = '${data.password}'`);
        console.log(results)
    } catch (err) {
        console.log(err)
    }
}