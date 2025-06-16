# docker-test
通过 docker 启动 node 后端项目 


## 启动
```bash 
# 后台启动服务（自动构建镜像，只在必要时）
docker-compose up -d

 # 强制重新构建所有镜像，然后启动服务（前台运行）
docker-compose up --build

# 强制重新构建 + 后台运行
docker-compose up --build -d
```

## 目录结构
```
docker-test/
├── docker-compose.yml
├── Dockerfile
├── README.md
├── docs/        # 文档目录
│   └── docker-command.md 
├── src/
│   ├── controllers/       # 控制器层：解析请求、调用 service、返回响应
│   │   └── user.controller.ts
│
│   ├── services/          # 服务层：业务逻辑处理（例如注册流程、权限判断）
│   │   └── user.service.ts
│
│   ├── models/            # 模型层：数据库模型、结构定义（ORM or schema）
│   │   └── user.model.ts
│
│   ├── routes/            # 路由层：请求路径配置，绑定 controller
│   │   └── user.routes.ts
│
│   ├── middlewares/       # 中间件层：鉴权、日志、异常处理等
│   │   └── auth.middleware.ts
│
│   ├── validators/        # 校验器：请求参数校验（如 zod/joi）
│   │   └── user.validator.ts
│
│   ├── utils/             # 工具函数、通用逻辑（如密码加密、token）
│   │   └── jwt.ts
│
│   ├── config/            # 配置项：env、DB连接、CORS设置等
│   │   └── database.ts
│
│   ├── constants/         # 常量定义，如错误码、角色定义等
│
│   ├── types/             # 类型定义（TS 项目）
│
│   ├── app.ts             # app 实例，配置中间件、路由挂载
│   └── main.ts            # 启动文件（监听端口、调用 app）
│
├── .env                   # 环境变量
├── package.json
└── tsconfig.json

```

## TODO
- [x] 配置 mysql
- [ ] 采用 推荐采用 现代分层架构，通常是基于 MCS（Model-Controller-Service）+ 其他辅助层 的结构


## 注意点 
- 当遇到 镜像 拉不下来 需要更换镜像源，国内镜像源 可以网上搜一搜
  - https://mirror.ccs.tencentyun.com
  - https://hub-mirror.c.163.com
  - https://mirror.baidubce.com
- 更换镜像源后，需要重新拉取镜像