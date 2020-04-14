const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'ok'
  }

  await next()
})

app.listen(3000, () => {
  console.log(`this app is listening on 3000`)
})