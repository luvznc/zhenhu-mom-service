const state = {
  planMode: "meal",
  iotAddon: true,
  iotTab: "mother",
  selectedNurseId: 1,
  region: "chengguan",
};

const navigationStack = [];
const navigationEntries = new Map();
let navigationSequence = 0;
let navigationBackPending = false;

const servicePlans = {
  care: {
    title: "26天专业照护 · 不含餐",
    serviceFee: 9800,
    boundary: "专注产妇与新生儿照护、观察记录、喂养支持和母婴用品整理；不承担备餐及其他家庭成员家务。",
    features: ["母婴专业照护", "每日护理日志", "家庭照护指导", "不含餐饮服务"],
  },
  meal: {
    title: "26天全程照护 · 含餐",
    serviceFee: 12800,
    boundary: "含产妇三餐两点的制作与厨房收尾；食材、特殊膳食和其他家庭成员餐食需在合同中另行确认。",
    features: ["母婴专业照护", "产妇三餐两点", "食品安全记录", "厨房服务收尾"],
  },
};

const certificationLevels = {
  P0: {
    title: "P0 见习护理员",
    detail: "完成材料审核与基线测评，正在接受培训和带教，不得以平台认证护理师身份独立接单。",
    threshold: "示例门槛：完成基础理论、隐私与安全培训；所有上户实践须由带教人员监督。",
  },
  M1: {
    title: "M1 基础母婴护理员",
    detail: "适配低风险家庭的基础生活照护、新生儿日常护理和标准化记录；复杂场景需升级或协同。",
    threshold: "示例门槛：理论与实操均≥70分、完成带教服务、无安全否决项。",
  },
  M2: {
    title: "M2 专业母婴护理师",
    detail: "可独立承接常规产褥期照护、喂养支持与家庭服务；含餐服务需额外通过营养与厨房实操认证。",
    threshold: "示例门槛：理论与实操均≥80分、同类服务≥30单、近180天评分≥4.6。",
  },
  M3: {
    title: "M3 高级母婴护理师",
    detail: "适配早产儿出院后日常照护、剖宫产恢复、复杂喂养与含餐服务；高风险场景仍须遵守转诊和专业边界。",
    threshold: "示例门槛：理论与实操均≥85分、同类服务≥100单、近180天评分≥4.7、无未闭环重大异常。",
  },
  M4: {
    title: "M4 专家督导",
    detail: "承担复杂订单联合评估、带教、质量复盘和考核，不因平台等级获得诊断、处方或超范围医疗操作权限。",
    threshold: "示例门槛：综合考核≥90分、同类服务≥200单、带教≥12例、近180天评分≥4.8。",
  },
};

const regionalDistricts = {
  chengguan: {
    name: "城关区核心服务圈",
    nurses: 24,
    distance: "4.2km",
    response: "约25分钟",
    availability: "本周12名可约",
    coverage: ["张掖路", "雁滩", "东岗", "铁路局"],
    insight: "订单密度较高，优先匹配常驻城关、通勤稳定且具备夜间服务能力的护理师。",
  },
  qilihe: {
    name: "七里河服务圈",
    nurses: 16,
    distance: "5.8km",
    response: "约32分钟",
    availability: "本周8名可约",
    coverage: ["西站", "西湖", "敦煌路", "彭家坪"],
    insight: "结合西站周边通勤条件与家庭长辈参与情况，提高本地沟通和时间稳定性权重。",
  },
  anning: {
    name: "安宁区服务圈",
    nurses: 12,
    distance: "6.4km",
    response: "约36分钟",
    availability: "本周6名可约",
    coverage: ["培黎", "十里店", "费家营", "桃海"],
    insight: "优先展示常驻安宁与跨区通勤记录稳定的护理师，并在签约前确认夜间交通方案。",
  },
  xigu: {
    name: "西固区服务圈",
    nurses: 10,
    distance: "7.1km",
    response: "约42分钟",
    availability: "本周5名可约",
    coverage: ["福利路", "先锋路", "西固城", "陈坪"],
    insight: "服务供给相对分散，平台优先锁定连续服务档期，并配置换人和跨区支援预案。",
  },
};

