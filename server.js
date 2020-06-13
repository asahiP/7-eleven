const Koa = require('koa2')
const KoaStatic = require('koa-static')
const Bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const { join } = require('path')
const { readFileSync } = require('fs')

const app = new Koa()
const router = new Router()
const staticPath = './dist'
const port = 8080

router.get('/', async (ctx, next) => {
  let html = await readFileSync(join(staticPath ,'index.html'), 'binary')
  ctx.body = html
  await next()
})

app.use(Bodyparser())
app.use(KoaStatic(
  join(__dirname, staticPath)
))
app.use(router.routes())
app.listen(port)