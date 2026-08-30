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
- 组件拆分：Header、需求采集卡片、AI体系卡片、护士卡片、底部操作栏
- 状态管理：小程序页面状态或轻量 store
- 地图定位：腾讯位置服务
- 通知：微信订阅消息

### 后端

- Spring Boot / NestJS
- MySQL：订单、用户、护士、合同、服务日志
- Redis：登录态、验证码、短期匹配缓存
- 对象存储：证书、合同、护理照片
- 微信支付：托管支付、退款、结算

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
    ticket/
    risk/
```

## 4. MVP开发顺序

1. 登录、隐私授权、用户资料
2. 护士入驻与后台审核
3. 用户需求采集
4. 规则引擎匹配
5. 护士详情与预约
6. 订单、合同、支付
7. 服务签到与护理日志
8. 异常反馈、投诉工单、评价回传
