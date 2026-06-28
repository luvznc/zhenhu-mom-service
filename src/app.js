const state = {};

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
    hospital: "兰州某三甲医院产科",
    education: "护理学本科",
    license: "护士执业证书 · 尾号3287",
    verificationDate: "2026-05-18",
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
    filters: ["premature", "recovery", "available"],
    tags: ["擅长早产儿护理", "急救实操", "夜间稳定", "低体重儿喂养"],
    training: ["新生儿复苏专项培训", "母婴居家风险识别", "基础生命支持培训"],
    services: ["早产儿出院后日常观察", "低体重儿喂养记录", "剖宫产术后生活护理", "母乳喂养支持", "新生儿脐部与皮肤护理", "夜间照护交接"],
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
    hospital: "兰州某妇幼保健机构",
    education: "护理学本科",
    license: "护士执业证书 · 尾号6152",
    verificationDate: "2026-05-21",
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
    filters: ["lactation", "available"],
    tags: ["黄疸观察", "母乳指导", "家庭沟通", "标准化日志"],
    training: ["母乳喂养支持培训", "新生儿常见风险识别", "护理文书规范"],
    services: ["含接与哺乳姿势指导", "喂养量与排泄记录", "黄疸观察及复查提醒", "乳房基础护理指导", "新生儿日常护理", "家庭照护者培训"],
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
    hospital: "兰州某综合医院妇产科",
    education: "护理学大专",
    license: "护士执业证书 · 尾号9046",
    verificationDate: "2026-05-12",
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
    training: ["产褥期护理培训", "新生儿安全照护", "家庭沟通与隐私保护"],
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
    hospital: "甘肃某三级医院妇产科",
    education: "护理学本科",
    license: "护士执业证书 · 尾号4721",
    verificationDate: "2026-05-23",
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
    filters: ["premature", "recovery", "available"],
    tags: ["双胎照护", "高危风险识别", "产后恢复", "夜间照护"],
    training: ["妇产科专科护理", "新生儿复苏专项培训", "高危产妇风险识别"],
    services: ["双胎喂养与作息协同", "高危产后观察记录", "剖宫产恢复支持", "新生儿基础护理", "家庭夜间照护方案", "异常就医提醒"],
    experience: [
      ["2020-至今", "三级医院妇产科主管护师", "参与高危产妇护理、质量管理与新护士带教。"],
      ["2017-2020", "妇产科护师", "积累围产期观察、双胎家庭宣教及产后护理经验。"],
      ["平台认证", "高风险场景专项评估", "通过风险识别、升级转诊和多照护者协同评估。"],
    ],
    reason: "专业年限与高危风险识别能力突出，适合双胎或需要更强观察与家庭协同的服务场景。",
  },
];

function showScreen(screenName) {
  document.querySelectorAll(".screen-view").forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${screenName}`);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === screenName);
  });

  document.querySelector(`#screen-${screenName}`)?.scrollTo({ top: 0, behavior: "instant" });
}

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

  list.innerHTML = nurses
    .map(
      (nurse, index) => `
        <article class="nurse-card ${index === 0 ? "featured" : ""}" data-nurse-id="${nurse.id}">
          <div class="nurse-top">
            <div class="avatar">${nurse.name.slice(0, 1)}</div>
            <div class="nurse-main">
              <h3>${nurse.name}</h3>
              <p>${nurse.school}</p>
              <p>${nurse.direction} · ${nurse.years}</p>
              <p>${nurse.district}</p>
            </div>
            <div class="score">
              <b>${nurse.score}</b>
              <small>匹配分</small>
            </div>
          </div>
          <div class="nurse-quality-row">
            <span>本地化优势</span>
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
            <span>资质、评价、可约时间均可核验</span>
            <button data-open-nurse="${nurse.id}" data-origin="match">查看详情</button>
          </div>
        </article>
      `
    )
    .join("");

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
              <div class="name-line"><h3>${nurse.name}</h3><span>✓ 已核验</span></div>
              <p>${nurse.title} · ${nurse.years} · ${nurse.local}</p>
              <p>${nurse.hospital} · ${nurse.education}</p>
            </div>
          </div>
          <div class="credential-summary">
            <span><b>执业注册</b>${nurse.license}</span>
            <span><b>最近核验</b>${nurse.verificationDate}</span>
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
    ["平台能力评估", nurse.training.join(" / "), `最近核验 ${nurse.verificationDate}`],
  ]
    .map(([label, value, status]) => `<div><span>${label}</span><b>${value}</b><small>✓ ${status}</small></div>`)
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
  document.querySelector("#profileTags").innerHTML = nurse.tags.concat(nurse.training).map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector("#profileExperience").innerHTML = nurse.experience
    .map(([period, title, detail]) => `<div><i></i><span>${period}</span><b>${title}</b><p>${detail}</p></div>`)
    .join("");
  document.querySelector("#profileServices").innerHTML = nurse.services.map((service) => `<span>✓ ${service}</span>`).join("");
  document.querySelector("#profileQuality").innerHTML = renderQualityBars(nurse);

  const isMatch = origin === "match";
  document.querySelector("#profileReasonTitle").textContent = isMatch ? "AI推荐解释" : "档案说明";
  document.querySelector("#profileReason").textContent = isMatch
    ? nurse.reason
    : "平台档案展示基于脱敏后的资质材料、专项能力评估和历史履约记录。能否承接本次服务，还需结合家庭风险评估、服务项目适宜性与护士实时排班确认。";
  document.querySelector("#nurseBackBtn").dataset.go = origin;
  document.querySelector("#profileListBtn").dataset.go = origin;
  document.querySelector("#profileListBtn").textContent = isMatch ? "返回匹配" : "返回护士库";
  showScreen("nurse");
}

function showLoadingThenMatch() {
  const phoneScreen = document.querySelector(".phone-screen");
  const mask = document.createElement("div");
  mask.className = "loading-mask";
  mask.innerHTML = `
    <div class="loader-card">
      <div class="spinner"></div>
      <h3>AI正在匹配</h3>
      <p>正在计算专业能力、距离、排班稳定性、历史满意度与风险标签权重。</p>
    </div>
  `;
  phoneScreen.appendChild(mask);

  window.setTimeout(() => {
    mask.remove();
    showScreen("match");
  }, 1300);
}

document.addEventListener("click", (event) => {
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
    updateProgress();
  }
});

document.querySelector("#startMatchBtn")?.addEventListener("click", showLoadingThenMatch);

updateProgress();
renderNurses();
renderNurseDirectory();
