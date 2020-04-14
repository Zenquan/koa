const http = require('http')

class Coa {
  constructor() { 
    this.middlewares = []
  }
  use (middleware) {
    this.middlewares.push(middleware)
  }
  listen(...args) {
    const server = http.createServer(this.middlewares.pop())
    server.listen(...args)
  }
}

class Context {
  constructor(req, res) {
    this.req = req
    this.res = res
  }
}

module.exports = Coa