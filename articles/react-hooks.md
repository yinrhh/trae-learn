# Docker 容器化实践指南

*作者：小特 | 发布于：2024-01-20 | 分类：容器化*

**标签**: Docker, 容器化, DevOps

## 1. Docker 简介

Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 或 Windows 机器上。

## 2. 基本概念

在开始使用 Docker 之前，我们需要理解以下核心概念：

- 镜像（Image）：Docker 镜像是一个只读的模板
- 容器（Container）：容器是镜像的运行实例
- 仓库（Repository）：存储和分发 Docker 镜像的服务

## 3. 常用命令

```bash
# 拉取镜像
docker pull nginx

# 运行容器
docker run -d -p 80:80 nginx

# 查看运行中的容器
docker ps