const nurses = [
  {
    id: 1,
    name: "张雨婷 护士",
    title: "护师",
    school: "兰州本地护士学校毕业",
    direction: "早产儿护理 / 剖宫产恢复",
    years: "6年产科经验",
    yearsNumber: 6,
    district: "城关区 4.2km",
    local: "兰州本地 · 城关区",
    regionalProfile: ["城关区常驻", "普通话/兰州方言", "西北口味适配", "温湿度记录"],
    localResponse: "城关核心圈约25分钟响应",
    hospital: "兰州某三甲医院产科",
    education: "护理学本科",
    license: "护士执业证书 · 尾号3287",
    verificationDate: "2026-05-18",
    levelCode: "M3",
    platformLevel: "M3 高级母婴护理师",
    careCertificate: "MC-LZ-M3-0268 · 有效至2027-05",
    mealCertified: true,
    iotCertified: true,
    maternityScore: 93,
    nutritionScore: 88,
    housekeepingScore: 86,
    riskScore: 92,
    communicationScore: 90,
    cases: 186,
    rating: 4.9,
    punctuality: 98,
    completion: 99,
    logRate: 100,
    response: "平均15分钟响应",
    availability: "本周三、五可约",
    available: true,
    score: 96,
    predict: "预计满意度 94%",
    filters: ["premature", "recovery", "meal", "iot", "available"],
    tags: ["擅长早产儿护理", "含餐服务认证", "IoT记录认证", "夜间稳定", "低体重儿喂养"],
    training: ["新生儿复苏专项培训", "产后营养与月子餐实操", "家庭服务与家政规范", "母婴居家风险识别"],
    services: ["早产儿出院后日常观察", "低体重儿喂养记录", "剖宫产术后生活护理", "产妇三餐两点制作", "母乳喂养支持", "IoT数据记录与复核"],
    experience: [
      ["2022-至今", "三甲医院产科护师", "参与产后病区、新生儿基础护理及出院指导。"],
      ["2020-2022", "妇幼护理岗位", "积累围产期观察、喂养支持和家庭宣教经验。"],
      ["平台认证", "母婴居家护理能力评估", "通过身份、执业注册、经历材料与情景化技能评估。"],
    ],
    reason:
      "当前新生儿状态触发“早产儿/低体重儿”动态权重；该护士过往同类家庭满意度高，且服务区域接近。",
  },
  {
    id: 2,
    name: "李佳宁 护士",
    title: "护师",
    school: "兰州职业院校母婴护理方向",
    direction: "母乳喂养指导 / 黄疸观察",
    years: "5年妇幼护理经验",
    yearsNumber: 5,
    district: "七里河区 7.8km",
    local: "兰州本地 · 七里河区",
    regionalProfile: ["七里河区常驻", "普通话沟通", "西北口味适配", "本地食材菜单"],
    localResponse: "七里河服务圈约32分钟响应",
    hospital: "兰州某妇幼保健机构",
    education: "护理学本科",
    license: "护士执业证书 · 尾号6152",
    verificationDate: "2026-05-21",
    levelCode: "M2",
    platformLevel: "M2 专业母婴护理师",
    careCertificate: "MC-LZ-M2-0412 · 有效至2027-05",
    mealCertified: true,
    iotCertified: true,
    maternityScore: 88,
    nutritionScore: 91,
    housekeepingScore: 84,
    riskScore: 87,
    communicationScore: 94,
    cases: 143,
    rating: 4.8,
    punctuality: 97,
    completion: 98,
    logRate: 99,
    response: "平均22分钟响应",
    availability: "本周二、四、六可约",
    available: true,
    score: 91,
    predict: "预计满意度 90%",
    filters: ["lactation", "meal", "iot", "available"],
    tags: ["黄疸观察", "母乳指导", "含餐服务认证", "家庭沟通", "标准化日志"],
    training: ["母乳喂养支持培训", "产后营养与月子餐实操", "新生儿常见风险识别", "护理文书规范"],
    services: ["含接与哺乳姿势指导", "喂养量与排泄记录", "黄疸观察及复查提醒", "产妇月子餐制作", "新生儿日常护理", "智能设备趋势复核"],
    experience: [
      ["2021-至今", "妇幼保健机构护师", "从事产后护理、喂养支持与新生儿健康宣教。"],
      ["2019-2021", "产后病区护士", "负责产妇基础护理及母婴同室照护支持。"],
      ["平台认证", "沟通与记录专项评估", "护理日志完整度、风险上报和家庭沟通能力通过评估。"],
    ],
    reason:
      "适合需要持续健康指标记录的家庭；护理日志完整率高，便于平台过程监管。",
  },
  {
    id: 3,
    name: "马欣 护士",
    title: "护士",
    school: "本地妇幼合作培训认证",
    direction: "产后恢复 / 新生儿日常护理",
    years: "4年居家护理经验",
    yearsNumber: 4,
    district: "安宁区 9.1km",
    local: "兰州本地 · 安宁区",
    regionalProfile: ["安宁区常驻", "普通话/兰州方言", "家庭长辈沟通", "跨区通勤可评估"],
    localResponse: "安宁服务圈约36分钟响应",
    hospital: "兰州某综合医院妇产科",
    education: "护理学大专",
    license: "护士执业证书 · 尾号9046",
    verificationDate: "2026-05-12",
    levelCode: "M2",
    platformLevel: "M2 专业母婴护理师",
    careCertificate: "MC-LZ-M2-0196 · 有效至2026-11",
    mealCertified: false,
    iotCertified: false,
    maternityScore: 86,
    nutritionScore: 72,
    housekeepingScore: 89,
    riskScore: 82,
    communicationScore: 91,
    cases: 118,
    rating: 4.8,
    punctuality: 96,
    completion: 98,
    logRate: 98,
    response: "平均28分钟响应",
    availability: "下周一后可约",
    available: false,
    score: 87,
    predict: "预计满意度 88%",
    filters: ["recovery"],
    tags: ["产后恢复", "家庭协作", "情绪安抚", "轻症预警"],
    training: ["产褥期护理培训", "新生儿安全照护", "家庭服务与家政规范", "家庭沟通与隐私保护"],
    services: ["产褥期生活护理", "伤口与恶露观察记录", "新生儿沐浴与抚触", "居家环境安全检查", "照护者技能教学", "睡眠与情绪支持"],
    experience: [
      ["2022-至今", "居家母婴护理护士", "提供产后恢复、新生儿日常护理和家庭照护培训。"],
      ["2020-2022", "综合医院妇产科护士", "承担基础护理、出院宣教和健康指标记录。"],
      ["平台认证", "居家场景安全评估", "通过环境风险、隐私保护和异常升级流程考核。"],
    ],
    reason:
      "适合常规产后恢复与家庭协作场景，可作为预算敏感家庭的备选推荐。",
  },
  {
    id: 4,
    name: "周婧 护士",
    title: "主管护师",
    school: "省内医学院护理专业毕业",
    direction: "高危产后随访 / 双胎照护",
    years: "9年妇产科经验",
    yearsNumber: 9,
    district: "西固区 11.6km",
    local: "兰州常驻 · 西固区",
    regionalProfile: ["西固区常驻", "普通话沟通", "夜间交通预案", "跨区支援督导"],
    localResponse: "西固服务圈约42分钟响应",
    hospital: "甘肃某三级医院妇产科",
    education: "护理学本科",
    license: "护士执业证书 · 尾号4721",
    verificationDate: "2026-05-23",
    levelCode: "M4",
    platformLevel: "M4 专家督导",
    careCertificate: "MC-LZ-M4-0061 · 有效至2027-05",
    mealCertified: true,
    iotCertified: true,
    maternityScore: 96,
    nutritionScore: 90,
    housekeepingScore: 88,
    riskScore: 97,
    communicationScore: 93,
    cases: 224,
    rating: 4.9,
    punctuality: 97,
    completion: 99,
    logRate: 100,
    response: "平均18分钟响应",
    availability: "周末及夜间可约",
    available: true,
    score: 89,
    predict: "预计满意度 91%",
    filters: ["premature", "recovery", "meal", "iot", "available"],
    tags: ["双胎照护", "高危风险识别", "含餐服务认证", "IoT督导", "夜间照护"],
    training: ["妇产科专科护理", "新生儿复苏专项培训", "产后营养与月子餐实操", "高危产妇风险识别"],
    services: ["双胎喂养与作息协同", "高危产后观察记录", "剖宫产恢复支持", "产妇月子餐复核", "IoT异常联合复核", "护理师带教与质量督导"],
    experience: [
      ["2020-至今", "三级医院妇产科主管护师", "参与高危产妇护理、质量管理与新护士带教。"],
      ["2017-2020", "妇产科护师", "积累围产期观察、双胎家庭宣教及产后护理经验。"],
      ["平台认证", "高风险场景专项评估", "通过风险识别、升级转诊和多照护者协同评估。"],
    ],
    reason: "专业年限与高危风险识别能力突出，适合双胎或需要更强观察与家庭协同的服务场景。",
  },
];

