# 数据模型草案

## user

| 字段 | 说明 |
| --- | --- |
| id | 用户ID |
| openid | 微信openid |
| phone | 手机号，加密存储 |
| real_name | 真实姓名，敏感字段 |
| status | 状态 |

## care_requirement

| 字段 | 说明 |
| --- | --- |
| id | 需求ID |
| user_id | 用户ID |
| mother_status | 孕产妇状况 |
| baby_status | 新生儿状况 |
| family_environment | 家庭环境 |
| address | 服务地址 |
| service_days | 服务天数 |
| budget_min / budget_max | 预算区间 |
| risk_tags | 风险标签 |

## nurse

| 字段 | 说明 |
| --- | --- |
| id | 护士ID |
| real_name | 姓名 |
| license_no | 护士执业证号 |
| school | 毕业院校或培训来源 |
| direction | 专业方向 |
| experience_years | 经验年限 |
| service_districts | 服务区域 |
| audit_status | 审核状态 |

## match_result

| 字段 | 说明 |
| --- | --- |
| id | 匹配ID |
| requirement_id | 需求ID |
| nurse_id | 护士ID |
| match_score | 匹配分 |
| predicted_satisfaction | 预测满意度 |
| dynamic_tags | 动态权重标签 |
| explanation | 推荐解释 |

## care_log

| 字段 | 说明 |
| --- | --- |
| id | 日志ID |
| order_id | 订单ID |
| nurse_id | 护士ID |
| log_date | 服务日期 |
| check_in_time | 签到时间 |
| mother_status | 产妇状态 |
| baby_status | 新生儿状态 |
| abnormal_flag | 是否异常 |
