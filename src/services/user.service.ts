import { pool } from '../config/database';
import { User, CreateUserResponse } from '../models/user.model';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class UserService {
  /**
   * 创建新用户
   */
  static async createUser(account: string, password: string): Promise<CreateUserResponse> {
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (account, password) VALUES (?, ?)',
      [account, password]
    );
    
    return {
      id: result.insertId,
      account,
      message: 'User created successfully'
    };
  }

  /**
   * 获取所有用户
   */
  static async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
    return rows as User[];
  }

  /**
   * 根据ID获取用户
   */
  static async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return rows.length ? rows[0] as User : null;
  }
}