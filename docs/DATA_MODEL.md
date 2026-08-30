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
| meal_service_mode | `WITH_MEALS` / `WITHOUT_MEALS` / `GUIDANCE_ONLY` |
| special_diet_requirements | 控糖、过敏、禁忌等结构化要求 |
| household_scope | 家务范围与明确排除项 |
| iot_service_mode | 平台设备、已有设备或仅人工记录 |

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
| service_status | 见习、可接单、暂停、退出 |

## caregiver_certification

| 字段 | 说明 |
| --- | --- |
| id / nurse_id | 证书ID与人员ID |
| certificate_type | 固定为 `PLATFORM_INTERNAL` |
| level_code | P0 / M1 / M2 / M3 / M4 |
| certificate_no | 平台证书编号 |
| meal_certified / iot_certified | 含餐与IoT专项状态 |
| issued_at / expires_at | 发证与失效时间 |
| status | 有效、待复审、暂停、撤销、过期 |
| public_note | “不替代国家职业资格或法定执业资质” |

## competency_assessment

| 字段 | 说明 |
| --- | --- |
| nurse_id / assessment_id | 人员与考核ID |
| theory_score / practical_score | 理论与实操成绩 |
| maternal_infant_score | 母婴专业照护 |
| nutrition_meal_score | 营养与月子餐 |
| housekeeping_score | 家政服务规范 |
| risk_escalation_score | 风险识别与升级 |
| communication_score | 沟通与履约 |
| veto_items | 安全否决项 |
| assessor_id / assessed_at | 考评员与时间 |

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
| hard_gate_result | 资质、等级、专项、区域、排班等门槛结果 |
| model_rule_version | 规则/模型版本 |

## service_plan / order

| 字段 | 说明 |
| --- | --- |
| service_plan.code | CARE_ONLY / CARE_WITH_MEALS |
| scope_snapshot / exclusions_snapshot | 签约时服务范围与排除项快照 |
| ingredient_rule | 食材提供、采购、实报实销规则 |
| service_fee / platform_fee / iot_fee | 分项费用 |
| caregiver_id / family_id | 护理师与家庭 |
| contract_version / consent_version | 合同与授权版本 |

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
| meal_log | 菜单、食品安全与实际完成记录 |
| iot_review_ids | 关联设备读数人工复核 |

## iot_device / health_reading / alert_event

| 实体 | 关键字段 |
| --- | --- |
| iot_device | device_id、order_id、device_type、consumer_or_medical、registration_no、online_status、last_calibrated_at |
| health_reading | subject_type、metric_type、value、unit、measured_at、source、quality_flag、raw_payload_hash |
| alert_event | level、rule_version、baseline_window、triggered_at、status、reviewer_id、review_result、escalation_action |
| data_consent | user_id、device_scope、metric_scope、purpose、retention_period、granted_at、revoked_at |

## training_course / enrollment

| 字段 | 说明 |
| --- | --- |
| course.code / title | 课程编码与名称 |
| syllabus_version / hours | 大纲版本与理论/实操课时 |
| target_level / specialty | 对应晋级或专项证 |
| price / refund_rule | 价格与退费规则 |
| enrollment.student_id | 学员ID，可为平台人员或社会学员 |
| enrollment.status | 待支付、学习中、待考核、通过、未通过、退款 |
| certificate_nature | 结业证明或平台内部能力认证，禁止误标国家证书 |
