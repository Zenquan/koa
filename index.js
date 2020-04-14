const Coa = require('./coa')

const app = new Coa()

app.use((req, res) => {
  res.end('hello world')
})

app.listen(3000, () => {
  console.log('this app is listen on 3000')
})