
//mysql.js 

var mysql = require('mysql')
var config = require('../config/default');

var pool = mysql.createPool({
    host: config.dataBase.host,
    user: config.dataBase.username,
    password: config.dataBase.password,
    database: config.dataBase.database
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    })
}

//注册用户

let insertData = function(value){
    let sql = ""
}