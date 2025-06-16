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

# 复制应用程序代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]