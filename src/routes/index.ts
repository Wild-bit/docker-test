import Koa from 'koa';
import Router from '@koa/router';
import userRoutes from './user.routes';

const rootRouter = new Router();

// 根路由
rootRouter.get('/', (ctx) => {
  ctx.body = { message: 'Hello from Docker Koa with MySQL!' };
});

/**
 * @TODO 可以考虑将所有路由文件放在一个文件夹中，然后使用递归的方式加载所有路由文件-路由加载中间件
 * 设置所有路由
 */
export function setupRoutes(app: Koa): void {
  // 使用根路由
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods());

  // 使用用户路由
  app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

  // 这里可以添加更多路由...
}
