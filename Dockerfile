# 使用Node.js官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 全局安装pnpm
RUN npm install -g pnpm

# 复制package.json
COPY package*.json ./

# 使用pnpm安装依赖
RUN pnpm install

# 复制应用程序代码 COPY <源路径> <目标路径>
# 第一个 .：指的是 构建上下文中的当前目录（比如 Dockerfile 所在目录）
# 第二个.：指的是 镜像内的当前目录（/app）
COPY . .

# 构建TypeScript代码
RUN pnpm build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]