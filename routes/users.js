const router = require('koa-router')()
const users = require('../controllers/users.js')
router.prefix('/user')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// router.get('/login',async(ctx,next)=>{
//   await ctx.render('login')
  
// })
router.get('/login',users.login)
router.post('/login',users.doLogin)

module.exports = router
