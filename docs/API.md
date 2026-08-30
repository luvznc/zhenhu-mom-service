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
| GET | `/api/nurses/{id}` | 护理师详情（兼容既有资源路径） |
| GET | `/api/certification/levels` | 平台能力等级与接单边界 |
| GET | `/api/service-plans` | 含餐/不含餐方案、边界与价格 |
| POST | `/api/orders` | 创建订单 |
| POST | `/api/orders/{id}/pay` | 发起支付 |
| POST | `/api/orders/{id}/daily-confirm` | 确认当日服务 |
| POST | `/api/tickets` | 创建异常/投诉工单 |
| POST | `/api/orders/{id}/review` | 完单评价 |
| POST | `/api/iot/consents` | 创建设备与健康数据单独授权 |
| GET | `/api/orders/{id}/iot/snapshot` | 获取家庭监测快照与数据质量 |
| GET | `/api/orders/{id}/alerts` | 获取IoT预警与人工复核状态 |
| POST | `/api/alerts/{id}/review` | 护理师复核并提交处置结果 |
| POST | `/api/alerts/{id}/escalate` | 升级为就医建议/急救提示/平台工单 |
| GET | `/api/training/courses` | 公开课程、课时、价格与证书性质 |
| POST | `/api/training/enrollments` | 创建课程报名与培训订单 |

## 护理师端

| 方法 | 地址 | 说明 |
| --- | --- | --- |
| POST | `/api/nurse/apply` | 入驻申请 |
| GET | `/api/nurse/invitations` | 匹配邀约 |
| POST | `/api/nurse/invitations/{id}/accept` | 接受邀约 |
| POST | `/api/orders/{id}/check-in` | 上门签到 |
| POST | `/api/care-logs` | 提交护理日志 |
| GET | `/api/nurse/certifications` | 查询平台等级、专项证与有效期 |
| GET | `/api/nurse/growth-plan` | 查询晋级缺口与推荐课程 |
| POST | `/api/iot/readings/{id}/confirm` | 确认设备读数、测量条件和人工复测 |
| GET | `/api/nurse/income` | 收入结算 |

## 管理后台

| 方法 | 地址 | 说明 |
| --- | --- | --- |
| GET | `/admin/dashboard` | 监管看板 |
| GET | `/admin/nurses` | 护士列表 |
| POST | `/admin/nurses/{id}/audit` | 护士审核 |
| POST | `/admin/certifications/assessments` | 创建理论/实操/情景考核记录 |
| POST | `/admin/certifications/{id}/issue` | 发放平台内部能力证书 |
| POST | `/admin/certifications/{id}/review` | 年审、晋级、降级、暂停或撤销 |
| PUT | `/admin/match-rules` | 修改匹配权重 |
| GET | `/admin/orders` | 订单列表 |
| GET | `/admin/tickets` | 工单列表 |
| POST | `/admin/tickets/{id}/handle` | 处理工单 |
| GET | `/admin/training/dashboard` | 培训招生、完成率、收入与退款看板 |
| POST | `/admin/training/courses` | 创建或更新课程与班次 |
| GET | `/admin/iot/alerts` | IoT预警、超时复核与升级处置看板 |

## 关键接口约束

- `POST /api/match/run` 先返回硬门槛剔除原因，再返回评分与可解释权重，不能只给总分。
- `POST /api/orders` 必须保存 `service_plan_code`、餐饮/家务排除项、食材规则、IoT授权版本和合同快照。
- IoT原始读数不可直接转成诊断结论；预警需包含数据来源、质量标记、规则版本、人工复核与升级记录。
- 平台证书接口必须返回 `certificate_type=PLATFORM_INTERNAL`，前端显著展示证书性质和有效期。
