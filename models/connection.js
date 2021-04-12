var mysql      = require('mysql');

exports.getConnection = function(){
    let connection = mysql.createConnection({
		host: 'rm-uf65wc3756znc37oe0o.mysql.rds.aliyuncs.com',
		database: 'safety',
		user: 'licheng',
		password: 'Licheng@1234'
	});
    connection.connect();
    return connection;
}