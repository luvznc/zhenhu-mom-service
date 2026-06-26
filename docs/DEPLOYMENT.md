# GitHub Pages 公开部署说明

## 当前状态

项目已经整理为 GitHub Pages 可发布的纯静态站点，并已完成本地 Git 提交。

本地提交：

```text
9b2570d Initial public prototype for GitHub Pages
```

## 方式一：提供空仓库地址后推送

在 GitHub 新建一个公开仓库，例如：

```text
homecare-ai-miniapp-prototype
```

然后把 HTTPS 地址提供给开发者：

```text
https://github.com/<你的账号>/homecare-ai-miniapp-prototype.git
```

推送命令：

```powershell
.\tools\publish_github_pages.ps1 -RepositoryUrl "https://github.com/<你的账号>/homecare-ai-miniapp-prototype.git"
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
https://<你的账号>.github.io/homecare-ai-miniapp-prototype/
```