function isValidScreen(screenName) {
  return Boolean(screenName && document.querySelector(`#screen-${screenName}`));
}

function buildScreenUrl(screenName) {
  const url = new URL(window.location.href);
  if (screenName === "home") url.searchParams.delete("screen");
  else url.searchParams.set("screen", screenName);
  return `${url.pathname}${url.search}${url.hash}`;
}

function renderScreen(screenName, scrollTop = 0) {
  document.querySelectorAll(".screen-view").forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${screenName}`);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === screenName);
  });

  document.querySelector(`#screen-${screenName}`)?.scrollTo({ top: scrollTop, behavior: "auto" });
}

function saveCurrentScroll() {
  const current = navigationStack.at(-1);
  if (!current) return;
  current.scrollTop = document.querySelector(`#screen-${current.screen}`)?.scrollTop || 0;
}

function createNavigationEntry(screenName) {
  const entry = { id: ++navigationSequence, screen: screenName, scrollTop: 0 };
  navigationEntries.set(entry.id, entry);
  return entry;
}

function showScreen(screenName, options = {}) {
  if (!isValidScreen(screenName)) return;

  const { replace = false, syncHistory = true } = options;
  const current = navigationStack.at(-1);
  if (current?.screen === screenName) return;

  saveCurrentScroll();
  const entry = createNavigationEntry(screenName);
  if (replace && current) navigationStack.splice(-1, 1, entry);
  else navigationStack.push(entry);

  if (syncHistory) {
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({ homecareNavigation: true, id: entry.id, screen: entry.screen }, "", buildScreenUrl(entry.screen));
  }

  renderScreen(entry.screen, entry.scrollTop);
}

function initializeNavigation(screenName) {
  const initialScreen = isValidScreen(screenName) ? screenName : "home";
  const entry = createNavigationEntry(initialScreen);
  navigationStack.splice(0, navigationStack.length, entry);
  window.history.replaceState(
    { homecareNavigation: true, id: entry.id, screen: entry.screen },
    "",
    buildScreenUrl(entry.screen)
  );
  renderScreen(entry.screen, 0);
}

