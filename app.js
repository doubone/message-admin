const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// error handler
onerror(app)


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))



// app.use(async (ctx)=>{
//   let res= await Mysql.query();
//   ctx.body={
//     "code":200,
//     "data":res,
//     "msg":'ok'
//   }
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const routes = ['site','users'];
routes.forEach((route)=>{
  app.use(require(`./routes/${route}`).routes())
})




// const Pug = require('koa-pug');
// new Pug({
//   app,
//   viewPath:'./views'
// })

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
