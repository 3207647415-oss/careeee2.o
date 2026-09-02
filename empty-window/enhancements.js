/* 职路导航增量功能：保留 app.js 原有路由、测评与数据逻辑。 */
(function () {
  "use strict";
  var ONBOARDING_KEY = "zhilu_onboarding_v1";
  var ACTION_KEY = "zhilu_action_progress_v1";
  var MIND_CHECK_KEY = "zhilu_mind_review_draft_v1";
  var GUIDE_PROFILE_KEY = "zhilu_smart_guide_profile_v2";
  var GUIDE_PROGRESS_KEY = "zhilu_smart_guide_progress_v1";

  DATA.trackComparison = {
    kaoyan: { label: "考研", time: "2—3 年（备考 + 硕士阶段）", cost: "中等：备考资料、学费与机会成本", stability: "中等：取决于专业、学校与就业选择", salary: "中高：学历与专业深度可抬高起点", threshold: "较高：初试、复试与长期学习投入", color: "blue" },
    job: { label: "就业", time: "3—6 个月起步，边做边升级", cost: "较低：主要是求职、学习与试错成本", stability: "中等：受行业、城市和能力影响", salary: "中高：与行业、项目成果强相关", threshold: "中等：作品/项目/实习比证书更关键", color: "emerald" },
    gong: { label: "考公", time: "6—18 个月，视岗位与备考节奏", cost: "中低：课程资料与时间机会成本", stability: "高：录用后工作节奏和保障较稳定", salary: "中等：地区、层级和岗位差异较大", threshold: "较高：专业、应届、政治面貌等条件需核验", color: "violet" },
    startup: { label: "创业", time: "不确定：通常需要持续验证", cost: "高：资金、时间与机会成本并存", stability: "低：现金流和市场波动显著", salary: "高但波动大：上限取决于产品与市场", threshold: "高：需产品、资源整合和风险承受能力", color: "amber" }
  };

  DATA.pitfalls = {
    kaoyan: [
      ["把考研当作逃避就业", "先写下目标岗位的学历要求；若岗位并不需要硕士，优先验证实习和项目路径。"],
      ["只看学校名气，不看研究方向", "同时比对导师课题、课程、实习城市和毕业去向，至少保留一所稳妥院校。"],
      ["后期才准备复试", "从备考中期开始积累英语表达、专业问答、项目或科研素材。"]
    ],
    job: [
      ["只海投，不建立作品证据", "每周完成一个可展示成果：项目链接、案例复盘、数据分析或作品集页面。"],
      ["只追热门岗位", "用行业、城市、岗位要求和可迁移技能做筛选，准备 2—3 个相邻岗位。"],
      ["把实习当作经历清单", "每段实习都记录目标、行动、数据结果，转成简历 STAR 素材。"]
    ],
    gong: [
      ["先报班，后看职位表", "先筛专业、学历、基层经历、政治面貌和地域限制，再确定备考投入。"],
      ["只盯国考，错过省考和事业单位", "做一份年度公告日历，按目标城市同步追踪多个机会。"],
      ["只刷题，不复盘", "按模块记录错误原因和耗时，每周用真题做一次限时诊断。"]
    ]
  };

  DATA.actionTemplates = {
    kaoyan: ["确定 3 所目标院校，核对专业目录与参考书", "完成本周英语与专业课学习计划", "整理一份复试素材：项目、论文或竞赛经历", "预约与学长学姐或导师方向的真实信息访谈"],
    job: ["明确 2 个目标岗位和 10 家目标公司", "完成一份结果导向简历并找同学模拟修改", "补齐一个可公开展示的项目或作品", "投递 10 个匹配岗位并复盘反馈"],
    gong: ["下载并筛选目标地区职位表", "完成一套行测限时诊断并记录薄弱模块", "每周精练 2 篇申论材料与 1 篇大作文", "建立国考、省考、事业单位公告提醒清单"],
    startup: ["写清一个用户问题与目标用户画像", "访谈 5 位潜在用户，验证真实需求", "做一个最小可用方案或落地页", "记录成本、收入假设和停止条件"]
  };

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function getJSON(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch (e) { return fallback; } }
  function saveJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function timeline(majorName, track) {
    var common = {
      kaoyan: [["大一：建立基础", "稳住绩点；完成英语与专业基础；参加一次学科/创新类比赛。"], ["大二：探索方向", "确定细分研究方向；尝试科研助理、课程项目或竞赛；收集院校信息。"], ["大三：集中准备", "完成院校梯度；系统复习公共课与专业课；准备夏令营/预推免或初试。"], ["大四：上岸与衔接", "完成复试与调剂预案；强化项目/论文表达；确认导师与研究计划。"]],
      job: [["大一：技能打底", "完成专业核心课；建立作品归档；体验社团项目或校内岗位。"], ["大二：小步试岗", "至少参加一次比赛；完成 1 个可展示项目；尝试短期实习或企业实践。"], ["大三：形成竞争力", "锁定目标岗位；完成 1—2 段高相关实习；把成果沉淀到简历与作品集。"], ["大四：求职冲刺", "每周稳定投递与面试复盘；准备相邻岗位；争取转正或校招 offer。"]],
      gong: [["大一：条件盘点", "了解专业可报岗位；保持成绩与纪律记录；参与志愿、学生工作或基层实践。"], ["大二：能力积累", "训练阅读、写作与数据处理；关注选调、基层项目条件；建立公告日历。"], ["大三：岗位筛选", "下载往年职位表；开始模块化行测和申论训练；补齐证书/政治面貌等条件。"], ["大四：报考执行", "按职位表报名；真题限时训练、结构化面试模拟；并行保留就业备选方案。"]]
    };
    var list = common[track] || common.job;
    return '<section class="mt-5 rounded-3xl border border-blue-100 bg-blue-50/50 p-5 md:p-6"><div class="mb-5 flex flex-wrap items-center justify-between gap-2"><div><h3 class="text-xl font-black text-slate-950">' + esc(majorName) + ' · 分阶段成长路线图</h3><p class="mt-1 text-sm text-slate-600">每个阶段只抓最能提升下一步选择权的事。</p></div><span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand">' + DATA.trackComparison[track].label + '路线</span></div><ol class="relative ml-2 border-l-2 border-blue-200 pl-6">' + list.map(function (x) { return '<li class="relative pb-5 last:pb-0"><i class="timeline-dot"></i><p class="font-bold text-slate-900">' + x[0] + '</p><p class="mt-1 text-sm leading-6 text-slate-600">' + x[1] + '</p></li>'; }).join("") + '</ol></section>';
  }

  function appendTimeline(containerId, track) {
    var box = document.getElementById(containerId);
    if (!box || box.querySelector("[data-growth-timeline]")) return;
    var searchId = track + "-search";
    var major = typeof matchMajor === "function" ? matchMajor((document.getElementById(searchId) || {}).value || "") : null;
    var name = major && typeof majorNameByData === "function" ? majorNameByData(major) : "当前专业";
    var wrap = document.createElement("div");
    wrap.setAttribute("data-growth-timeline", "true");
    wrap.innerHTML = timeline(name, track);
    box.appendChild(wrap);
  }

  function renderCompare() {
    var box = document.getElementById("compare-content");
    if (!box) return;
    var keys = Object.keys(DATA.trackComparison);
    var currentA = (box.dataset.a && DATA.trackComparison[box.dataset.a]) ? box.dataset.a : "kaoyan";
    var currentB = (box.dataset.b && DATA.trackComparison[box.dataset.b]) ? box.dataset.b : "job";
    function options(selected) { return keys.map(function (k) { return '<option value="' + k + '"' + (k === selected ? " selected" : "") + '>' + DATA.trackComparison[k].label + '</option>'; }).join(""); }
    var a = DATA.trackComparison[currentA], b = DATA.trackComparison[currentB];
    var rows = [["时间成本", "time"], ["经济成本", "cost"], ["稳定性", "stability"], ["薪资上限", "salary"], ["报考 / 入行门槛", "threshold"]];
    box.dataset.a = currentA; box.dataset.b = currentB;
    box.innerHTML = '<div class="data-card"><div class="grid gap-4 md:grid-cols-2"><label class="text-sm font-bold text-slate-700">赛道 A<select id="compare-a" class="field mt-2 w-full">' + options(currentA) + '</select></label><label class="text-sm font-bold text-slate-700">赛道 B<select id="compare-b" class="field mt-2 w-full">' + options(currentB) + '</select></label></div><p class="mt-4 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">提示：这里呈现的是决策维度，不是标准答案。请把你的家庭支持、城市意愿、专业条件和风险承受度一起考虑。</p></div><div class="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white"><table class="w-full text-left text-sm"><thead class="bg-slate-50"><tr><th class="p-4 font-bold text-slate-500">维度</th><th class="p-4 font-black text-slate-950">' + a.label + '</th><th class="p-4 font-black text-slate-950">' + b.label + '</th></tr></thead><tbody>' + rows.map(function (r) { return '<tr class="border-t border-slate-100"><th class="p-4 font-bold text-slate-700">' + r[0] + '</th><td class="p-4 leading-6 text-slate-600">' + a[r[1]] + '</td><td class="p-4 leading-6 text-slate-600">' + b[r[1]] + '</td></tr>'; }).join("") + '</tbody></table></div>';
  }

  function renderPitfalls() {
    var box = document.getElementById("pitfalls-content"); if (!box) return;
    box.innerHTML = '<div class="grid gap-5 lg:grid-cols-3">' + ["kaoyan", "job", "gong"].map(function (track) { var d = DATA.trackComparison[track]; return '<article class="data-card"><span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-brand">' + d.label + '</span><h3 class="mt-3 text-xl font-black text-slate-950">别用惯性做选择</h3><div class="mt-4 space-y-4">' + DATA.pitfalls[track].map(function (p) { return '<div class="rounded-2xl bg-slate-50 p-4"><p class="font-bold text-slate-900">误区：' + p[0] + '</p><p class="mt-2 text-sm leading-6 text-slate-600">校正：' + p[1] + '</p></div>'; }).join("") + '</div><button class="link-btn mt-5" data-nav="' + track + '">查看' + d.label + '路线</button></article>'; }).join("") + '</div>';
  }

  function actionSection(track) {
    var saved = getJSON(ACTION_KEY, {}); var items = DATA.actionTemplates[track] || DATA.actionTemplates.job;
    return '<section class="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5"><div class="flex flex-wrap items-center justify-between gap-2"><div><h3 class="text-xl font-black text-slate-950">下一步行动清单</h3><p class="mt-1 text-sm text-slate-600">勾选会自动保存在当前浏览器。</p></div><span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700">先完成一件小事</span></div><div class="mt-4 grid gap-2">' + items.map(function (item, i) { var id = track + "-" + i; return '<label class="flex cursor-pointer items-start gap-3 rounded-xl bg-white p-3 text-sm text-slate-700"><input class="mt-1 h-4 w-4 accent-emerald-600" type="checkbox" data-action-id="' + id + '"' + (saved[id] ? " checked" : "") + '><span>' + item + '</span></label>'; }).join("") + '</div></section>';
  }

  function injectActionList() {
    var box = document.getElementById("quiz-card");
    if (!box || box.querySelector("[data-action-id]")) return;
    var scores = typeof computeBaseScores === "function" ? computeBaseScores() : {};
    var top = Object.keys(scores).sort(function (a, b) { return scores[b] - scores[a]; })[0] || "job";
    box.insertAdjacentHTML("beforeend", actionSection(top));
  }

  function enrichIndustries() {
    DATA.industries.forEach(function (item) {
      if (item.careerPath) return;
      var tech = /互联网|人工智能|半导体|软件|新能源|制造|化工|生物医药/.test(item.name);
      var stable = /公务员|教育|医疗|法律/.test(item.name);
      item.careerPath = tech ? "助理/实习生 → 初级工程师 → 核心项目负责人 → 专家/技术管理" : stable ? "基层执行岗 → 业务骨干 → 专业负责人 → 管理/专家岗位" : "助理 → 专员 → 高级专员/主管 → 经理 → 业务负责人";
      item.longTermRisk = tech ? "技术迭代快，基础重复性工作可能被工具替代；要持续沉淀项目能力。" : stable ? "准入和政策变化会影响机会；需长期维护专业资质与合规能力。" : "行业周期和岗位同质化会影响机会；应积累可迁移的业务与数据能力。";
      item.switchDifficulty = tech ? "中等：技能可迁移到相邻技术或产品岗位，但需要作品证明。" : stable ? "较高：行业资格、专业背景或组织经验往往不可快速复制。" : "中等：可从相邻行业/岗位切入，关键在于拿出可验证成果。";
    });
  }

  function enhanceIndustryCards() {
    var list = document.getElementById("industry-list"); if (!list) return;
    DATA.industries.forEach(function (item) {
      var card = list.querySelector('[data-industry="' + item.name + '"]');
      if (!card || card.querySelector("[data-industry-extra]")) return;
      var detail = card.querySelector(".border-t"); if (!detail) return;
      detail.insertAdjacentHTML("beforeend", '<div data-industry-extra class="mt-4 grid gap-2 rounded-2xl bg-blue-50 p-3 text-sm leading-6 text-slate-700"><p><b>晋升路径：</b>' + item.careerPath + '</p><p><b>长期风险：</b>' + item.longTermRisk + '</p><p><b>转行难度：</b>' + item.switchDifficulty + '</p></div>');
    });
  }

  function setupOnboarding() {
    var modal = document.getElementById("onboarding-modal"); if (!modal || localStorage.getItem(ONBOARDING_KEY)) return;
    var step = 1, stage = "";
    function show() {
      modal.classList.remove("hidden"); modal.classList.add("flex");
      document.getElementById("onboarding-step").textContent = "新手引导 · " + step + "/2";
      document.getElementById("onboarding-title").textContent = step === 1 ? "你现在处在哪个阶段？" : "此刻最困扰你的是什么？";
      document.getElementById("onboarding-desc").textContent = step === 1 ? "选择后，我们会给你一个更合适的起点。" : "没有标准答案，按你当前最需要的帮助选择即可。";
      var opts = step === 1 ? [["大一/大二", "先探索自己与专业"], ["大三", "开始做方向选择"], ["大四/毕业阶段", "需要落地的行动计划"]] : [["方向迷茫", "先做测评，再了解行业"], ["已有目标", "直接查看对应赛道的路线图"]];
      document.getElementById("onboarding-options").innerHTML = opts.map(function (x, i) { return '<button class="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-brand hover:bg-blue-50" data-onboard="' + i + '"><b class="block text-slate-950">' + x[0] + '</b><span class="mt-1 block text-sm text-slate-500">' + x[1] + '</span></button>'; }).join("");
    }
    modal.addEventListener("click", function (e) { var btn = e.target.closest("[data-onboard]"); if (!btn) return; if (step === 1) { stage = btn.dataset.onboard; step = 2; show(); } else { var target = btn.dataset.onboard === "0" ? "quiz" : (stage === "0" ? "industry" : stage === "1" ? "compare" : "job"); localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ stage: stage, concern: btn.dataset.onboard, time: Date.now() })); modal.classList.add("hidden"); modal.classList.remove("flex"); route(target); } });
    document.getElementById("onboarding-skip").addEventListener("click", function () { localStorage.setItem(ONBOARDING_KEY, "skipped"); modal.classList.add("hidden"); modal.classList.remove("flex"); });
    show();
  }

  function setupMindChecklist() {
    var saved = getJSON(MIND_CHECK_KEY, {});
    document.querySelectorAll("[data-mind-check]").forEach(function (box) {
      box.checked = !!saved[box.dataset.mindCheck];
    });
  }

  function getGuideProfile() { return getJSON(GUIDE_PROFILE_KEY, null); }
  function leaveLinearGuide() { var profile = getGuideProfile() || {}; profile.mode = "free"; saveJSON(GUIDE_PROFILE_KEY, profile); removeGuideBar(); }
  function advanceLinearGuide(page) { var profile = getGuideProfile() || {}; profile.step = page; saveJSON(GUIDE_PROFILE_KEY, profile); route(page); }
  function removeGuideBar() { var bar = document.getElementById("linear-guide-bar"); if (bar) bar.remove(); }

  function renderGuideBar(page) {
    removeGuideBar();
    var profile = getGuideProfile();
    var flow = { mind: ["industry", "完成自我梳理，前往行业认知"], industry: ["quiz", "完成行业浏览，前往职业测评"] };
    if (!profile || profile.mode !== "linear" || !flow[page]) return;
    var next = flow[page];
    var bar = document.createElement("div");
    bar.id = "linear-guide-bar";
    bar.className = "fixed inset-x-0 bottom-0 z-40 border-t border-blue-100 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,.08)] backdrop-blur";
    bar.innerHTML = '<div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 sm:flex-row"><p class="text-sm font-semibold text-slate-600">迷茫引导 · ' + (page === "mind" ? "第 1 步 / 3" : "第 2 步 / 3") + '</p><div class="flex gap-2"><button data-guide-exit class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition active:scale-95">自由浏览</button><button data-guide-next="' + next[0] + '" class="rounded-xl bg-gradient-to-r from-[#1677ff] to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition active:scale-95">' + next[1] + ' →</button></div></div>';
    document.body.appendChild(bar);
  }

  function showGuideOnboarding() {
    if (localStorage.getItem(GUIDE_PROFILE_KEY)) return;
    var modal = document.createElement("div");
    modal.id = "smart-guide-modal";
    modal.className = "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm";
    var step = 1, identity = "", status = "";
    function saveGuideProgress() { saveJSON(GUIDE_PROGRESS_KEY, { step: step, identity: identity, status: status, time: Date.now() }); }
    function render() {
      var choices = step === 1 ? [["大一大二探索期", "先探索兴趣、能力与专业可能性"], ["大三大四应届生", "开始收敛方向，准备下一步选择"], ["往届备考人群", "重新评估投入、目标与备选方案"]] : [["完全迷茫无发展方向", "从认识自己与外部世界开始"], ["已有目标仅需要资源", "自由查阅并验证自己的计划"]];
      var isFinal = step === 3;
      modal.innerHTML = '<div class="guide-panel w-full max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-6 shadow-2xl backdrop-blur-xl md:p-10"><div class="mb-8 flex items-center justify-between"><span class="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-brand">专属引导 · ' + step + ' / 3</span><button data-guide-free class="text-sm font-bold text-slate-400 hover:text-rose-500">退出</button></div><p class="text-sm font-bold text-brand">职路导航，为你减少第一步的压力</p><h2 class="mt-2 text-3xl font-black text-slate-950">' + (step === 1 ? "你目前处在哪个阶段？" : step === 2 ? "你现在最需要哪种帮助？" : "将为你匹配专属规划路线") + '</h2><p class="mt-3 text-slate-600">' + (step === 1 ? "不需要做完美判断，按你此刻的情况选择即可。" : step === 2 ? "选择后会为你安排最适合的浏览方式。" : "从一个小行动开始，路线会在真实反馈中逐渐清晰。") + '</p>' + (isFinal ? '<button data-guide-start class="mt-8 rounded-2xl bg-gradient-to-r from-[#1677ff] to-blue-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200/70 transition hover:-translate-y-0.5 active:scale-95">开启规划之旅</button>' : '<div class="mt-7 grid gap-3">' + choices.map(function (item, i) { return '<button data-guide-choice="' + i + '" class="guide-choice rounded-2xl border border-slate-200 bg-white p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#1677ff] hover:bg-blue-50"><b class="block text-slate-950">' + item[0] + '</b><span class="mt-1 block text-sm text-slate-500">' + item[1] + '</span></button>'; }).join("") + '</div>') + '</div>';
    }
    function renderResume() {
      var prog = getJSON(GUIDE_PROGRESS_KEY, null);
      var label = prog && prog.step ? "第 " + prog.step + " / 3 步" : "上次进度";
      modal.innerHTML = '<div class="guide-panel w-full max-w-lg rounded-3xl border border-white/60 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-xl"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">↺</div><h2 class="text-2xl font-black text-slate-950">继续上次的引导？</h2><p class="mt-3 leading-7 text-slate-600">检测到你上次进行到 ' + label + '，进度已保存。</p><div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"><button data-guide-resume class="rounded-xl bg-gradient-to-r from-[#1677ff] to-blue-500 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 active:scale-95">继续上次</button><button data-guide-fresh class="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:border-brand hover:text-brand">重新开始</button></div></div>';
    }
    modal.addEventListener("click", function (e) {
      var free = e.target.closest("[data-guide-free]");
      if (free) { saveGuideProgress(); modal.remove(); return; }
      if (e.target.closest("[data-guide-resume]")) { var p = getJSON(GUIDE_PROGRESS_KEY, null); if (p) { step = p.step || 1; identity = p.identity || ""; status = p.status || ""; } render(); return; }
      if (e.target.closest("[data-guide-fresh]")) { localStorage.removeItem(GUIDE_PROGRESS_KEY); step = 1; identity = ""; status = ""; render(); return; }
      var choice = e.target.closest("[data-guide-choice]");
      if (choice) { choice.classList.add("border-[#1677ff]", "bg-blue-50", "scale-[1.02]", "shadow-[0_0_0_4px_rgba(22,119,255,.10)]"); window.setTimeout(function () { if (step === 1) { identity = choice.dataset.guideChoice; step = 2; } else { status = choice.dataset.guideChoice; step = 3; } saveGuideProgress(); render(); }, 260); return; }
      if (e.target.closest("[data-guide-start]")) { var lost = status === "0"; localStorage.removeItem(GUIDE_PROGRESS_KEY); saveJSON(GUIDE_PROFILE_KEY, { identity: identity, mode: lost ? "linear" : "free", step: lost ? "mind" : "home", completed: true }); modal.remove(); route(lost ? "mind" : "home"); }
    });
    document.body.appendChild(modal);
    var prog = getJSON(GUIDE_PROGRESS_KEY, null);
    if (prog && prog.step) { renderResume(); } else { render(); }
  }

  function showGuideRecommendation() {
    var profile = getGuideProfile(); if (!profile || profile.mode !== "linear") return;
    var scores = typeof computeBaseScores === "function" ? computeBaseScores() : {};
    var result = typeof applyVisitWeights === "function" ? applyVisitWeights(scores).weighted : scores;
    var top = Object.keys(result).sort(function (a, b) { return result[b] - result[a]; })[0] || "job";
    var page = top === "startup" ? "job" : top;
    var plan = (DATA.actionTemplates[top] || DATA.actionTemplates.job).slice(0, 3);
    var old = document.getElementById("guide-result-modal"); if (old) old.remove();
    var modal = document.createElement("div"); modal.id = "guide-result-modal"; modal.className = "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm";
    modal.innerHTML = '<div class="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8"><span class="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">第 3 步完成</span><h2 class="mt-4 text-2xl font-black text-slate-950">你的下一站：' + (TRACKS[top] || "就业") + '资源专区</h2><p class="mt-2 leading-7 text-slate-600">报告已经生成。先按这份阶段行动计划迈出第一步，再根据反馈调整方向。</p><div class="mt-5 space-y-2">' + plan.map(function (x, i) { return '<p class="rounded-xl bg-slate-50 p-3 text-sm text-slate-700"><b class="text-brand">' + (i + 1) + '.</b> ' + x.replace(/<[^>]*>/g, "") + '</p>'; }).join("") + '</div><div class="mt-6 flex flex-col gap-3 sm:flex-row"><button data-guide-resource="' + page + '" class="rounded-xl bg-gradient-to-r from-[#1677ff] to-blue-500 px-5 py-3 font-bold text-white active:scale-95">查看匹配资源</button><button data-guide-exit class="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 active:scale-95">自由浏览</button></div></div>';
    document.body.appendChild(modal);
  }

  var baseRoute = window.route;
  window.route = function (page) { var profile = getGuideProfile(); if (profile && profile.mode === "linear" && profile.step && page !== profile.step) { page = profile.step; } baseRoute(page); if (page === "kaoyan" || page === "job" || page === "gong") appendTimeline(page + "-content", page); if (page === "compare") renderCompare(); if (page === "pitfalls") renderPitfalls(); if (page === "industry") setTimeout(enhanceIndustryCards, 0); renderGuideBar(page); };
  var baseResult = window.renderResult;
  window.renderResult = function () { baseResult(); injectActionList(); showGuideRecommendation(); };

  document.addEventListener("change", function (e) { if (e.target.matches("[data-action-id]")) { var saved = getJSON(ACTION_KEY, {}); saved[e.target.dataset.actionId] = e.target.checked; saveJSON(ACTION_KEY, saved); } if (e.target.matches("[data-mind-check]")) { var draft = getJSON(MIND_CHECK_KEY, {}); draft[e.target.dataset.mindCheck] = e.target.checked; saveJSON(MIND_CHECK_KEY, draft); } if (e.target.id === "compare-a" || e.target.id === "compare-b") { var box = document.getElementById("compare-content"); box.dataset.a = document.getElementById("compare-a").value; box.dataset.b = document.getElementById("compare-b").value; renderCompare(); } });
  document.addEventListener("input", function (e) { if (e.target.id === "kaoyan-search" || e.target.id === "job-search" || e.target.id === "gong-search") { setTimeout(function () { appendTimeline(e.target.id.replace("-search", "-content"), e.target.id.replace("-search", "")); }, 0); } });
  document.addEventListener("click", function (e) { if (e.target.closest("#industry-list [data-industry]")) setTimeout(enhanceIndustryCards, 0); var routeButton = e.target.closest("#pitfalls-content [data-nav]"); if (routeButton) route(routeButton.dataset.nav); var next = e.target.closest("[data-guide-next]"); if (next) advanceLinearGuide(next.dataset.guideNext); var resource = e.target.closest("[data-guide-resource]"); if (resource) { var resultModal = document.getElementById("guide-result-modal"); if (resultModal) resultModal.remove(); leaveLinearGuide(); route(resource.dataset.guideResource); } if (e.target.closest("[data-guide-exit]")) { leaveLinearGuide(); var modal = document.getElementById("guide-result-modal"); if (modal) modal.remove(); } });

  enrichIndustries();
  function bootEnhancedExperience() { setupMindChecklist(); enhanceIndustryCards(); showGuideOnboarding(); }
  if (window.__zhiluAppleIntroDone) bootEnhancedExperience();
  else window.addEventListener("zhiluAppleIntroDone", bootEnhancedExperience, { once: true });
}());
