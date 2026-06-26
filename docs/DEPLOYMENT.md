# GitHub Pages 公开部署说明

## 当前状态

项目已经整理为 GitHub Pages 可发布的纯静态站点，并已完成本地 Git 提交。

本地提交：

```text
9b2570d Initial public prototype for GitHub Pages
```

## 方式一：提供空仓库地址后推送

目标 GitHub 仓库：

```text
https://github.com/luvznc/zhenhu-mom-service.git
```

预计公开展示地址：

```text
https://luvznc.github.io/zhenhu-mom-service/
```

推送命令：

```powershell
.\tools\publish_github_pages.ps1 -RepositoryUrl "https://github.com/luvznc/zhenhu-mom-service.git"
```

## 方式二：提供 GitHub Personal Access Token

如果希望由开发者代为创建仓库，需要提供具有 `repo` 权限的 GitHub token。出于安全考虑，更推荐方式一。

## GitHub Pages 设置

推送完成后，在仓库页面打开：

```text
Settings -> Pages -> Build and deployment -> Source: Deploy from a branch
Branch: main
Folder: / root
```

保存后，公开地址通常是：

```text
https://luvznc.github.io/zhenhu-mom-service/
```

## 自动部署工作流

项目已包含 GitHub Actions 工作流：

```text
.github/workflows/pages.yml
```

推送到 `main` 后，仓库如果已允许 GitHub Pages 使用 GitHub Actions 发布，将自动部署。
