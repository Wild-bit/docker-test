import Koa from 'koa';
import { initDb } from './config/database';
import { setupRoutes } from './routes';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const port = process.env.PORT || 3000;

// 使用中间件
app.use(bodyParser());

// 设置路由
setupRoutes(app);

// 初始化数据库
initDb()
  .then(() => {
    // 启动服务器
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
