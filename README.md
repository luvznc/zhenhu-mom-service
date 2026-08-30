# 居家母婴护理AI智能匹配小程序原型

这是一个可本地运行的高保真移动端小程序原型，覆盖用户端、护士端和平台后台的关键页面。当前版本使用无外部依赖的 HTML/CSS/JavaScript 实现，便于直接本地启动、演示和二次开发。

## 本地启动

```bash
python tools/dev_server.py --port 5188
```

启动后访问：

```text
http://127.0.0.1:5188/
```

也可以使用：

```bash
npm run dev
```

## 当前运行信息

本次已启动本地开发服务：

```text
http://127.0.0.1:5188/
```

当前进程 PID：`2668`

停止服务：

```powershell
Stop-Process -Id 2668
```

## 文件结构

```text
homecare-ai-miniapp-prototype/
  index.html                    # 高保真原型入口
  src/styles.css                # 视觉样式与响应式布局
  src/app.js                    # 页面切换、表单选择、AI匹配加载等交互
  data/mock-data.json           # 模拟需求与护士数据
  docs/README.md                # 交付说明
  docs/PRD.md                   # 产品需求文档
  docs/DEVELOPMENT.md           # 开发说明
  docs/API.md                   # API草案
  docs/DATA_MODEL.md            # 数据模型草案
  docs/INTERACTION_SPEC.md      # 交互说明
  docs/DESIGN_SYSTEM.md         # 高端视觉设计系统
  docs/AI_INTAKE_QUESTIONNAIRE.md # 专业AI需求采集问卷
```

## 已实现页面

- 首页总览
- 用户端 AI 需求采集
- 用户端 智能匹配结果
- 用户端 护士详情
- 用户端 签约支付
- 用户端 服务监管
- 护士端 工作台
- 平台后台 监管看板

## 后续开发建议

第一阶段建议保持“规则引擎 + 权重评分”的 AI 匹配方式，先打通需求采集、匹配推荐、签约支付、服务日志、异常反馈、评价回传的完整业务闭环。订单数据积累后再逐步引入满意度预测、履约风险预测和本地化知识图谱。

## GitHub Pages 部署

本项目是纯静态原型，适合直接发布到 GitHub Pages。

已包含：

- `index.html`
- `src/styles.css`
- `src/app.js`
- `.nojekyll`
- `.gitignore`

发布方式：

```bash
git remote add origin https://github.com/luvznc/zhenhu-mom-service.git
git push -u origin main
```

然后在 GitHub 仓库中打开：

```text
Settings -> Pages -> Build and deployment -> Deploy from a branch -> main / root
```

公开访问地址通常是：

```text
https://luvznc.github.io/zhenhu-mom-service/
```
