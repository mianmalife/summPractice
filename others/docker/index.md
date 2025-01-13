# Docker基础

## 镜像

````shell
// 构建镜像
docker build -t 镜像名 .

// 查询当前有那些镜像
docker images

// 拉取镜像(以node为例)
docker pull node:latest

// 删除镜像(以node为例)
docker rmi node:18.20.3

// 进入镜像内部
docker exec -it 容器id /bin/bash
````

## 容器

```shell
// 运行容器
docker run -d -p 宿主机端口:容器端口 镜像名

// 查询当前有那些容器
docker ps -a

// 删除容器
docker rm -f 容器id

// 重启容器
docker restart 容器id

// 停止容器
docker stop 容器id
```

## 映射

将自己的nginx配置 和nginx的配置做一一映射

```shell
docker run -d -p 80:80 -v 自己的nginx.conf目录:/etc/nginx/conf.d/default.conf -v 自己的html目录:/usr/share/nginx/html nginx
```

## 登录

登录并拉取镜像

```shell
docker login -u 用户名 -p 密码 镜像地址
```

## Tag&Push

```shell
docker tag 镜像名 registry.cn-hangzhou.aliyuncs.com/xxx1/镜像名:镜像版本号
docker push registry.cn-hangzhou.aliyuncs.com/xxx1/镜像名:镜像版本号
```



