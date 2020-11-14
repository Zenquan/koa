const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'ok'
  }

  await next()
})

app.use(async (ctx, next) => {
  ctx.body = {
    code: 0,
    msg: 'ok'
  }
  console.log('1>>>');
  await next()
  console.log('3>>>');
})

app.use(async (ctx, next) => {
  console.log('2>>>');
  await next()
  console.log('4>>>');
})


// 1\2\4\3
app.listen(520, () => {
  console.log(`this app is listening on 3000`)
})