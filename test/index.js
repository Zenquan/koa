/**
 * 1. Application 对象
 *    - use
 *    - listen
 * 2. async...await
 */
const Application = require('../src/Application')

const app = new Application()

app.use(async (ctx, next) => {
  res.end('hello world')
})

app.listen(3200, () => {
  console.log('this app is listen on 3200')
})