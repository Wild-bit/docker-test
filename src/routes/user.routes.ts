import Router from '@koa/router';
import { UserController } from '../controllers/user.controller';

const router = new Router({ prefix: '/users' });

// 创建用户
router.post('/add', UserController.createUser);

// 获取所有用户
router.get('/', UserController.getAllUsers);

// 获取单个用户
router.get('/:id', UserController.getUserById);

export default router;