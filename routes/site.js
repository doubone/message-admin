const router = require('koa-router')()

const site = require('../controllers/site');
const captcha = require('../tools/captcha');
router.all('/*', async function(ctx, next){
	console.log('enter site.js');
	ctx.set('X-XSS-Protection',0)
	await next();
});


router.get('/', site.index);
router.get('/post/:id', site.post);
router.post('/post/addComment', site.addComment);
router.get('/post/addComment',site.addComment)
router.get('/captcha',captcha.captcha)

module.exports = router
