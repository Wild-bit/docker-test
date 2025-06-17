import { Context } from 'koa';
import { UserService } from '../services/user.service';
import { CreateUserRequest } from '../models/user.model';

export class UserController {
  /**
   * 创建用户
   */
  static async createUser(ctx: Context): Promise<void> {
    try {
      const { account, password } = ctx.request.body as CreateUserRequest;
      
      if (!account || !password) {
        ctx.status = 400;
        ctx.body = { error: 'account and password are required' };
        return;
      }
      
      const result = await UserService.createUser(account, password);
      
      ctx.status = 201;
      ctx.body = result;
    } catch (error) {
      console.error('Error creating user:', error);
      ctx.status = 500;
      ctx.body = { error: 'Internal Server Error' };
    }
  }

  /**
   * 获取所有用户
   */
  static async getAllUsers(ctx: Context): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      ctx.body = users;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * 根据ID获取用户
   */
  static async getUserById(ctx: Context): Promise<void> {
    try {
      const id = parseInt(ctx.params.id, 10);
      
      if (isNaN(id)) {
        ctx.status = 400;
        ctx.body = { error: 'Invalid user ID' };
        return;
      }
      
      const user = await UserService.getUserById(id);
      
      if (!user) {
        ctx.status = 404;
        ctx.body = { error: 'User not found' };
        return;
      }
      
      ctx.body = user;
    } catch (error) {
      ctx.status = 500;
      ctx.body = { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}