function goBack() {
  if (navigationBackPending) return;
  saveCurrentScroll();

  if (navigationStack.length > 1) {
    navigationBackPending = true;
    window.history.back();
    return;
  }

  if (navigationStack.at(-1)?.screen !== "home") showScreen("home", { replace: true });
}

function updatePrototypeScale() {
  const phoneStage = document.querySelector(".phone-stage");
  if (!phoneStage) return;

  if (window.innerWidth <= 520) {
    phoneStage.style.removeProperty("--prototype-scale");
    return;
  }

  const verticalPadding = window.innerWidth > 1120 ? 48 : 64;
  const availableHeight = Math.max(440, window.innerHeight - verticalPadding);
  const scale = Math.min(1, availableHeight / 874);
  phoneStage.style.setProperty("--prototype-scale", scale.toFixed(3));
}

window.addEventListener("popstate", (event) => {
  navigationBackPending = false;
  const stateEntry = event.state;
  if (!stateEntry?.homecareNavigation || !isValidScreen(stateEntry.screen)) return;

  let entry = navigationEntries.get(stateEntry.id);
  if (!entry) {
    entry = { id: stateEntry.id, screen: stateEntry.screen, scrollTop: 0 };
    navigationEntries.set(entry.id, entry);
    navigationSequence = Math.max(navigationSequence, entry.id);
  }

  const existingIndex = navigationStack.findIndex((item) => item.id === entry.id);
  if (existingIndex >= 0) navigationStack.splice(existingIndex + 1);
  else navigationStack.push(entry);

  renderScreen(entry.screen, entry.scrollTop);
});

window.addEventListener("resize", updatePrototypeScale, { passive: true });

function updateProgress() {
  const cards = [...document.querySelectorAll(".question-card")];
  const complete = cards.filter((card) => card.querySelector(".choice.selected")).length;
  const text = document.querySelector("#completionText");
  const bar = document.querySelector("#progressBar");
  if (text) text.textContent = `${complete}/${cards.length}`;
  if (bar) bar.style.width = `${cards.length ? (complete / cards.length) * 100 : 0}%`;
}

function renderNurses() {
  const list = document.querySelector("#nurseList");
  if (!list) return;

  const mealMode = document.querySelector('[data-group="mealService"] .choice.selected')?.dataset.value;
  const iotMode = document.querySelector('[data-group="iotService"] .choice.selected')?.dataset.value;
  const requiresMealSkill = ["withMeals", "mealGuidance", "specialDiet"].includes(mealMode);
  const requiresIotSkill = ["iotKit", "ownDevice"].includes(iotMode);
  const candidates = nurses.filter(
    (nurse) => (!requiresMealSkill || nurse.mealCertified) && (!requiresIotSkill || nurse.iotCertified)
  );

  list.innerHTML = candidates
    .map(
      (nurse, index) => `
        <article class="nurse-card ${index === 0 ? "featured" : ""}" data-nurse-id="${nurse.id}">
          <div class="nurse-top">
            <div class="avatar">${nurse.name.slice(0, 1)}</div>
            <div class="nurse-main">
              <div class="name-line"><h3>${nurse.name}</h3><span>${nurse.levelCode}</span></div>
              <p>${nurse.school}</p>
              <p>${nurse.direction} · ${nurse.years}</p>
              <p>${nurse.district}</p>
            </div>
            <div class="score">
              <b>${nurse.score}</b>
              <small>匹配分</small>
            </div>
          </div>
          <div class="service-capability-row">
            <span class="${nurse.mealCertified ? "on" : "off"}">${nurse.mealCertified ? "含餐服务已认证" : "仅不含餐服务"}</span>
            <span class="${nurse.iotCertified ? "on" : "off"}">${nurse.iotCertified ? "IoT记录已认证" : "仅人工记录"}</span>
            <span class="on">${nurse.regionalProfile[0]}</span>
          </div>
          <div class="nurse-quality-row">
            <span>${nurse.platformLevel}</span>
            <b>${nurse.predict}</b>
          </div>
          <div class="card-tags">
            ${nurse.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <div class="reason-box">
            <b>${nurse.predict}</b><br />
            ${index === 0 ? nurse.reason : "点击卡片可展开更完整的AI推荐解释。"}
          </div>
          <div class="card-footer">
            <span>法定资质、平台等级与可约时间均可核验</span>
            <button data-open-nurse="${nurse.id}" data-origin="match">查看详情</button>
          </div>
        </article>
      `
    )
    .join("");

  if (!candidates.length) {
    list.innerHTML = '<div class="empty-state">当前硬性条件下暂无合适护理师，平台顾问将协助调整日期、区域或服务边界。</div>';
    return;
  }

  list.querySelectorAll(".nurse-card").forEach((card) => {
    card.addEventListener("click", () => {
      const nurse = nurses.find((item) => String(item.id) === card.dataset.nurseId);
      if (!nurse) return;
      const reason = card.querySelector(".reason-box");
      reason.innerHTML = `<b>${nurse.predict}</b><br />${nurse.reason}`;
      card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });

    card.addEventListener("dblclick", () => openNurseProfile(Number(card.dataset.nurseId), "match"));
  });
}

