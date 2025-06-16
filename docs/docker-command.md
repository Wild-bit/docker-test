# 🐳 Docker 常用命令速查表（开发者版）
## 启动
```bash 
# 后台启动服务（自动构建镜像，只在必要时）
docker-compose up -d

 # 强制重新构建所有镜像，然后启动服务（前台运行）
docker-compose up --build

# 强制重新构建 + 后台运行
docker-compose up --build -d
```

## 📦 镜像操作
| 操作     | 命令                                |
| ------ | --------------------------------- |
| 查看本地镜像 | `docker images`                   |
| 拉取镜像   | `docker pull <镜像名[:tag]>`         |
| 删除镜像   | `docker rmi <镜像ID或镜像名>`           |
| 强制删除镜像 | `docker rmi -f <镜像名>`             |
| 构建镜像   | `docker build -t <镜像名> .`         |
| 重新构建   | `docker-compose build --no-cache` |


## 🧱 容器操作

| 操作            | 命令                            |
| ------------- | ----------------------------- |
| 查看运行中的容器      | `docker ps`                   |
| 查看所有容器（包括已退出） | `docker ps -a`                |
| 启动容器          | `docker start <容器ID或名称>`      |
| 停止容器          | `docker stop <容器ID或名称>`       |
| 重启容器          | `docker restart <容器ID或名称>`    |
| 删除容器          | `docker rm <容器ID或名称>`         |
| 强制删除运行中容器     | `docker rm -f <容器ID/服务名>`         |
| 进入容器交互终端      | `docker exec -it <容器ID/服务名> bash` |
| 查看容器日志        | `docker logs <容器ID/服务名>`          |
|实时查看容器日志     | `docker-compose logs -f <容器ID/服务>`           |
| 查看容器资源占用      | `docker stats`                |


## 🧰 Volume（数据卷）

| 操作    | 命令                           |
| ----- | ---------------------------- |
| 创建数据卷 | `docker volume create <卷名>`  |
| 查看数据卷 | `docker volume ls`           |
| 查看卷详情 | `docker volume inspect <卷名>` |
| 删除数据卷 | `docker volume rm <卷名>`      |


## 🌐 网络操作

| 操作       | 命令                                    |
| -------- | ------------------------------------- |
| 查看网络     | `docker network ls`                   |
| 创建网络     | `docker network create <网络名>`         |
| 查看容器网络详情 | `docker inspect <容器ID>`               |
| 将容器连接到网络 | `docker network connect <网络名> <容器ID>` |


## 📄 Docker Compose

| 操作      | 命令                             |
| ------- | ------------------------------ |
| 启动服务    | `docker-compose up`            |
| 后台启动服务  | `docker-compose up -d`         |
| 强制构建并启动 | `docker-compose up --build -d` |
| 停止服务    | `docker-compose down`          |
| 查看服务状态  | `docker-compose ps`            |
| 重启服务    | `docker-compose restart`       |
| 构建服务镜像  | `docker-compose build`         |


## 🧹 清理命令
```bash
# 删除所有停止的容器
docker container prune

# 删除未使用的镜像
docker image prune

# 删除未使用的数据卷
docker volume prune

# 一次性清理所有未使用的资源
docker system prune -a

```
