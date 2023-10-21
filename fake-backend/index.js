// server.js
const jsonServer = require('json-server')
const customRoute = require('./routes.json');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()


// Add this before server.use(router)
server.use(jsonServer.rewriter(customRoute));
server.use(middlewares)
server.use(router)

// server.post('/v1/', )

server.listen(3000, () => {
  console.log('JSON Server is running')
})