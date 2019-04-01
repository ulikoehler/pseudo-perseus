const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const json = require('koa-json');
const {PseudoPerseusRenderer} = require('./renderer.js')
const router = new Router();

const renderer = new PseudoPerseusRenderer()

router.post("/api/version", async ctx => {
  ctx.body = {version: "1.x", name: "pseudo-perseus"};
});


router.post("/api/render-perseus", async ctx => {
    ctx.body = renderer.render(ctx.request.body.input);
});

const app = new Koa();
app.use(koaBody());
app.use(json());
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(9613);