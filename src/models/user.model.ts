// 用户模型接口
export interface User {
  id: number;
  account: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// 创建用户时的请求体接口
export interface CreateUserRequest {
  account: string;
  password: string;
}

// 创建用户后的响应接口
export interface CreateUserResponse {
  id: number;
  account: string;
  message: string;
}
