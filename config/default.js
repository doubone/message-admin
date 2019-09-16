/** 
 * 设置配置信息
 */
const config = {
    //启动端口
    port: '3000',
    // 数据库配置
    dataBase: {
        host: '127.0.0.1',
        port: '3306',
        username: 'root',
        password: '123456',
        database: 'message'
    }

};
module.exports = config;