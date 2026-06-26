# API接口草案

## 用户端

| 方法 | 地址 | 说明 |
| --- | --- | --- |
| POST | `/api/wx/login` | 微信登录 |
| POST | `/api/privacy/consent` | 隐私授权 |
| POST | `/api/requirements` | 创建护理需求 |
| GET | `/api/requirements/{id}` | 需求详情 |
| POST | `/api/match/run` | 运行AI匹配 |
| GET | `/api/match/results?requirementId=` | 匹配结果 |
| GET | `/api/nurses/{id}` | 护士详情 |
| POST | `/api/orders` | 创建订单 |
| POST | `/api/orders/{id}/pay` | 发起支付 |
| POST | `/api/orders/{id}/daily-confirm` | 确认当日服务 |
| POST | `/api/tickets` | 创建异常/投诉工单 |
| POST | `/api/orders/{id}/review` | 完单评价 |

## 护士端

| 方法 | 地址 | 说明 |
| --- | --- | --- |
| POST | `/api/nurse/apply` | 入驻申请 |
| GET | `/api/nurse/invitations` | 匹配邀约 |
| POST | `/api/nurse/invitations/{id}/accept` | 接受邀约 |
| POST | `/api/orders/{id}/check-in` | 上门签到 |
| POST | `/api/care-logs` | 提交护理日志 |
| GET | `/api/nurse/income` | 收入结算 |

## 管理后台

| 方法 | 地址 | 说明 |
| --- | --- | --- |
| GET | `/admin/dashboard` | 监管看板 |
| GET | `/admin/nurses` | 护士列表 |
| POST | `/admin/nurses/{id}/audit` | 护士审核 |
| PUT | `/admin/match-rules` | 修改匹配权重 |
| GET | `/admin/orders` | 订单列表 |
| GET | `/admin/tickets` | 工单列表 |
| POST | `/admin/tickets/{id}/handle` | 处理工单 |
