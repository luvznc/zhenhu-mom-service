const state = {};

const nurses = [
  {
    id: 1,
    name: "张雨婷 护士",
    school: "兰州本地护士学校毕业",
    direction: "早产儿护理 / 剖宫产恢复",
    years: "6年产科经验",
    district: "城关区 4.2km",
    score: 96,
    predict: "预计满意度 94%",
    tags: ["擅长早产儿护理", "急救实操", "夜间稳定", "低体重儿喂养"],
    reason:
      "当前新生儿状态触发“早产儿/低体重儿”动态权重；该护士过往同类家庭满意度高，且服务区域接近。",
  },
  {
    id: 2,
    name: "李佳宁 护士",
    school: "兰州职业院校母婴护理方向",
    direction: "母乳喂养指导 / 黄疸观察",
    years: "5年妇幼护理经验",
    district: "七里河区 7.8km",
    score: 91,
    predict: "预计满意度 90%",
    tags: ["黄疸观察", "母乳指导", "家庭沟通", "标准化日志"],
    reason:
      "适合需要持续健康指标记录的家庭；护理日志完整率高，便于平台过程监管。",
  },
  {
    id: 3,
    name: "马欣 护士",
    school: "本地妇幼合作培训认证",
    direction: "产后恢复 / 新生儿日常护理",
    years: "4年居家护理经验",
    district: "安宁区 9.1km",
    score: 87,
    predict: "预计满意度 88%",
    tags: ["产后恢复", "家庭协作", "情绪安抚", "轻症预警"],
    reason:
      "适合常规产后恢复与家庭协作场景，可作为预算敏感家庭的备选推荐。",
  },
];

function showScreen(screenName) {
  document.querySelectorAll(".screen-view").forEach((screen) => {
    screen.classList.toggle("active", screen.id === `screen-${screenName}`);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.screen === screenName);
  });
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
            <button data-go="nurse">查看详情</button>
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

    card.addEventListener("dblclick", () => showScreen("nurse"));
  });
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
