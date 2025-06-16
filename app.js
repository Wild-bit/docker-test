const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

router.get("/", (ctx) => {
  ctx.body = { message: "Hello from Docker Koa!" };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
