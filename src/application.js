const http = require('http'),
  Event = require('events'),
  compose = require('./compose'),
  context = require('./context'),
  request = require('./request'),
  response = require('./response');

class Application extends Event {
  constructor(props) { 
    super(props)
    this.middlewares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  use (middleware) {
    if (typeof fn !== 'function') throw new TypeError('middleware should be a function!');
    this.middlewares.push(middleware);
    return this;
  }
  listen (...args) {
    /**
     * http.createServer(callback)
     */
    const server = http.createServer(this.callBack());
    server.listen(...args);
  }
  callBack () {
    /**
     * 1. 封装一下ctx对象
     * 2. 处理请求
     */
    const fn = compose(this.middlewares);
    const handleRequest = ( req, res ) => {
      const ctx = this.createContext(req, res);
      this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }
  createContext (req, res) {
    const context = Object.create(this.context),
      request = context.request = Object.create(this.request),
      response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
  } 
  handleRequest (ctx, fn) {
    /**
     * 1. 处理请求，返回状态码
     * 2. 返回http响应的内容
     */
    const res = ctx.res;
    res.status = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => this.respond(ctx);
    return fn(ctx).then(handleResponse).catch(onerror);
  }
  respond(ctx) {
    const body = ctx.body,
      res = ctx.res;
    return res.end(body);
  }
}

module.exports = Application;