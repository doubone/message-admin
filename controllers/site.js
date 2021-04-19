const { each } = require('bluebird');
const bluebird = require('bluebird');
const connectionModel = require('../models/connection');

var escapeHtml = function (str) {
	if (!str) return '';
	str = str.replace(/&/, '&amp;');
	str = str.replace(/</, '&lt;');
	str = str.replace(/>/, '&gt;');
	str = str.replace(/"/g, '&quto;');
	str = str.replace(/'/g, '&#39;');
	return str;
}

var escapeForJs = function (str) {
	if (!str) return '';
	str = str.replace(/\\/, '\\\\')//转义斜杠
	str = str.replace(/"/g, '\\"');
	JSON.stringify
	return str;

}


exports.index = async function (ctx, next) {
	
	// 创建数据库链接
	const connection = connectionModel.getConnection();

	const query = bluebird.promisify(connection.query.bind(connection));
	// 查询新闻列表
	const posts = await query(
		'select post.*,count(comment.id) as commentCount from post left join comment on post.id = comment.postId group by post.id limit 10'
	);
	//查询评论列表
	const comments = await query(
		'select comment.*,post.id as postId,post.title as postTitle,user.username as username from comment left join post on comment.postId = post.id left join user on comment.userId = user.id order by comment.id desc limit 10'
	);
 	await ctx.render('index',
		{
			posts,
			comments,
			from: escapeHtml(ctx.query.from) || '',
			fromForJs: escapeForJs(ctx.query.from || '')
		});
	connection.end();
};
var xssFilter = function (html) {
	if (!html) return '';
	// html = html.replace(/<\s*\/?script\s*>/g,'');
	// html = html.replace(/javascript:[^'"]*/g,'');
	// html = html.replace(/onerror\s*=\s*['"]?[^'"]*['"]?/g,'');
	// return html

	//白名单
	// var whiteList = {
	// 	'img': ['src'],
	// 	'font':['color','size'],
	// 	'a':['href']
	// };
	// var cheerio = require('cheerio');
	// var $ = cheerio.load(html);
	// $('*').each(function (index, elem) {
	// 	if (!whiteList[elem.name]) {
	// 		$(elem).remove();
	// 		return;
	// 	}
	// 	for (var attr in elem.attribs) {
	// 		if (whiteList[elem.name].indexOf(attr) === -1) {
	// 			$(elem).attr(attr, null);
	// 		}
	// 	}
	// })
	// return $.html()
	var xss = require('xss');
	var ret = xss(html);
	return ret;
	 


}
exports.post = async function (ctx, next) {
	try {
		console.log('enter post');

		const id = ctx.params.id;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		const posts = await query(
			`select * from post where id = "${id}"`
		);
		let post = posts[0];

		const comments = await query(
			`select comment.*,user.username from comment left join user on comment.userId = user.id where postId = "${post.id}" order by comment.createdAt desc`
		);
		// comments.forEach(comment => {
		// 	comment.content = xssFilter(comment.content)
		// });
		if (post) {
		await	ctx.render('post', { post, comments });
		} else {
			ctx.status = 404;
		}
		connection.end();
	} catch (e) {
		console.log('[/site/post] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};

exports.addComment = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		console.log(data)
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		const result = await query(
			`insert into comment(userId,postId,content,createdAt) values("${ctx.cookies.get('userId')||0}", "${data.postId}", "${data.content}",${connection.escape(new Date())})`
		);
		ctx.append("Sec-Fetch-Site","cross-site")
		if (result) {
			ctx.redirect(`/post/${data.postId}`);
		} else {
			ctx.body = 'DB操作失败';
		}
	} catch (e) {
		console.log('[/site/addComment] error:', e.message, e.stack);
		ctx.body = {
			status: e.code || -1,
			body: e.message
		};
	}
};