function renderNurseDirectory(filter = "all") {
  const list = document.querySelector("#nurseDirectoryList");
  if (!list) return;
  const filtered = filter === "all" ? nurses : nurses.filter((nurse) => nurse.filters.includes(filter));

  list.innerHTML = filtered
    .map(
      (nurse) => `
        <article class="directory-nurse-card">
          <div class="directory-nurse-head">
            <div class="avatar">${nurse.name.slice(0, 1)}</div>
            <div class="nurse-main">
              <div class="name-line"><h3>${nurse.name}</h3><span>✓ ${nurse.levelCode}已核验</span></div>
              <p>${nurse.title} · ${nurse.years} · ${nurse.local}</p>
              <p>${nurse.hospital} · ${nurse.education}</p>
            </div>
          </div>
          <div class="credential-summary">
            <span><b>执业注册</b>${nurse.license}</span>
            <span><b>平台等级</b>${nurse.platformLevel}</span>
          </div>
          <div class="service-capability-row compact">
            <span class="${nurse.mealCertified ? "on" : "off"}">${nurse.mealCertified ? "含餐认证" : "不含餐"}</span>
            <span class="${nurse.iotCertified ? "on" : "off"}">${nurse.iotCertified ? "IoT认证" : "人工记录"}</span>
            <span class="on">本地服务</span>
            <span class="on">核验 ${nurse.verificationDate}</span>
          </div>
          <div class="card-tags">${nurse.tags.slice(0, 4).map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="directory-metrics">
            <div><b>${nurse.rating}</b><span>服务评分</span></div>
            <div><b>${nurse.cases}</b><span>母婴服务单</span></div>
            <div><b>${nurse.punctuality}%</b><span>准时到达</span></div>
          </div>
          <div class="availability-row"><span>${nurse.available ? "近期可约" : "排期待确认"}</span><b>${nurse.availability}</b></div>
          <button class="profile-entry-btn" data-open-nurse="${nurse.id}" data-origin="nurseDirectory">查看完整专业档案 <span>›</span></button>
        </article>
      `
    )
    .join("");

  if (!filtered.length) list.innerHTML = '<div class="empty-state">当前筛选条件下暂无可展示护士</div>';
}

function renderCredentialRows(nurse) {
  return [
    ["护士执业注册", nurse.license, "有效期内 · 平台已复核"],
    ["专业技术资格", nurse.title, "资格材料已核验"],
    ["教育与经历", `${nurse.education} · ${nurse.hospital}`, "证明材料已核验"],
    ["最近材料核验", nurse.verificationDate, "证照原件与公开信息交叉核验"],
  ]
    .map(([label, value, status]) => `<div><span>${label}</span><b>${value}</b><small>✓ ${status}</small></div>`)
    .join("");
}

function renderSkillMatrix(nurse) {
  return [
    ["母婴照护", nurse.maternityScore],
    ["营养月子餐", nurse.nutritionScore],
    ["家政规范", nurse.housekeepingScore],
    ["风险识别", nurse.riskScore],
    ["沟通履约", nurse.communicationScore],
  ]
    .map(
      ([label, value]) => `
        <div>
          <p><span>${label}</span><b>${value}</b></p>
          <i><em style="width:${value}%"></em></i>
        </div>
      `
    )
    .join("");
}

function renderQualityBars(nurse) {
  return [
    ["订单完成率", nurse.completion],
    ["准时到达率", nurse.punctuality],
    ["护理日志完整率", nurse.logRate],
  ]
    .map(([label, value]) => `<div><p><span>${label}</span><b>${value}%</b></p><i><em style="width:${value}%"></em></i></div>`)
    .join("");
}

