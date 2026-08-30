# 居家母婴护理AI智能匹配小程序原型

这是一个可本地运行的高保真移动端小程序原型，覆盖家庭端、护理师端和平台后台。平台定位不是传统月嫂中介，而是以“法定资质核验 + 系统培训 + 标准考核 + 透明认证 + AI/IoT闭环监管”为核心的医护背景母婴护理 O2O 平台。

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

## 文件结构

```text
homecare-ai-miniapp-prototype/
  index.html                    # 高保真原型入口
  src/styles.css                # 视觉样式与响应式布局
  src/app.js                    # 页面切换、表单选择、AI匹配加载等交互
  data/mock-data.json           # 模拟需求与护士数据
  docs/PRD.md                   # 产品需求文档
  docs/DEVELOPMENT.md           # 开发说明
  docs/API.md                   # API草案
  docs/DATA_MODEL.md            # 数据模型草案
  docs/INTERACTION_SPEC.md      # 交互说明
  docs/DESIGN_SYSTEM.md         # 高端视觉设计系统
  docs/AI_INTAKE_QUESTIONNAIRE.md # 专业AI需求采集问卷
  docs/PRODUCT_OPTIMIZATION_V2.md # 专业认证、服务模式、IoT和培训设计
```

## 已实现页面

- 首页总览
- 用户端 AI 需求采集
- 用户端 智能匹配结果
- 用户端 认证护理师库与专业档案
- 用户端 含餐/不含餐方案与签约支付
- 用户端 服务监管与IoT智能监测
- 平台认证中心：P0-M4能力分层、五维考核、动态年审
- 母婴护理成长学院：社会化付费课程与护理师晋级
- 护理师端 接单与能力成长工作台
- 平台后台 订单、风控、认证复审与培训收入看板

## 核心业务边界

- 护士执业注册、专业技术资格等法定材料与平台内部能力等级分开展示。
- `P0-M4` 是原型中的平台内部能力评价，不是国家职业资格或专业技术资格。
- AI与可穿戴设备只做信息整理、匹配辅助、趋势提示和预警，不作诊断。
- 含餐服务的食材、特殊膳食、其他家庭成员餐食和家务范围必须在合同中逐项确认。
- 原型中的课程价格、服务价格、人员、证照尾号和运营数据均为演示数据。

## 后续开发建议

第一阶段建议使用“硬性门槛 + 可解释权重评分”：先校验资质、服务边界、等级、排班与区域，再计算专业能力、餐饮/IoT专项、距离和历史质量。数据积累后再引入满意度预测、履约风险预测、课程推荐与本地化知识图谱。

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
