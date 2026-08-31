# 开发说明

## 1. 当前原型技术方案

当前原型使用无外部依赖的静态前端实现：

- `index.html`：页面结构
- `src/styles.css`：高保真样式
- `src/app.js`：交互逻辑
- `data/mock-data.json`：模拟数据
- `tools/dev_server.py`：本地静态开发服务

这种方式适合快速评审与演示，不需要安装依赖。正式开发时可迁移到微信小程序原生、Taro、uni-app 或 React Native。

## 2. 正式开发建议

### 小程序端

- 微信小程序原生或 Taro
- 组件拆分：Header、需求采集卡片、AI体系卡片、护理师卡片、认证阶梯、服务方案选择、IoT数据面板、预警卡、课程卡、底部操作栏
- 状态管理：小程序页面状态或轻量 store
- 地图定位：腾讯位置服务
- 通知：微信订阅消息

### 后端

- Spring Boot / NestJS
- MySQL：订单、用户、护理师、资质、平台认证、考核、课程、合同、服务日志、设备、读数与预警
- Redis：登录态、验证码、短期匹配缓存
- 对象存储：证书、合同、护理照片
- 微信支付：托管支付、退款、结算
- IoT接入层：设备厂商适配器、消息队列、幂等去重、数据质量标记和时序存储
- 安全：健康数据单独授权、字段加密、操作审计、最小权限与留存/删除策略

## 3. 推荐目录

```text
client/
  pages/
    home/
    requirement/
    match/
    nurse-detail/
    order/
    service/
    certification/
    iot-care/
    academy/
    regional-service/
  components/
    RequirementCard/
    NurseCard/
    TrustBanner/
    BottomAction/
server/
  modules/
    auth/
    user/
    nurse/
    requirement/
    match/
    order/
    service-log/
    certification/
    assessment/
    training/
    device/
    health-reading/
    alert/
    region/
    ticket/
    risk/
```

## 4. MVP开发顺序

1. 登录、隐私授权、用户资料
2. 护理师入驻、法定材料审核与P0-M4平台认证
3. 用户13模块需求采集与地域、含餐、IoT服务配置
4. 硬门槛 + 可解释权重规则匹配
5. 护理师专业档案、专项证和预约
6. 服务方案、边界快照、合同、托管支付
7. 服务签到、护理/餐饮日志和每日验收
8. IoT设备接入、数据授权、人工复核和异常工单
9. 课程、报名、支付、考核、发证与晋级
10. 评价回传、复训、降级和模型评估

## 5. 关键工程约束

- 规则版本、合同快照、服务边界和证书性质必须可追溯，不只保存当前值。
- 设备读数使用设备ID + 指标 + 测量时间构建幂等键，保留数据质量和来源。
- 预警状态机建议为 `NEW -> WAITING_REVIEW -> REVIEWED -> ESCALATED/CLOSED`，所有转换写审计日志。
- AI排序不得绕过硬门槛；模型不可自动签发/撤销法定资质或平台证书。
- 地域匹配使用服务圈和脱敏距离，精确位置仅在履约所需范围内授权使用并写入访问审计。