function openNurseProfile(nurseId, origin = "nurseDirectory") {
  const nurse = nurses.find((item) => item.id === nurseId);
  if (!nurse) return;
  state.selectedNurseId = nurseId;

  document.querySelector("#profilePhoto").textContent = nurse.name.slice(0, 1);
  document.querySelector("#profileLocal").textContent = nurse.local;
  document.querySelector("#profileName").textContent = nurse.name;
  document.querySelector("#profileSummary").textContent = `${nurse.title} · ${nurse.years} · ${nurse.direction}`;
  document.querySelector("#profileAvailability").textContent = `${nurse.availability} · ${nurse.response}`;
  document.querySelector("#profileMetrics").innerHTML = `
    <div><b>${nurse.rating}</b><span>历史评分</span></div>
    <div><b>${nurse.punctuality}%</b><span>准时到达</span></div>
    <div><b>${nurse.cases}</b><span>母婴服务单</span></div>
  `;
  document.querySelector("#profileCredentials").innerHTML = renderCredentialRows(nurse);
  document.querySelector("#profileCertification").innerHTML = `
    <div class="level-mark">${nurse.levelCode}</div>
    <div>
      <span>平台内部能力等级</span>
      <b>${nurse.platformLevel}</b>
      <small>${nurse.careCertificate}</small>
    </div>
    <button data-go="certification">规则</button>
  `;
  document.querySelector("#profileSkillMatrix").innerHTML = renderSkillMatrix(nurse);
  document.querySelector("#profileTags").innerHTML = nurse.tags.concat(nurse.training).map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#profileExperience").innerHTML = nurse.experience
    .map(([period, title, detail]) => `<div><i></i><span>${period}</span><b>${title}</b><p>${detail}</p></div>`)
    .join("");
  document.querySelector("#profileServices").innerHTML = nurse.services.map((service) => `<span>✓ ${service}</span>`).join("");
  document.querySelector("#profileRegional").innerHTML = `
    <div class="regional-response"><span>本地响应画像</span><b>${nurse.localResponse}</b></div>
    <div class="regional-profile-tags">${nurse.regionalProfile.map((item) => `<span>${item}</span>`).join("")}</div>
    <button class="text-entry" data-go="regional">查看兰州地域服务标准 <span>›</span></button>
  `;
  document.querySelector("#profileQuality").innerHTML = renderQualityBars(nurse);

  const isMatch = origin === "match";
  document.querySelector("#profileReasonTitle").textContent = isMatch ? "AI推荐解释" : "档案说明";
  document.querySelector("#profileReason").textContent = isMatch
    ? nurse.reason
    : "平台档案分别展示法定资质材料、月嫂专项考核和历史履约记录。能否承接本次服务，还需结合家庭风险、餐饮边界、设备能力和实时排班确认。";
  document.querySelector("#profileListBtn").textContent = isMatch ? "返回匹配" : "返回护士库";
  renderOrderPlan();
  showScreen("nurse");
}

function showLoadingThenMatch() {
  const mealMode = document.querySelector('[data-group="mealService"] .choice.selected')?.dataset.value;
  const iotMode = document.querySelector('[data-group="iotService"] .choice.selected')?.dataset.value;
  const localPreferences = [...document.querySelectorAll('[data-group="localPreference"] .choice.selected')];
  const weights = ["早产儿护理", "剖宫产恢复"];
  if (mealMode === "withMeals" || mealMode === "specialDiet") weights.push("含餐与营养能力");
  if (iotMode === "iotKit" || iotMode === "ownDevice") weights.push("IoT记录与异常复核");
  if (localPreferences.length) weights.push("兰州地域服务适配");
  weights.push("夜间稳定性", "通勤稳定性");
  const summary = document.querySelector("#matchWeightSummary");
  if (summary) summary.textContent = `已提高“${weights.join("、")}”权重，并设置法定资质与服务边界为硬性门槛。`;
  renderNurses();

  const phoneScreen = document.querySelector(".phone-screen");
  const mask = document.createElement("div");
  mask.className = "loading-mask";
  mask.innerHTML = `
    <div class="loader-card">
      <div class="spinner"></div>
      <h3>AI正在匹配</h3>
      <p>正在计算平台等级、母婴专项、含餐认证、IoT记录、兰州地域适配、排班稳定性与历史质量权重。</p>
    </div>
  `;
  phoneScreen.appendChild(mask);

  window.setTimeout(() => {
    mask.remove();
    showScreen("match");
  }, 1300);
}

function formatMoney(value) {
  return `¥ ${value.toLocaleString("zh-CN")}`;
}

function renderOrderPlan() {
  const plan = servicePlans[state.planMode];
  if (!plan) return;
  const selectedNurse = nurses.find((nurse) => nurse.id === state.selectedNurseId) || nurses[0];
  const visual = state.planMode === "meal"
    ? {
        src: "./assets/images/postpartum-nutrition.jpg",
        alt: "含餐服务中的营养汤品",
        label: "含餐服务场景",
        title: "三餐两点按已确认的营养与口味需求执行",
        note: "菜单、食材、过敏信息与厨房收尾均写入服务清单",
      }
    : {
        src: "./assets/images/mother-newborn-home.jpg",
        alt: "居家母婴专业照护场景",
        label: "专业照护场景",
        title: "专注妈妈恢复与新生儿日常照护",
        note: "不包含备餐及其他家庭成员家务，服务边界在合同中逐项确认",
      };

  document.querySelectorAll("[data-plan-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.planMode === state.planMode);
  });
  document.querySelectorAll("[data-home-plan]").forEach((button) => {
    button.classList.toggle("active", button.dataset.homePlan === state.planMode);
  });

  const detail = document.querySelector("#planDetailGrid");
  if (detail) detail.innerHTML = plan.features.map((feature) => `<span>✓ ${feature}</span>`).join("");
  const boundary = document.querySelector("#planBoundary");
  if (boundary) boundary.textContent = plan.boundary;
  const title = document.querySelector("#orderPlanTitle");
  if (title) title.textContent = plan.title;
  const meta = document.querySelector("#orderPlanMeta");
  if (meta) meta.textContent = `每日8小时 · 城关区 · ${selectedNurse.name.replace(" 护士", "护理师")}`;
  const visualImage = document.querySelector("#orderPlanImage");
  if (visualImage) {
    if (visualImage.getAttribute("src") !== visual.src) visualImage.src = visual.src;
    visualImage.alt = visual.alt;
  }
  const visualLabel = document.querySelector("#orderVisualLabel");
  if (visualLabel) visualLabel.textContent = visual.label;
  const visualTitle = document.querySelector("#orderVisualTitle");
  if (visualTitle) visualTitle.textContent = visual.title;
  const visualNote = document.querySelector("#orderVisualNote");
  if (visualNote) visualNote.textContent = visual.note;
  const serviceFee = document.querySelector("#serviceFee");
  if (serviceFee) serviceFee.textContent = formatMoney(plan.serviceFee);
  const iotRow = document.querySelector("#iotFeeRow");
  if (iotRow) iotRow.hidden = !state.iotAddon;
  const total = plan.serviceFee + 588 + (state.iotAddon ? 680 : 0);
  const totalFee = document.querySelector("#totalFee");
  if (totalFee) totalFee.textContent = formatMoney(total);
}

function renderCertificationLevel(levelCode) {
  const level = certificationLevels[levelCode];
  if (!level) return;
  document.querySelectorAll("[data-cert-level]").forEach((button) => {
    button.classList.toggle("active", button.dataset.certLevel === levelCode);
  });
  const detail = document.querySelector("#certLevelDetail");
  if (!detail) return;
  detail.innerHTML = `
    <div><span>当前等级</span><b>${level.title}</b></div>
    <p>${level.detail}</p>
    <small>${level.threshold}</small>
  `;
}

function renderIotData() {
  const panel = document.querySelector("#iotDataPanel");
  if (!panel) return;

  const panels = {
    mother: `
      <div class="iot-panel-head"><div><span>产妇 · 智能手环</span><b>连续趋势监测</b></div><em>在线</em></div>
      <div class="vital-grid">
        <div><span>当前心率</span><b>78<small>bpm</small></b><i class="stable">个人基线内</i></div>
        <div><span>血氧饱和度</span><b>98<small>%</small></b><i class="stable">趋势稳定</i></div>
        <div><span>腕温趋势</span><b>+0.2<small>℃</small></b><i class="stable">无持续升高</i></div>
        <div><span>昨夜睡眠</span><b>5.8<small>h</small></b><i class="watch">较基线偏低</i></div>
      </div>
      <div class="trend-chart" aria-label="近12小时心率趋势">
        <div class="trend-head"><span>近12小时心率趋势</span><b>62-91 bpm</b></div>
        <div class="trend-bars">${[42, 48, 51, 46, 55, 63, 58, 68, 61, 56, 53, 50].map((height) => `<i style="--h:${height}%"></i>`).join("")}</div>
      </div>
    `,
    baby: `
      <div class="iot-panel-head"><div><span>新生儿 · 人工复核记录</span><b>设备数据与护理日志合并</b></div><em>已更新</em></div>
      <div class="vital-grid">
        <div><span>最近体温</span><b>36.8<small>℃</small></b><i class="stable">耳温复测</i></div>
        <div><span>24h喂养</span><b>7<small>次</small></b><i class="stable">共计510ml</i></div>
        <div><span>24h尿布</span><b>6<small>次</small></b><i class="stable">已记录</i></div>
        <div><span>近7日体重</span><b>+126<small>g</small></b><i class="watch">按医嘱复查</i></div>
      </div>
      <div class="manual-review-note"><b>最近人工复核</b><p>14:10 张雨婷护理师确认体温测量条件、喂养量与精神反应，暂无紧急红旗表现。</p></div>
    `,
    devices: `
      <div class="iot-panel-head"><div><span>家庭设备</span><b>连接、授权与校准状态</b></div><em>3台在线</em></div>
      <div class="device-list">
        <div><i>01</i><span><b>产妇智能手环</b><small>电量82% · 2分钟前同步 · 消费级设备</small></span><em>在线</em></div>
        <div><i>02</i><span><b>蓝牙体温计</b><small>电量64% · 今日已复测 · 注册信息待运营配置</small></span><em>在线</em></div>
        <div><i>03</i><span><b>婴儿智能体重秤</b><small>电量91% · 昨日校准 · 数据需护理师确认</small></span><em>在线</em></div>
      </div>
    `,
  };

  panel.innerHTML = panels[state.iotTab];
  document.querySelectorAll("[data-iot-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.iotTab === state.iotTab);
  });
}

function renderRegionDetail(regionCode) {
  const region = regionalDistricts[regionCode];
  if (!region) return;
  state.region = regionCode;
  document.querySelectorAll("[data-region]").forEach((button) => {
    button.classList.toggle("active", button.dataset.region === regionCode);
  });
  const detail = document.querySelector("#regionDetail");
  if (!detail) return;
  detail.innerHTML = `
    <div class="region-detail-head">
      <div><span>当前服务圈</span><b>${region.name}</b></div>
      <em>${region.availability}</em>
    </div>
    <div class="region-metrics">
      <div><b>${region.nurses}</b><span>认证护理师</span></div>
      <div><b>${region.distance}</b><span>示例平均距离</span></div>
      <div><b>${region.response}</b><span>示例响应</span></div>
    </div>
    <div class="region-coverage">${region.coverage.map((area) => `<span>${area}</span>`).join("")}</div>
    <p>${region.insight}</p>
  `;
}

function showToast(message) {
  document.querySelector(".prototype-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "prototype-toast";
  toast.textContent = message;
  document.querySelector(".phone-screen")?.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2400);
}

document.addEventListener("click", (event) => {
  const homePlanTarget = event.target.closest("[data-home-plan]");
  if (homePlanTarget) {
    state.planMode = homePlanTarget.dataset.homePlan;
    document.querySelectorAll("[data-home-plan]").forEach((button) => button.classList.toggle("active", button === homePlanTarget));
    renderOrderPlan();
    showScreen("order");
    return;
  }

  const planTarget = event.target.closest("[data-plan-mode]");
  if (planTarget) {
    state.planMode = planTarget.dataset.planMode;
    renderOrderPlan();
    return;
  }

  const levelTarget = event.target.closest("[data-cert-level]");
  if (levelTarget) {
    renderCertificationLevel(levelTarget.dataset.certLevel);
    return;
  }

  const iotTabTarget = event.target.closest("[data-iot-tab]");
  if (iotTabTarget) {
    state.iotTab = iotTabTarget.dataset.iotTab;
    renderIotData();
    return;
  }

  const regionTarget = event.target.closest("[data-region]");
  if (regionTarget) {
    renderRegionDetail(regionTarget.dataset.region);
    return;
  }

  const enrollTarget = event.target.closest("[data-enroll-course]");
  if (enrollTarget) {
    showToast(`已打开“${enrollTarget.dataset.enrollCourse}”课程咨询（原型演示）`);
    return;
  }

  const alertAction = event.target.closest(".iot-alert-card button");
  if (alertAction) {
    showToast(alertAction.classList.contains("active") ? "已提交护理师复核，预计15分钟内响应" : "已展开近12小时趋势（原型演示）");
    return;
  }

  const serviceAction = event.target.closest("[data-service-action]");
  if (serviceAction) {
    showToast(serviceAction.dataset.serviceAction === "report" ? "异常反馈工单已创建（原型演示）" : "今日服务已确认并进入质量回传");
    return;
  }

  const nurseTarget = event.target.closest("[data-open-nurse]");
  if (nurseTarget) {
    openNurseProfile(Number(nurseTarget.dataset.openNurse), nurseTarget.dataset.origin || "nurseDirectory");
    return;
  }

  const filterTarget = event.target.closest("[data-nurse-filter]");
  if (filterTarget) {
    document.querySelectorAll("[data-nurse-filter]").forEach((button) => button.classList.toggle("active", button === filterTarget));
    renderNurseDirectory(filterTarget.dataset.nurseFilter);
    return;
  }

  const backTarget = event.target.closest("[data-back]");
  if (backTarget) {
    goBack();
    return;
  }

  const goTarget = event.target.closest("[data-go]");
  if (goTarget) {
    showScreen(goTarget.dataset.go);
    return;
  }

  const navItem = event.target.closest(".nav-item");
  if (navItem) {
    showScreen(navItem.dataset.screen);
    return;
  }

  const choice = event.target.closest(".choice");
  if (choice) {
    const card = choice.closest(".question-card");
    const group = card.dataset.group;
    const isMulti = card.dataset.type === "multi";
    if (isMulti) {
      choice.classList.toggle("selected");
      state[group] = [...card.querySelectorAll(".choice.selected")].map((item) => item.dataset.value);
    } else {
      state[group] = choice.dataset.value;
      card.querySelectorAll(".choice").forEach((item) => item.classList.remove("selected"));
      choice.classList.add("selected");
    }
    if (group === "mealService") {
      state.planMode = ["withMeals", "specialDiet"].includes(choice.dataset.value) ? "meal" : "care";
      renderOrderPlan();
    }
    if (group === "iotService") {
      state.iotAddon = choice.dataset.value !== "manualOnly";
      const addon = document.querySelector("#iotAddon");
      if (addon) addon.checked = state.iotAddon;
      renderOrderPlan();
    }
    updateProgress();
  }
});

document.querySelector("#startMatchBtn")?.addEventListener("click", showLoadingThenMatch);
document.querySelector("#iotAddon")?.addEventListener("change", (event) => {
  state.iotAddon = event.target.checked;
  renderOrderPlan();
});
document.querySelector("#refreshIotBtn")?.addEventListener("click", () => {
  renderIotData();
  showToast("设备数据已同步，护理师复核状态无变化");
});

document.querySelectorAll(".screen-view").forEach((screen) => {
  const header = screen.querySelector(":scope > .page-top");
  const updateHeaderState = () => {
    header?.classList.toggle("scrolled", screen.scrollTop > 4);
    const current = navigationStack.at(-1);
    if (current?.screen === screen.id.replace("screen-", "")) current.scrollTop = screen.scrollTop;
  };
  screen.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();
});

updateProgress();
renderNurses();
renderNurseDirectory();
renderOrderPlan();
renderCertificationLevel("M3");
renderIotData();
renderRegionDetail("chengguan");
updatePrototypeScale();

const requestedScreen = new URLSearchParams(window.location.search).get("screen");
initializeNavigation(requestedScreen || "home");
