var ZHILU_VISIT_KEY = "zhilu_visit_history";
var QUIZ_PROGRESS_KEY = "zhilu_quiz_progress_v1";

var TRACKS = {
  gong: "考公",
  kaoyan: "考研",
  job: "就业",
  startup: "创业"
};

var WEIGHT_BY_VISIT = {
  gong: { gong: 0.1 },
  kaoyan: { kaoyan: 0.1 },
  job: { job: 0.1 },
  industry: { job: 0.04 },
  startup: { startup: 0.1 }
};

var DATA = {
  industries: [
    { name: "互联网", stars: 4, salary: "8k-18k/月", req: "编程/产品/运营基础，项目或实习经历", detail: "岗位包括前后端开发、算法、数据分析、产品经理、运营、设计。未来 5 年 AI 应用、产业互联网、出海 SaaS 仍有增长空间，但纯流量岗位竞争更激烈。适合学习快、能做项目、愿意持续更新技能的学生。", track: "job" },
    { name: "金融", stars: 4, salary: "7k-16k/月", req: "金融/会计/数学基础，证书或实习加分", detail: "岗位包括银行管培、券商研究、投行、风控、财富管理、量化助理。未来 5 年金融科技、普惠金融和财富管理需求稳定。适合数理能力强、表达稳、抗压能力好的学生。", track: "job" },
    { name: "教育", stars: 4, salary: "5k-12k/月", req: "教师资格证、表达能力、学科基础", detail: "岗位包括公办/民办教师、教研、课程产品、教育运营。未来 5 年职业教育、素质教育和教育数字化仍有机会。适合耐心强、表达清楚、愿意长期陪伴学生成长的人。", track: "job" },
    { name: "医疗", stars: 5, salary: "6k-14k/月", req: "医学/药学/护理/生物相关背景，资格证重要", detail: "岗位包括医生、药企研发、临床协调、器械销售、健康管理。人口老龄化带来长期需求，医疗器械和创新药仍是重点。适合专业门槛高、学习周期长但追求稳定价值的学生。", track: "kaoyan" },
    { name: "制造业", stars: 4, salary: "6k-13k/月", req: "机械/自动化/材料/工业工程基础", detail: "岗位包括工艺、设备、质量、供应链、智能制造工程师。未来 5 年高端制造、机器人和工业软件会持续升级。适合动手能力强、愿意到一线理解真实生产的学生。", track: "job" },
    { name: "新能源", stars: 5, salary: "8k-18k/月", req: "电气、材料、化学、车辆、能源相关基础", detail: "岗位包括电池研发、储能、光伏、风电、BMS、测试工程师。未来 5 年新能源车、储能和新型电力系统仍是高景气方向。适合理工科、能接受技术迭代和项目制工作的学生。", track: "job" },
    { name: "文化传媒", stars: 3, salary: "5k-12k/月", req: "内容能力、审美、剪辑/运营/策划作品", detail: "岗位包括新媒体运营、编导、品牌策划、短视频、商务。未来 5 年内容产业仍有机会，但平台变化快、作品和执行力更重要。适合表达欲强、审美好、能持续产出的学生。", track: "job" },
    { name: "咨询", stars: 4, salary: "9k-20k/月", req: "商科/理工复合背景，逻辑表达和案例能力", detail: "岗位包括战略咨询、管理咨询、财务咨询、IT 咨询。企业数字化、组织效率和出海会带来项目需求。适合逻辑强、沟通强、能承受高强度项目节奏的学生。", track: "job" },
    { name: "房地产", stars: 2, salary: "5k-11k/月", req: "土木/建筑/营销/财务基础，抗压能力", detail: "岗位包括工程管理、成本招采、物业运营、资产管理。未来 5 年行业从高增长转向存量运营和城市更新。适合愿意扎实做项目、关注城市空间和资产运营的学生。", track: "job" },
    { name: "公务员", stars: 4, salary: "5k-12k/月", req: "专业匹配、行测申论、政策理解能力", detail: "岗位包括中央机关、税务、海关、统计、公安、选调生、事业单位。未来 5 年公共服务、基层治理和数字政务会持续需要人才。适合追求稳定、规则感强、愿意服务公共事务的学生。", track: "gong" }
  ],
  majors: {
    "计算机科学与技术": {
      aliases: ["计算机", "软件工程", "人工智能", "数据科学"],
      schools: [
        { name: "北京邮电大学", ratio: "约 6:1-10:1", line: "近年复试线常见 330-360+", note: "通信、计算机就业认可度高" },
        { name: "华中科技大学", ratio: "约 5:1-9:1", line: "近年复试线常见 340-370+", note: "工科平台强，适合冲刺" },
        { name: "南京邮电大学", ratio: "约 4:1-8:1", line: "近年复试线常见 320-350+", note: "通信与计算机方向性价比高" }
      ],
      tutors: ["人工智能与机器学习方向导师：关注论文、项目、数学基础", "软件工程方向课程：算法、操作系统、数据库、工程实践评价较高"],
      jobs: [
        { name: "后端开发工程师", salary: "10k-22k/月", req: "Java/Go/Python、数据库、项目经验" },
        { name: "数据分析师", salary: "8k-18k/月", req: "SQL、Python、统计分析、业务理解" },
        { name: "测试开发工程师", salary: "8k-16k/月", req: "自动化测试、脚本、质量意识" }
      ],
      growth: ["做 2 个可展示项目并部署上线", "刷算法与数据库基础", "参加互联网+、挑战杯或开源项目", "通过国家大学生就业服务平台投递实习"],
      gongPosts: [
        { name: "税务局信息化岗", req: "计算机类，本科及以上，部分岗位限应届", score: "往年进面常见 125-140+" },
        { name: "公安机关网络安全岗", req: "计算机类，需符合体测/政审要求", score: "往年进面常见 120-135+" }
      ]
    },
    "汉语言文学": {
      aliases: ["中文", "汉语言", "新闻传播", "文秘"],
      schools: [
        { name: "北京师范大学", ratio: "约 8:1-15:1", line: "文学类复试线常见 365-390+", note: "师范与中文学科强" },
        { name: "华东师范大学", ratio: "约 7:1-12:1", line: "文学类复试线常见 360-385+", note: "适合教育与学术方向" },
        { name: "暨南大学", ratio: "约 5:1-10:1", line: "文学类复试线常见 355-380+", note: "华南地区就业资源较好" }
      ],
      tutors: ["古代文学、现当代文学方向：重视阅读量和文本分析", "课程评价：文学理论、中国文学史、语言学概论是核心"],
      jobs: [
        { name: "语文教师", salary: "6k-12k/月", req: "教师资格证、普通话、试讲能力" },
        { name: "新媒体编辑", salary: "5k-10k/月", req: "写作、选题、排版、热点判断" },
        { name: "行政文秘", salary: "5k-9k/月", req: "公文写作、沟通协调、办公软件" }
      ],
      growth: ["考教师资格证", "参加学术论坛或论文写作训练", "积累公众号/短视频文案作品", "关注学校和地方教育局招聘"],
      gongPosts: [
        { name: "机关综合文字岗", req: "中国语言文学类，本科及以上", score: "往年进面常见 130-145+" },
        { name: "宣传部门岗位", req: "中文、新闻传播相关，写作能力强", score: "往年进面常见 125-140+" }
      ]
    },
    "金融": {
      aliases: ["金融学", "经济学", "会计", "财务管理"],
      schools: [
        { name: "中央财经大学", ratio: "约 8:1-15:1", line: "金融专硕复试线常见 370-400+", note: "财经平台强，竞争高" },
        { name: "西南财经大学", ratio: "约 6:1-12:1", line: "金融专硕复试线常见 360-390+", note: "金融行业校友资源好" },
        { name: "上海财经大学", ratio: "约 10:1-18:1", line: "金融专硕复试线常见 380-410+", note: "区位优势明显" }
      ],
      tutors: ["金融工程、公司金融、资产定价方向：重视数学和计量", "课程评价：投资学、公司理财、计量经济学是核心"],
      jobs: [
        { name: "银行管培生", salary: "7k-14k/月", req: "金融基础、沟通、抗压、网申笔试" },
        { name: "证券研究助理", salary: "8k-18k/月", req: "财务分析、行业研究、写作" },
        { name: "风控/合规助理", salary: "7k-15k/月", req: "金融法规、数据分析、细致度" }
      ],
      growth: ["参加商赛和案例分析比赛", "准备 CPA/CFA/基金从业等证书", "找银行、券商、咨询实习", "训练财务建模和行业研究报告"],
      gongPosts: [
        { name: "税务局财税岗", req: "财政学、金融学、会计等相关专业", score: "往年进面常见 125-145+" },
        { name: "金融监管相关岗位", req: "经济金融类，部分要求硕士", score: "往年进面常见 130-150+" }
      ]
    },
    "教育学": {
      aliases: ["师范", "小学教育", "学前教育", "教育技术"],
      schools: [
        { name: "北京师范大学", ratio: "约 8:1-16:1", line: "教育学复试线常见 350-380+", note: "教育学顶尖平台" },
        { name: "华中师范大学", ratio: "约 5:1-10:1", line: "教育学复试线常见 340-370+", note: "师范就业认可度高" },
        { name: "东北师范大学", ratio: "约 4:1-8:1", line: "教育学复试线常见 335-365+", note: "性价比和师范资源较好" }
      ],
      tutors: ["课程与教学论、教育心理方向：重视阅读和研究设计", "课程评价：教育学原理、教育心理学、中外教育史是核心"],
      jobs: [
        { name: "中小学教师", salary: "5k-11k/月", req: "教师资格证、试讲、学科基础" },
        { name: "教研员/课程设计", salary: "6k-12k/月", req: "课程开发、教学设计、沟通" },
        { name: "教育运营", salary: "5k-10k/月", req: "用户运营、活动组织、数据意识" }
      ],
      growth: ["尽早考教师资格证", "参加教育实习和公开课训练", "关注学术论坛与教育科研项目", "准备教招笔试和结构化面试"],
      gongPosts: [
        { name: "教育局综合管理岗", req: "教育学类，本科及以上", score: "往年进面常见 125-140+" },
        { name: "事业单位教师岗", req: "教师资格证，专业对口", score: "以地方公告和笔面综合分为准" }
      ]
    }
  },
  competitions: [
    { name: "挑战杯", desc: "适合科研、社会实践、创新作品积累", url: "https://www.tiaozhanbei.net/" },
    { name: "中国国际大学生创新大赛", desc: "原互联网+，适合创新创业项目", url: "https://cy.ncss.cn/" },
    { name: "全国大学生数学建模竞赛", desc: "适合理工、金融、数据分析方向", url: "https://www.mcm.edu.cn/" }
  ],
  links: {
    yanzhao: "https://yz.chsi.com.cn/",
    ncss: "https://www.ncss.cn/",
    jobPlatform: "https://www.ncss.cn/student/jobfair/index.html",
    resume: "https://www.ncss.cn/student/",
    scs2025: "http://bm.scs.gov.cn/kl2025",
    scs: "https://www.scs.gov.cn/",
    moeTeacher: "https://ntce.neea.edu.cn/",
    institution: "https://www.mohrss.gov.cn/"
  },
  exams: [
    { name: "2025 年国考", time: "报名：2024 年 10 月；笔试：2024 年 12 月 1 日", link: "http://bm.scs.gov.cn/kl2025", note: "以国家公务员局专题公告为准" },
    { name: "2025 年省考", time: "多数省份集中在 2025 年 1-3 月发布公告，3-4 月笔试", link: "https://www.scs.gov.cn/", note: "各省公务员主管部门公告为准" },
    { name: "2025 年事业单位", time: "多地全年分批招聘，联考常见于上半年和下半年", link: "https://www.mohrss.gov.cn/", note: "以人社部门和招聘单位公告为准" }
  ],
  civilTypes: [
    { name: "国考", desc: "中央机关及直属机构招录，岗位覆盖税务、海关、统计、铁路公安等，竞争范围全国。" },
    { name: "省考", desc: "省市县乡机关招录，地域属性强，适合想留在本省发展的同学。" },
    { name: "事业单位", desc: "学校、医院、科研院所、公共服务机构等，考试内容因地区和单位差异较大。" },
    { name: "选调生", desc: "面向优秀应届毕业生和部分服务基层项目人员，通常重视学校、党员、学生干部等条件。" }
  ]
};

var state = {
  page: "home",
  qIndex: 0,
  answers: [],
  expandedIndustry: null
};

function $(id) {
  return document.getElementById(id);
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(ZHILU_VISIT_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function saveVisit(type, name, track) {
  var history = getHistory();
  history.unshift({ type: type, name: name, track: track, time: new Date().toISOString() });
  localStorage.setItem(ZHILU_VISIT_KEY, JSON.stringify(history.slice(0, 80)));
}

function route(page) {
  state.page = page;
  document.querySelectorAll(".page").forEach(function (el) {
    el.classList.toggle("hidden", el.id !== "page-" + page);
  });
  document.querySelectorAll(".nav-btn").forEach(function (el) {
    el.classList.toggle("active", el.dataset.nav === page);
  });
  $("mobile-menu").classList.add("hidden");
  if (page === "industry") saveVisit("section", "行业认知", "industry");
  if (page === "kaoyan") saveVisit("section", "考研专区", "kaoyan");
  if (page === "job") saveVisit("section", "就业专区", "job");
  if (page === "gong") saveVisit("section", "考公专区", "gong");
  if (page === "kaoyan") renderKaoyan();
  if (page === "job") renderJob();
  if (page === "gong") renderGong();
  if (page === "quiz") showQuizResumeDialog();
  window.scrollTo(0, 0);
}

function stars(n) {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

function matchMajor(input) {
  var q = (input || "").trim().toLowerCase();
  var majors = Object.keys(DATA.majors);
  if (!q) return DATA.majors[majors[0]];
  for (var i = 0; i < majors.length; i++) {
    var name = majors[i];
    var item = DATA.majors[name];
    var aliases = [name].concat(item.aliases);
    if (aliases.some(function (x) { return x.toLowerCase().indexOf(q) >= 0 || q.indexOf(x.toLowerCase()) >= 0; })) {
      return item;
    }
  }
  return null;
}

function majorNameByData(target) {
  var names = Object.keys(DATA.majors);
  for (var i = 0; i < names.length; i++) {
    if (DATA.majors[names[i]] === target) return names[i];
  }
  return "";
}

function card(title, body, extra) {
  return '<article class="data-card"><h3 class="mb-2 text-lg font-black text-slate-950">' + title + '</h3>' + body + (extra || "") + "</article>";
}

function link(url, text) {
  return '<a class="link-btn" href="' + url + '" target="_blank" rel="noopener">' + text + '</a>';
}

function renderIndustries() {
  var q = ($("industry-search").value || "").trim().toLowerCase();
  var list = DATA.industries.filter(function (it) {
    if (!q) return true;
    if (it.name.toLowerCase().indexOf(q) >= 0 || it.detail.indexOf(q) >= 0) return true;
    if (it.subPositions && it.subPositions.some(function (p) { return p[0].indexOf(q) >= 0 || p[3].indexOf(q) >= 0; })) return true;
    if (it.topCompanies && it.topCompanies.some(function (c) { return c.toLowerCase().indexOf(q) >= 0; })) return true;
    return false;
  });
  $("industry-list").innerHTML = list.map(function (it) {
    var open = state.expandedIndustry === it.name;
    var extra = "";
    if (open) {
      var pos = (it.subPositions || []).map(function (p) {
        return '<div class="rounded-2xl bg-slate-50 p-3"><b class="text-slate-950">' + p[0] + '</b><p class="mt-1 text-xs text-slate-500">职责：' + p[1] + '</p><p class="text-xs text-slate-500">应届薪资：' + p[2] + '</p><p class="text-xs text-slate-500">入门要求：' + p[3] + '</p></div>';
      }).join("");
      var comps = (it.topCompanies || []).map(function (c) { return '<span class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand">' + c + '</span>'; }).join("");
      extra = '<div class="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">' + it.detail +
        (it.trend2025 ? '<div class="mt-3 rounded-2xl bg-emerald-50 p-3 text-emerald-800"><b>2025 趋势：</b>' + it.trend2025 + '</div>' : '') +
        (pos ? '<div class="mt-3"><p class="mb-2 font-bold text-slate-700">核心细分岗位</p><div class="grid gap-2 sm:grid-cols-2">' + pos + '</div></div>' : '') +
        (comps ? '<div class="mt-3"><p class="mb-2 font-bold text-slate-700">校招热度头部企业</p><div class="flex flex-wrap gap-2">' + comps + '</div></div>' : '') +
        '</div>';
    }
    return '<button class="data-card text-left" data-industry="' + it.name + '">' +
      '<div class="flex items-start justify-between gap-3"><div><h3 class="text-xl font-black text-slate-950">' + it.name + '</h3><p class="mt-1 text-sm text-amber-500">' + stars(it.stars) + '</p></div><span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">' + it.salary + '</span></div>' +
      '<p class="mt-3 text-sm text-slate-600"><b>入门要求：</b>' + it.req + '</p>' +
      (open ? extra : '<p class="mt-4 text-sm font-semibold text-brand">点击展开详情</p>') +
    '</button>';
  }).join("");
}

function getQuizProgress() {
  try { return JSON.parse(localStorage.getItem(QUIZ_PROGRESS_KEY) || "null"); } catch (e) { return null; }
}
function saveQuizProgress() {
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify({ qIndex: state.qIndex, answers: state.answers, time: Date.now() }));
}
function clearQuizProgress() { localStorage.removeItem(QUIZ_PROGRESS_KEY); }

function renderQuiz() {
  var box = $("quiz-card");
  if (state.qIndex >= ZHILU_QUESTIONS.length) {
    clearQuizProgress();
    renderResult();
    return;
  }
  var q = ZHILU_QUESTIONS[state.qIndex];
  var hasPrev = state.qIndex > 0;
  box.innerHTML = '<div class="mb-5 flex items-center justify-between text-sm text-slate-500"><span>第 ' + (state.qIndex + 1) + ' / ' + ZHILU_QUESTIONS.length + ' 题 · ' + q.dim + '</span><button id="quiz-exit" class="text-sm font-semibold text-slate-400 transition hover:text-rose-500">退出</button></div>' +
    '<h2 class="mb-5 text-xl font-black leading-8 text-slate-950">' + q.q + '</h2>' +
    '<div class="grid gap-3">' + q.opts.map(function (o, i) {
      return '<label class="flex cursor-pointer gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand hover:bg-blue-50">' +
        '<input class="mt-1" type="radio" name="quiz-option" value="' + i + '">' +
        '<span><b class="text-brand">' + o.k + ".</b> " + o.t + '</span></label>';
    }).join("") + '</div>' +
    '<div class="mt-6 flex gap-3">' +
    (hasPrev ? '<button id="prev-question" class="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">上一题</button>' : '') +
    '<button id="next-question" class="flex-1 rounded-xl bg-brand px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40" disabled>' +
    (state.qIndex === ZHILU_QUESTIONS.length - 1 ? "提交测评" : "下一题") + '</button></div>';
  var saved = state.answers[state.qIndex];
  if (saved !== undefined && saved !== null) {
    var radio = box.querySelector('input[name="quiz-option"][value="' + saved + '"]');
    if (radio) { radio.checked = true; $("next-question").disabled = false; }
  }
}

function showQuizResumeDialog() {
  var prog = getQuizProgress();
  if (!prog || !prog.answers || !prog.answers.length) { renderQuiz(); return; }
  var box = $("quiz-card");
  box.innerHTML = '<div class="text-center"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">↺</div><h2 class="text-2xl font-black text-slate-950">继续上次作答？</h2><p class="mt-3 leading-7 text-slate-600">检测到你上次答到第 ' + (prog.qIndex + 1) + ' 题（共 ' + ZHILU_QUESTIONS.length + ' 题），进度已自动保存。</p><div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"><button id="quiz-resume" class="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-blue-700">继续上次作答</button><button id="quiz-restart" class="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-brand hover:text-brand">重新开始</button></div></div>';
}

function showQuizExitConfirm() {
  var overlay = document.createElement("div");
  overlay.id = "quiz-exit-modal";
  overlay.className = "fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm";
  overlay.innerHTML = '<div class="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-2xl"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl">?</div><h3 class="text-xl font-black text-slate-950">确定退出吗？</h3><p class="mt-2 text-sm text-slate-600">当前进度会被保存，下次可继续作答。</p><div class="mt-6 flex gap-3"><button id="quiz-exit-cancel" class="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-brand">继续作答</button><button id="quiz-exit-ok" class="flex-1 rounded-xl bg-brand px-4 py-3 font-semibold text-white transition hover:bg-blue-700">退出</button></div></div>';
  document.body.appendChild(overlay);
}

function computeBaseScores() {
  var scores = { gong: 0, kaoyan: 0, job: 0, startup: 0 };
  state.answers.forEach(function (answerIndex, i) {
    var opt = ZHILU_QUESTIONS[i].opts[answerIndex];
    Object.keys(opt.s).forEach(function (k) {
      scores[k] += opt.s[k];
    });
  });
  return scores;
}

function applyVisitWeights(scores) {
  var weighted = Object.assign({}, scores);
  var history = getHistory();
  var used = {};
  history.forEach(function (h) {
    if (!h.track || used[h.track]) return;
    used[h.track] = true;
    var w = WEIGHT_BY_VISIT[h.track] || {};
    Object.keys(w).forEach(function (key) {
      weighted[key] = Math.round(weighted[key] * (1 + w[key]) * 10) / 10;
    });
  });
  return { weighted: weighted, used: used, history: history };
}

function renderResult() {
  var base = computeBaseScores();
  var adjusted = applyVisitWeights(base);
  var max = ZHILU_QUESTIONS.length * 3;
  var rows = Object.keys(adjusted.weighted).map(function (key) {
    return { key: key, pct: Math.min(100, Math.round(adjusted.weighted[key] / max * 100)), raw: adjusted.weighted[key] };
  }).sort(function (a, b) { return b.raw - a.raw; });
  var top = rows[0];
  var lastRelated = adjusted.history.find(function (h) { return h.track === top.key || (top.key === "job" && h.track === "industry"); });
  var reason = buildReason(top, adjusted.used, lastRelated);
  $("quiz-card").innerHTML = '<h2 class="mb-5 text-2xl font-black text-slate-950">你的方向适配度</h2>' +
    '<div class="grid gap-3">' + rows.map(function (r) {
      return '<div class="rounded-2xl bg-slate-50 p-4"><div class="mb-2 flex justify-between font-bold"><span>' + TRACKS[r.key] + '</span><span>' + r.pct + '%</span></div><div class="h-2 rounded-full bg-slate-200"><div class="h-2 rounded-full bg-brand" style="width:' + r.pct + '%"></div></div></div>';
    }).join("") + '</div>' +
    '<p class="mt-5 rounded-2xl bg-blue-50 p-4 leading-7 text-slate-700">' + reason + '</p>' +
    '<div class="mt-5 grid gap-3 sm:grid-cols-2"><button class="rounded-xl bg-brand px-5 py-3 font-semibold text-white" data-nav="' + top.key + '">' + '查看' + TRACKS[top.key] + '资源</button><button id="restart-quiz" class="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold">重新测评</button></div>';
}

function buildReason(top, used, visit) {
  var visitText = visit ? "你之前浏览过「" + visit.name + "」，系统已给相关方向加入 10% 行为权重。" : "你还没有明显的浏览偏好，本次主要依据答题结果推荐。";
  var map = {
    kaoyan: "结合你的学习投入、家庭经济支持和长期规划倾向，考研适配度是 " + top.pct + "%，很适合用学历和专业深度换更高平台。",
    gong: "结合你的稳定偏好、规则适应度和试错成本，考公适配度是 " + top.pct + "%，适合优先关注岗位表和行测申论计划。",
    job: "结合你的技能基础、收入需求和市场实践倾向，就业适配度是 " + top.pct + "%，适合尽快用项目、实习和简历打开机会。",
    startup: "结合你的自主性、资源整合和试错接受度，创业适配度是 " + top.pct + "%，适合先用比赛或小项目验证想法。"
  };
  return visitText + map[top.key];
}

function renderKaoyan() {
  var major = matchMajor($("kaoyan-search").value);
  if (!major) {
    $("kaoyan-content").innerHTML = emptyState("暂时没有匹配专业，先试试：计算机、汉语言文学、金融、教育学、法学、自动化。");
    return;
  }
  var competitions = major.competitions || DATA.competitions;
  var resources = major.resources || [];
  if (state.page === "kaoyan") saveVisit("tool", "考研院校信息：" + majorNameByData(major), "kaoyan");
  var examBox = (major.examSubjects || major.scoreLine || major.schoolNote) ? '<div class="mt-4 data-card"><h3 class="section-title">考试科目与国家线</h3>' +
    (major.examSubjects ? '<p class="mb-3 rounded-2xl bg-blue-50 p-4 text-sm leading-7 text-slate-700"><b>考试科目：</b>' + major.examSubjects + '</p>' : '') +
    (major.scoreLine ? '<p class="mb-3 rounded-2xl bg-amber-50 p-4 text-sm leading-7 text-amber-900"><b>历年国家线趋势：</b>' + major.scoreLine + '</p>' : '') +
    (major.schoolNote ? '<p class="rounded-2xl bg-emerald-50 p-4 text-sm leading-7 text-emerald-800"><b>招生方向·学费学制·调剂难度：</b>' + major.schoolNote + '</p>' : '') +
    '</div>' : '';
  var schoolCards = major.schools.map(function (s) {
    return '<div class="mb-3 rounded-2xl bg-slate-50 p-4"><b>' + s.name + '</b><p class="text-sm text-slate-600">报录比：' + s.ratio + '；往年分数线：' + s.line + '</p><p class="text-sm text-slate-500">' + s.note + '</p></div>';
  }).join("");
  var timeline = (DATA.kaoyanTimeline || []).map(function (t) {
    return '<div class="mb-2 rounded-2xl bg-white border border-slate-100 p-3"><div class="flex flex-wrap items-center justify-between gap-2"><b class="text-slate-950">' + t.node + '</b>' + link(t.link, "官方入口") + '</div><p class="mt-1 text-sm text-slate-600">' + t.time + '</p><p class="text-xs text-slate-400">' + t.note + '</p></div>';
  }).join("");
  var mat = DATA.kaoyanMaterials || {};
  function matList(arr) { return (arr || []).map(function (r) { return '<div class="mb-2 rounded-2xl bg-slate-50 p-3"><b>' + r.name + '</b><p class="my-1 text-sm text-slate-600">' + r.desc + '</p>' + link(r.url, "前往") + '</div>'; }).join(""); }
  $("kaoyan-content").innerHTML =
    '<div class="grid gap-4 lg:grid-cols-3">' +
    card("院校匹配工具", '<div class="mb-4 grid gap-3"><input class="field" placeholder="本科专业" value="' + majorNameByData(major) + '"><input class="field" placeholder="本科成绩，如前 30%"><input class="field" placeholder="英语水平，如四级/六级"></div>' + schoolCards) +
    card("导师与课程", '<ul class="list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">' + major.tutors.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>") +
    card("竞赛科研信息", competitions.map(function (c) { return '<div class="mb-3 rounded-2xl bg-slate-50 p-4"><b>' + c.name + '</b><p class="my-2 text-sm text-slate-600">' + c.desc + '</p>' + link(c.url, "官方入口") + '</div>'; }).join("")) +
    '</div>' + examBox +
    '<div class="mt-4 data-card"><h3 class="section-title">一站式时间节点</h3><p class="mb-3 text-sm text-slate-600">从预报名到录取，关键节点与官方入口一站搞定。</p><div class="grid gap-2 md:grid-cols-2">' + timeline + '</div></div>' +
    '<div class="mt-4 grid gap-4 lg:grid-cols-3">' +
    card("公共课名师课程", matList(mat.courses)) +
    card("专业课资料渠道", matList(mat.major)) +
    card("官方与社区资源", matList(mat.public)) +
    '</div>';
}

function renderJob() {
  var major = matchMajor($("job-search").value);
  if (!major) {
    $("job-content").innerHTML = emptyState("暂时没有匹配专业，先试试：计算机、汉语言文学、金融、教育学、法学、自动化。");
    return;
  }
  if (state.page === "job") saveVisit("tool", "就业岗位信息：" + majorNameByData(major), "job");
  var timeline = (DATA.jobTimeline || []).map(function (t, i) {
    return '<li class="relative pb-4 last:pb-0"><i class="timeline-dot"></i><p class="font-bold text-slate-900">' + t.stage + '</p><p class="text-sm text-slate-600">' + t.time + '</p><p class="text-xs text-slate-500">' + t.desc + '</p></li>';
  }).join("");
  var companies = (major.jobCompanies || []).map(function (c) { return '<div class="rounded-2xl bg-slate-50 p-3"><b class="text-slate-950">' + c[0] + '</b><p class="mt-1 text-xs text-slate-500">校招投递入口</p>' + link(c[1], "投递入口") + '</div>'; }).join("");
  var certs = (major.certLinks || []).map(function (c) { return '<div class="rounded-2xl bg-slate-50 p-3"><b class="text-slate-950">' + c[0] + '</b>' + link(c[1], "报名入口") + '</div>'; }).join("");
  var platforms = (DATA.internPlatforms || []).map(function (p) { return '<div class="mb-2 rounded-2xl bg-slate-50 p-3"><b>' + p.name + '</b><p class="my-1 text-sm text-slate-600">' + p.desc + '</p>' + link(p.url, "前往") + '</div>'; }).join("");
  var resumes = (DATA.resumeTemplates || []).map(function (r, i) {
    return '<div class="data-card"><div class="flex items-center justify-between"><h3 class="text-lg font-black text-slate-950">' + r.name + '</h3><span class="rounded-full px-2.5 py-1 text-xs font-bold text-white" style="background:' + r.accent + '">' + (i + 1) + '</span></div><p class="mt-2 text-sm leading-6 text-slate-600">' + r.desc + '</p><p class="mt-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500"><b>使用提示：</b>' + r.tip + '</p><div class="mt-3 flex gap-2"><button class="link-btn" data-resume-preview="' + i + '">站内预览</button><button class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand" data-resume-download="' + i + '">下载 HTML</button></div></div>';
  }).join("");
  $("job-content").innerHTML =
    '<div class="grid gap-4 lg:grid-cols-3">' +
    card("岗位匹配", major.jobs.map(function (j) { return '<div class="mb-3 rounded-2xl bg-slate-50 p-4"><b>' + j.name + '</b><p class="text-sm text-slate-600">薪资：' + j.salary + '</p><p class="text-sm text-slate-500">要求：' + j.req + '</p></div>'; }).join("")) +
    card("成长路线规划", '<ol class="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">' + major.growth.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ol>") +
    card("头部企业投递入口", companies || '<p class="text-sm text-slate-500">可从国家大学生就业服务平台统一投递。</p>' + link(DATA.links.ncss, "前往投递")) +
    '</div>' +
    '<div class="mt-4 data-card"><h3 class="section-title">校招时间线</h3><p class="mb-4 text-sm text-slate-600">秋招、春招与暑期实习的关键节点，按时投递不遗漏。</p><ol class="relative ml-2 border-l-2 border-blue-200 pl-6">' + timeline + '</ol></div>' +
    '<div class="mt-4 grid gap-4 lg:grid-cols-3">' +
    card("证书与比赛报名入口", certs || '<p class="text-sm text-slate-500">关注本专业通用证书与挑战杯等竞赛。</p>' + link("https://www.tiaozhanbei.net/", "挑战杯")) +
    card("主流实习平台", platforms) +
    card("简历面试技巧", '<p class="mb-3 text-sm text-slate-600">简历优先写结果和数据：项目目标、你负责什么、用了什么方法、带来什么结果。面试准备 STAR：情境、任务、行动、结果。</p>' + link(DATA.links.resume, "就业指导与简历资源")) +
    '</div>' +
    '<div class="mt-4"><div class="mb-4"><p class="eyebrow">简历模板</p><h3 class="page-title">3 套通用简历模板（站内预览 + 下载）</h3></div><div class="grid gap-4 md:grid-cols-3">' + resumes + '</div></div>';
}

function renderGong() {
  var major = matchMajor($("gong-search").value);
  if (!major) {
    $("gong-content").innerHTML = emptyState("暂时没有匹配专业，先试试：计算机、汉语言文学、金融、教育学。");
    return;
  }
  if (state.page === "gong") saveVisit("tool", "考公岗位信息：" + majorNameByData(major), "gong");
  var stats = major.gongStats || { cats: "综合管理、街道乡镇、机关文字岗", avgRecruit: "全国年均 1000+", avgRatio: "约 25:1-55:1" };
  var statHTML = '<div class="grid gap-3 sm:grid-cols-3">' +
    '<div class="rounded-2xl bg-blue-50 p-4"><p class="text-xs font-bold text-brand">可报岗位大类</p><p class="mt-1 text-sm leading-6 text-slate-700">' + stats.cats + '</p></div>' +
    '<div class="rounded-2xl bg-emerald-50 p-4"><p class="text-xs font-bold text-mint">历年平均招录人数</p><p class="mt-1 text-sm text-slate-700">' + stats.avgRecruit + '</p></div>' +
    '<div class="rounded-2xl bg-violet-50 p-4"><p class="text-xs font-bold text-violet-600">平均竞争比</p><p class="mt-1 text-sm text-slate-700">' + stats.avgRatio + '</p></div>' +
    '</div>';
  var provHTML = (DATA.provincialExams || []).map(function (p) {
    return '<tr class="border-b border-slate-100 last:border-0"><td class="px-3 py-2 font-bold text-slate-900">' + p.region + '</td><td class="px-3 py-2 text-sm text-slate-600">' + p.time + '</td><td class="px-3 py-2 text-sm text-slate-600">' + p.subjects + '</td><td class="px-3 py-2 text-sm text-slate-600">' + p.recruit + '</td><td class="px-3 py-2">' + link(p.link, "查看") + '</td></tr>';
  }).join("");
  var offHTML = (DATA.gongOfficialLinks || []).map(function (g) {
    return '<div class="rounded-2xl bg-slate-50 p-4"><h4 class="mb-2 text-sm font-black text-slate-950">' + g.type + '</h4><div class="flex flex-wrap gap-2">' + g.items.map(function (it) { return link(it.url, it.name); }).join("") + '</div></div>';
  }).join("");
  var xingceHTML = (DATA.gongPrepModules && DATA.gongPrepModules.xingce || []).map(function (m) {
    return '<div class="rounded-2xl border border-slate-200 bg-white p-4"><div class="flex items-center justify-between"><b class="text-slate-950">' + m.name + '</b><span class="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-brand">行测</span></div><p class="mt-2 text-sm leading-6 text-slate-600">' + m.method + '</p><p class="mt-2 rounded-2xl bg-slate-50 p-2 text-xs text-slate-500"><b>资料推荐：</b>' + m.materials + '</p></div>';
  }).join("");
  var shenlunHTML = (DATA.gongPrepModules && DATA.gongPrepModules.shenlun || []).map(function (m) {
    return '<div class="rounded-2xl border border-slate-200 bg-white p-4"><div class="flex items-center justify-between"><b class="text-slate-950">' + m.name + '</b><span class="rounded-full bg-violet-50 px-2 py-0.5 text-xs font-bold text-violet-600">申论</span></div><p class="mt-2 text-sm leading-6 text-slate-600">' + m.method + '</p><p class="mt-2 rounded-2xl bg-slate-50 p-2 text-xs text-slate-500"><b>资料推荐：</b>' + m.materials + '</p></div>';
  }).join("");
  $("gong-content").innerHTML =
    '<div class="data-card"><div class="mb-4"><p class="eyebrow">' + majorNameByData(major) + ' · 考公数据卡</p><h3 class="page-title">可报岗位与竞争概况</h3></div>' + statHTML + '</div>' +
    '<div class="mt-4 grid gap-4 lg:grid-cols-3">' +
    card("对口岗位匹配", major.gongPosts.map(function (p) { return '<div class="mb-3 rounded-2xl bg-slate-50 p-4"><b>' + p.name + '</b><p class="text-sm text-slate-600">报考条件：' + p.req + '</p><p class="text-sm text-slate-500">往年进面分数：' + p.score + '</p></div>'; }).join("")) +
    card("公务员类型介绍", DATA.civilTypes.map(function (x) { return '<div class="mb-3"><b>' + x.name + '</b><p class="text-sm leading-6 text-slate-600">' + x.desc + '</p></div>'; }).join("")) +
    card("考试信息汇总", DATA.exams.map(function (e) { return '<div class="mb-3 rounded-2xl bg-slate-50 p-4"><b>' + e.name + '</b><p class="text-sm text-slate-600">' + e.time + '</p><p class="mb-2 text-xs text-slate-500">' + e.note + '</p>' + link(e.link, "公告入口") + '</div>'; }).join("")) +
    '</div>' +
    '<div class="mt-4 data-card"><h3 class="section-title">全国主要省份省考时间与招录概况</h3><p class="mb-4 text-sm text-slate-600">以下为 2025 年各省省考公告、笔试时间与招录规模参考，实际以各省公务员主管部门公告为准。</p><div class="overflow-x-auto rounded-2xl border border-slate-100"><table class="w-full text-left"><thead class="bg-slate-50 text-xs uppercase text-slate-500"><tr><th class="px-3 py-2">省份</th><th class="px-3 py-2">公告/笔试时间</th><th class="px-3 py-2">考试科目</th><th class="px-3 py-2">招录概况</th><th class="px-3 py-2">入口</th></tr></thead><tbody>' + provHTML + '</tbody></table></div></div>' +
    '<div class="mt-4 data-card"><h3 class="section-title">一站式官方入口（国考 / 省考 / 事业单位 / 选调生）</h3><p class="mb-4 text-sm text-slate-600">报名、准考证打印、成绩查询官方入口汇总，所有链接新标签页打开，不离开本站。</p><div class="grid gap-3 md:grid-cols-2">' + offHTML + '</div></div>' +
    '<div class="mt-4 data-card"><h3 class="section-title">行测各模块备考方法与资料</h3><p class="mb-4 text-sm text-slate-600">行测先分模块刷题，资料分析和判断推理适合先提分；限时训练并复盘错题。</p><div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">' + xingceHTML + '</div></div>' +
    '<div class="mt-4 data-card"><h3 class="section-title">申论各题型备考方法与资料</h3><p class="mb-4 text-sm text-slate-600">申论要训练材料归纳、公文格式和大作文结构；每周写 1-2 篇对照范文改稿。</p><div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">' + shenlunHTML + '</div></div>';
}

function emptyState(text) {
  return '<div class="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">' + text + '</div>';
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.addEventListener("click", function () {
      var page = el.dataset.nav === "startup" ? "industry" : el.dataset.nav;
      route(page);
    });
  });
  $("mobile-menu-btn").addEventListener("click", function () {
    $("mobile-menu").classList.toggle("hidden");
  });
  $("industry-search").addEventListener("input", renderIndustries);
  $("industry-list").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-industry]");
    if (!btn) return;
    state.expandedIndustry = state.expandedIndustry === btn.dataset.industry ? null : btn.dataset.industry;
    var item = DATA.industries.find(function (x) { return x.name === btn.dataset.industry; });
    if (item) saveVisit("industry", item.name, item.track);
    renderIndustries();
  });
  $("quiz-card").addEventListener("change", function (e) {
    if (e.target.name === "quiz-option") $("next-question").disabled = false;
  });
  $("quiz-card").addEventListener("click", function (e) {
    if (e.target.id === "next-question") {
      var checked = document.querySelector('input[name="quiz-option"]:checked');
      if (!checked) return;
      state.answers[state.qIndex] = parseInt(checked.value, 10);
      state.qIndex += 1;
      saveQuizProgress();
      renderQuiz();
    }
    if (e.target.id === "prev-question") {
      if (state.qIndex > 0) { state.qIndex -= 1; renderQuiz(); }
    }
    if (e.target.id === "restart-quiz") {
      state.qIndex = 0;
      state.answers = [];
      clearQuizProgress();
      renderQuiz();
    }
    if (e.target.id === "quiz-resume") {
      var prog = getQuizProgress();
      if (prog) { state.qIndex = prog.qIndex || 0; state.answers = prog.answers || []; }
      renderQuiz();
    }
    if (e.target.id === "quiz-restart") {
      state.qIndex = 0; state.answers = []; clearQuizProgress(); renderQuiz();
    }
    if (e.target.id === "quiz-exit") showQuizExitConfirm();
    if (e.target.id === "quiz-exit-cancel") { var m = document.getElementById("quiz-exit-modal"); if (m) m.remove(); }
    if (e.target.id === "quiz-exit-ok") {
      var modal = document.getElementById("quiz-exit-modal"); if (modal) modal.remove();
      saveQuizProgress();
      route("home");
    }
  });
  $("kaoyan-search").addEventListener("input", renderKaoyan);
  $("job-search").addEventListener("input", renderJob);
  $("gong-search").addEventListener("input", renderGong);
  $("job-content").addEventListener("click", function (e) {
    var previewBtn = e.target.closest("[data-resume-preview]");
    var downloadBtn = e.target.closest("[data-resume-download]");
    if (!previewBtn && !downloadBtn) return;
    var idx = parseInt((previewBtn || downloadBtn).dataset.resumePreview || (previewBtn || downloadBtn).dataset.resumeDownload, 10);
    var r = (DATA.resumeTemplates || [])[idx];
    if (!r) return;
    var html = resumeTemplateHTML(r.style, r.accent);
    if (downloadBtn) {
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = r.name + ".html";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      return;
    }
    var modal = document.createElement("div");
    modal.id = "resume-preview-modal";
    modal.className = "fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm";
    modal.innerHTML =
      '<div class="flex h-[85vh] w-full max-w-3xl flex-col rounded-3xl bg-white shadow-2xl">' +
      '<div class="flex items-center justify-between border-b border-slate-200 px-5 py-3"><div class="flex items-center gap-2"><span class="rounded-full px-2.5 py-1 text-xs font-bold text-white" style="background:' + r.accent + '">' + (idx + 1) + '</span><h3 class="text-lg font-black text-slate-950">' + r.name + '</h3></div>' +
      '<div class="flex items-center gap-2"><button id="resume-preview-download" class="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">下载 HTML</button><button id="resume-preview-close" class="rounded-xl bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-700">关闭</button></div></div>' +
      '<iframe id="resume-preview-frame" class="flex-1 rounded-b-3xl bg-white" style="border:0"></iframe></div>';
    document.body.appendChild(modal);
    var frame = document.getElementById("resume-preview-frame");
    frame.srcdoc = html;
    document.getElementById("resume-preview-close").addEventListener("click", function () { modal.remove(); });
    document.getElementById("resume-preview-download").addEventListener("click", function () {
      var blob = new Blob([html], { type: "text/html;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url; a.download = r.name + ".html";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    });
    modal.addEventListener("click", function (ev) { if (ev.target === modal) modal.remove(); });
  });
}

function buildExpandedData2025() {
  var links = {
    yanzhao: "https://yz.chsi.com.cn/",
    yanzhaoNews: "https://yz.chsi.com.cn/kyzx/",
    yanzhaoMajor: "https://yz.chsi.com.cn/zsml/",
    ncss: "https://www.ncss.cn/",
    jobPlatform: "https://www.ncss.cn/student/jobfair/index.html",
    resume: "https://www.ncss.cn/student/",
    scs2025: "http://bm.scs.gov.cn/kl2025",
    scs: "https://www.scs.gov.cn/",
    moeTeacher: "https://ntce.neea.edu.cn/",
    tiaozhanbei: "https://www.tiaozhanbei.net/",
    innovation: "https://cy.ncss.cn/",
    mcm: "https://www.mcm.edu.cn/",
    cpa: "https://cpaexam.cicpa.org.cn/",
    bar: "https://www.moj.gov.cn/",
    cet: "https://cet.neea.edu.cn/",
    neea: "https://www.neea.edu.cn/",
    mohrss: "https://www.mohrss.gov.cn/",
    cac: "https://www.cac.gov.cn/",
    miit: "https://www.miit.gov.cn/"
  };

  function industry(name, stars, salary, req, detail, track) {
    return { name: name, stars: stars, salary: salary, req: req, detail: detail, track: track || "job" };
  }

  function comp(name, desc, url) {
    return { name: name, desc: desc, url: url };
  }

  var commonComps = [
    comp("挑战杯", "适合科研、社会实践、创新作品积累，很多学校认定为综合素质和推免/复试展示材料。", links.tiaozhanbei),
    comp("中国国际大学生创新大赛", "原互联网+，适合创新创业、技术转化、商业计划书和团队项目。", links.innovation),
    comp("全国大学生数学建模竞赛", "适合理工、金融、数据分析、工程优化等方向，能体现建模和协作能力。", links.mcm)
  ];

  function makeSchool(name, ratio, line, note) {
    return { name: name, ratio: ratio, line: line, note: note };
  }

  function job(name, salary, req) {
    return { name: name, salary: salary, req: req };
  }

  function post(name, req, score) {
    return { name: name, req: req, score: score };
  }

  function major(cfg) {
    cfg.resources = cfg.resources || [
      { name: "研招网", url: links.yanzhao },
      { name: "硕士专业目录", url: links.yanzhaoMajor },
      { name: "研招资讯", url: links.yanzhaoNews }
    ];
    cfg.competitions = cfg.competitions || commonComps;
    return cfg;
  }

  function growth(items) {
    return items.concat([
      '实习投递：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.ncss + '">国家大学生就业服务平台</a>',
      '简历面试：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.resume + '">就业指导与简历资源</a>'
    ]);
  }

  var industries = [
    industry("互联网", 4, "8k-18k/月", "编程、产品、运营、数据分析基础；项目或实习经历加分", "岗位包括开发、算法、产品、运营、设计、数据。未来 5 年 AI 应用、出海 SaaS、产业互联网仍有结构性机会，但通用运营和初级开发竞争加剧。适合学习快、能做项目、愿意持续迭代技能的学生。"),
    industry("金融", 4, "7k-16k/月", "金融、会计、数学、数据分析基础；证书和实习加分", "岗位包括银行管培、券商研究、投行、风控、财富管理、量化助理。财富管理、金融科技和合规风控需求稳定。适合数理能力、表达能力、抗压能力都较好的学生。"),
    industry("教育", 4, "5k-12k/月", "教师资格证、学科基础、表达能力和试讲能力", "岗位包括中小学教师、教研、课程产品、教育运营。职业教育、教育数字化和素质教育仍有机会。适合有耐心、表达清楚、愿意长期陪伴学生成长的人。"),
    industry("医疗", 5, "6k-15k/月", "医学、药学、护理、生物相关背景；执业资格重要", "岗位包括医生、护士、药企研发、临床协调、器械销售、健康管理。老龄化和创新药械带来长期需求。适合专业门槛高、学习周期长但追求稳定价值的学生。", "kaoyan"),
    industry("制造业", 4, "6k-13k/月", "机械、自动化、材料、工业工程基础；能接受一线", "岗位包括工艺、设备、质量、供应链、智能制造工程师。高端制造、工业软件和机器人会持续升级。适合动手能力强、愿意理解真实生产的学生。"),
    industry("新能源", 5, "8k-18k/月", "电气、材料、化学、能源、车辆基础", "岗位包括储能、电池、光伏、风电、电力系统、测试工程师。新能源车、储能和新型电力系统仍是高景气方向。适合理工科、能接受项目制和技术迭代的学生。"),
    industry("文化传媒", 3, "5k-12k/月", "内容能力、审美、剪辑、策划或运营作品", "岗位包括新媒体运营、编导、品牌策划、短视频、商务。内容产业仍有机会，但平台规则变化快，作品和执行力更重要。适合表达欲强、审美好、能持续产出的学生。"),
    industry("咨询", 4, "9k-20k/月", "商科/理工复合背景，逻辑表达和案例分析能力", "岗位包括战略咨询、管理咨询、财务咨询、IT 咨询。企业数字化、组织效率和出海会带来项目需求。适合逻辑强、沟通强、能承受高强度项目节奏的学生。"),
    industry("房地产", 2, "5k-11k/月", "土木、建筑、营销、财务基础；抗压能力", "岗位包括工程管理、成本招采、物业运营、资产管理。行业从高增长转向存量运营、保障房、城市更新和资产管理。适合愿意扎实做项目、关注城市空间的学生。"),
    industry("公务员", 4, "5k-12k/月", "专业匹配、行测申论、政策理解和公文表达", "岗位包括中央机关、税务、海关、统计、公安、选调生、事业单位。公共服务、基层治理和数字政务持续需要人才。适合追求稳定、规则感强、愿意服务公共事务的学生。", "gong"),
    industry("半导体", 5, "9k-20k/月", "电子、微电子、材料、物理、自动化基础", "岗位包括芯片设计、验证、工艺、设备、封测、EDA。国产替代、先进封装、汽车芯片需求长期存在。适合数理基础强、能接受长周期研发和工程细节的学生。"),
    industry("生物医药", 5, "7k-16k/月", "生物、药学、医学、化学基础；实验和合规意识", "岗位包括药物研发、临床试验、注册、医学事务、生产质量。创新药、细胞基因治疗和器械仍是重点。适合愿意深造、实验能力强、耐心细致的学生。", "kaoyan"),
    industry("新能源汽车", 5, "8k-18k/月", "车辆、电气、自动化、材料、软件基础", "岗位包括三电系统、智能座舱、自动驾驶测试、供应链、质量。智能化和电动化继续推进，竞争从整车扩展到软件和供应链。适合工程实践强、愿意跨学科学习的学生。"),
    industry("人工智能", 5, "12k-25k/月", "数学、编程、机器学习、数据处理能力", "岗位包括算法工程师、数据科学家、AI 产品、模型应用工程师。大模型应用、行业智能化和智能硬件是热点。适合数学基础好、项目能力强、愿意持续学习的学生。"),
    industry("广告营销", 3, "5k-12k/月", "创意、文案、数据分析、品牌策划或投放能力", "岗位包括品牌策划、媒介投放、用户增长、内容营销、客户执行。数字营销和效果广告仍有需求，但更看重数据和复盘。适合表达力强、对消费和内容敏感的学生。"),
    industry("物流供应链", 4, "6k-14k/月", "供应链、数据、英语、流程优化能力", "岗位包括供应链计划、采购、仓配、国际物流、跨境电商运营。制造出海、即时零售和跨境贸易推动需求。适合逻辑清晰、执行力强、能协调多方的学生。"),
    industry("建筑设计", 3, "5k-12k/月", "建筑、规划、景观、软件制图和作品集", "岗位包括建筑设计、规划设计、景观、BIM、城市更新。新增开发放缓，但城市更新、公共建筑和存量改造仍有机会。适合审美和空间理解强、能长期打磨作品的学生。"),
    industry("化工", 4, "6k-14k/月", "化学、化工、安全环保、实验与工艺基础", "岗位包括工艺工程师、研发、生产技术、安全环保、质量。新材料、精细化工和绿色化工是重点方向。适合实验能力强、重视安全和工程细节的学生。"),
    industry("农业", 3, "5k-11k/月", "农学、生物、食品、机械或数字农业基础", "岗位包括种业、植保、食品研发、农业科技、乡村运营。种业振兴、智慧农业和食品安全带来机会。适合愿意下沉一线、关注长期价值的学生。"),
    industry("环保", 4, "5k-12k/月", "环境工程、化学、数据监测、政策理解", "岗位包括环评、污水处理、固废、碳管理、ESG 咨询。双碳、环保合规和绿色供应链推动需求。适合责任感强、能做现场和数据分析的学生。"),
    industry("法律", 4, "6k-15k/月", "法学基础、法考、检索写作和沟通能力", "岗位包括律师助理、法务、合规、知识产权、公检法相关岗位。合规、数据安全、知识产权和涉外业务增长。适合逻辑严谨、表达稳、抗压能力强的学生。", "gong"),
    industry("会计审计", 4, "6k-13k/月", "会计、审计、税法、Excel；CPA/初会加分", "岗位包括审计、税务、财务分析、内控、共享财务。监管合规和企业精细化管理使需求稳定。适合细致、规则感强、能接受忙季强度的学生。"),
    industry("广告传媒", 3, "5k-12k/月", "文案、视频、投放、账号运营和内容作品", "岗位包括广告执行、媒介、内容编导、直播策划、商务。品牌内容化和短视频营销仍活跃。适合创意强、节奏快、愿意用作品说话的学生。"),
    industry("游戏", 4, "8k-18k/月", "编程、美术、策划、数值、引擎或作品集", "岗位包括客户端、服务端、游戏策划、技术美术、运营。精品化、出海和小游戏带来机会，版号和周期也带来不确定性。适合热爱游戏、作品能力强的学生。"),
    industry("电商", 4, "6k-15k/月", "运营、数据分析、供应链、内容和客服管理", "岗位包括平台运营、商品运营、用户增长、店铺运营、数据分析。即时零售、跨境电商和内容电商继续增长。适合执行力强、对数据和消费敏感的学生。"),
    industry("直播电商", 4, "6k-16k/月", "内容策划、主播运营、投流、选品和复盘能力", "岗位包括主播运营、直播中控、投流、选品、供应链。行业进入精细化运营阶段，合规和供应链能力更重要。适合反应快、能抗压、愿意复盘数据的学生。"),
    industry("保险", 3, "5k-12k/月", "金融基础、销售服务、精算/风控或合规能力", "岗位包括管培、核保核赔、精算、保险科技、渠道运营。养老、健康险和保险科技仍有空间。适合沟通强、服务意识好或数理能力强的学生。"),
    industry("证券", 4, "8k-18k/月", "金融、财务、估值、研究写作和从业资格", "岗位包括投研、财富管理、机构销售、合规风控。资本市场改革和居民财富管理带来机会。适合财务分析强、抗压强、表达清楚的学生。"),
    industry("基金", 4, "8k-20k/月", "金融、会计、数学、数据分析和投研能力", "岗位包括行业研究、基金运营、渠道、风控、量化助理。公募、私募和指数化投资持续发展。适合长期学习、对市场敏感、能独立研究的学生。"),
    industry("租赁", 3, "5k-12k/月", "金融、风控、资产管理、合同和客户服务能力", "岗位包括融资租赁、汽车租赁、设备租赁、资产运营、风控。产业设备更新和消费租赁带来细分机会。适合金融+产业理解强、细致稳健的学生。")
  ];

  var majors = {
    "计算机科学与技术": major({
      aliases: ["计算机", "软件工程", "人工智能", "数据科学"],
      schools: [makeSchool("北京邮电大学", "约 6:1-10:1", "2025 复试线参考：330-360+", "通信、计算机认可度高"), makeSchool("华中科技大学", "约 5:1-9:1", "2025 复试线参考：340-370+", "工科平台强"), makeSchool("南京大学", "约 8:1-15:1", "2025 复试线参考：350-380+", "计算机学科实力强")],
      tutors: ["AI、系统、软件工程方向重视论文、项目和数学基础。", "核心课程：算法、操作系统、数据库、计算机网络、机器学习。"],
      competitions: [commonComps[1], commonComps[2], comp("中国大学生程序设计竞赛", "适合算法和工程能力展示。", "https://ccpc.io/")],
      jobs: [job("后端开发工程师", "10k-22k/月", "Java/Go/Python、数据库、项目经验"), job("算法/AI 应用工程师", "12k-25k/月", "机器学习、深度学习、工程落地"), job("数据分析师", "8k-18k/月", "SQL、Python、统计分析")],
      growth: growth(["做 2 个可部署项目并写清技术文档。", "刷算法、数据库、操作系统，参加程序设计/创新大赛。"]),
      gongPosts: [post("税务局信息化岗", "计算机类，本科及以上", "往年进面常见 125-145+"), post("公安网络安全岗", "计算机类，部分岗位需体测政审", "往年进面常见 120-140+")]
    }),
    "临床医学": major({
      aliases: ["医学", "临床", "内科学", "外科学"],
      schools: [makeSchool("北京协和医学院", "约 6:1-12:1", "2025 复试线参考：330-360+", "医学顶尖平台"), makeSchool("复旦大学上海医学院", "约 5:1-10:1", "2025 复试线参考：330-365+", "临床资源强"), makeSchool("四川大学华西医学中心", "约 5:1-9:1", "2025 复试线参考：325-360+", "西部医学高地")],
      tutors: ["内外妇儿、影像、麻醉等方向重视规培规划和临床科研。", "核心准备：西医综合、英语、复试病历分析和专业问答。"],
      competitions: [comp("全国大学生基础医学创新研究暨实验设计论坛", "适合医学科研训练和实验设计展示。", links.neea), commonComps[0]],
      jobs: [job("住院医师/规培医师", "6k-12k/月", "执业医师路径、规培、临床能力"), job("临床研究协调员", "6k-11k/月", "GCP、临床试验流程"), job("医学事务专员", "8k-15k/月", "医学文献、沟通、合规")],
      growth: growth(["明确专硕/学硕与规培路径。", "积累临床见习、病例汇报和科研训练。"]),
      gongPosts: [post("卫健委综合管理岗", "医学类，本科/硕士", "往年进面常见 120-140+"), post("公立医院事业编岗位", "临床医学、执业资格或规培要求", "以地方公告和综合成绩为准")]
    }),
    "法学": major({
      aliases: ["法律", "民商法", "刑法", "国际法"],
      schools: [makeSchool("中国政法大学", "约 8:1-16:1", "2025 复试线参考：350-380+", "法学平台强"), makeSchool("西南政法大学", "约 6:1-12:1", "2025 复试线参考：340-370+", "政法传统强校"), makeSchool("华东政法大学", "约 7:1-14:1", "2025 复试线参考：345-375+", "区位与实务资源好")],
      tutors: ["民商、刑法、诉讼、国际法方向重视案例分析和论文写作。", "核心课程：法理、宪法、民法、刑法、诉讼法。"],
      competitions: [comp("国家统一法律职业资格考试", "法学生就业和公检法路径的重要资格。", links.bar), commonComps[0]],
      jobs: [job("律师助理", "6k-12k/月", "法考、检索、文书写作"), job("企业法务", "7k-15k/月", "合同、合规、沟通"), job("合规专员", "7k-14k/月", "数据合规、金融合规、风控")],
      growth: growth(['准备法考：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.bar + '">司法部入口</a>', "积累律所、法院、企业法务实习。"]),
      gongPosts: [post("法院/检察院司法行政岗", "法学类，常要求法考证书", "往年进面常见 125-145+"), post("市场监管/司法局执法岗", "法学类，本科及以上", "往年进面常见 120-140+")]
    }),
    "金融": major({
      aliases: ["金融学", "经济学", "投资学"],
      schools: [makeSchool("中央财经大学", "约 8:1-15:1", "2025 复试线参考：365-395+", "财经平台强"), makeSchool("上海财经大学", "约 10:1-18:1", "2025 复试线参考：370-405+", "区位优势明显"), makeSchool("西南财经大学", "约 6:1-12:1", "2025 复试线参考：355-390+", "金融校友资源好")],
      tutors: ["公司金融、金融工程、资产定价重视数学和计量。", "核心课程：投资学、公司理财、计量经济学、金融市场。"],
      competitions: [commonComps[2], comp("CFA Institute Research Challenge", "适合投研、估值和英文展示。", "https://www.cfainstitute.org/"), commonComps[1]],
      jobs: [job("银行管培生", "7k-14k/月", "金融基础、网申笔试、沟通"), job("证券研究助理", "8k-18k/月", "财务分析、行业研究"), job("风控/合规助理", "7k-15k/月", "金融法规、数据分析")],
      growth: growth(['准备 CPA/CFA/基金从业等证书，CPA 报名入口：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.cpa + '">中注协</a>', "做行业研究报告和财务建模。"]),
      gongPosts: [post("税务局财税岗", "财政、金融、会计等相关专业", "往年进面常见 125-145+"), post("金融监管相关岗位", "经济金融类，部分要求硕士", "往年进面常见 130-150+")]
    }),
    "教育学": major({
      aliases: ["师范", "小学教育", "学前教育", "教育技术"],
      schools: [makeSchool("北京师范大学", "约 8:1-16:1", "2025 复试线参考：350-380+", "教育学顶尖平台"), makeSchool("华东师范大学", "约 6:1-12:1", "2025 复试线参考：345-375+", "师范资源强"), makeSchool("华中师范大学", "约 5:1-10:1", "2025 复试线参考：340-370+", "就业认可度高")],
      tutors: ["课程与教学论、教育心理、教育技术方向重视研究设计。", "核心课程：教育学原理、教育心理学、中外教育史。"],
      competitions: [commonComps[0], comp("全国教师资格考试", "师范生就业和教招的重要资格。", links.moeTeacher)],
      jobs: [job("中小学教师", "5k-11k/月", "教师资格证、试讲、学科基础"), job("教研/课程设计", "6k-12k/月", "教学设计、课程开发"), job("教育运营", "5k-10k/月", "活动组织、用户运营")],
      growth: growth(['考教师资格证：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.moeTeacher + '">NTCE 官方入口</a>', "参加教育实习和公开课训练。"]),
      gongPosts: [post("教育局综合管理岗", "教育学类，本科及以上", "往年进面常见 125-140+"), post("事业单位教师岗", "教师资格证，专业对口", "以地方公告为准")]
    }),
    "汉语言文学": major({
      aliases: ["中文", "汉语言", "文秘", "新闻传播"],
      schools: [makeSchool("北京师范大学", "约 8:1-15:1", "2025 复试线参考：365-390+", "中文与师范强"), makeSchool("南京大学", "约 7:1-14:1", "2025 复试线参考：365-395+", "文科平台强"), makeSchool("暨南大学", "约 5:1-10:1", "2025 复试线参考：355-380+", "华南资源好")],
      tutors: ["古代文学、现当代文学、语言学重视阅读量和文本分析。", "核心课程：中国文学史、文学理论、语言学概论。"],
      competitions: [commonComps[0], comp("全国大学生广告艺术大赛", "适合文案、策划、传播作品展示。", "https://www.sun-ada.net/")],
      jobs: [job("语文教师", "6k-12k/月", "教师资格证、普通话、试讲"), job("新媒体编辑", "5k-10k/月", "写作、选题、排版"), job("行政文秘", "5k-9k/月", "公文写作、办公软件")],
      growth: growth(["积累公众号、短视频文案、论文或评论作品。", '考教师资格证：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.moeTeacher + '">官方入口</a>']),
      gongPosts: [post("机关综合文字岗", "中国语言文学类，本科及以上", "往年进面常见 130-145+"), post("宣传部门岗位", "中文、新闻传播相关", "往年进面常见 125-140+")]
    }),
    "英语": major({
      aliases: ["英语语言文学", "翻译", "商务英语"],
      schools: [makeSchool("北京外国语大学", "约 7:1-14:1", "2025 复试线参考：365-390+", "外语强校"), makeSchool("上海外国语大学", "约 7:1-13:1", "2025 复试线参考：365-390+", "区位和外语资源好"), makeSchool("广东外语外贸大学", "约 5:1-10:1", "2025 复试线参考：355-380+", "外贸与翻译资源好")],
      tutors: ["翻译、语言学、文学和国别研究方向重视英语基础和研究兴趣。", "核心课程：语言学、翻译理论、英美文学、二外。"],
      competitions: [comp("全国大学英语四、六级考试", "英语专业也可用作基础能力证明。", links.cet), commonComps[0]],
      jobs: [job("外贸业务员", "6k-13k/月", "英语沟通、客户开发、外贸流程"), job("英语教师", "5k-12k/月", "教师资格证、口语、试讲"), job("翻译/本地化", "6k-14k/月", "笔译、术语管理、CAT 工具")],
      growth: growth(["准备专四专八、CATTI 或教师资格证。", "积累翻译作品、外贸实习或英文运营项目。"]),
      gongPosts: [post("海关/外事外语岗", "英语相关专业，部分要求专八", "往年进面常见 125-145+"), post("综合文字/翻译岗", "英语、翻译类，本科及以上", "往年进面常见 125-140+")]
    }),
    "会计学": major({
      aliases: ["会计", "审计", "财务会计"],
      schools: [makeSchool("厦门大学", "约 7:1-14:1", "2025 复试线参考：240-260+（会计专硕）", "会计传统强校"), makeSchool("上海财经大学", "约 10:1-18:1", "2025 复试线参考：240-265+（会计专硕）", "财经平台强"), makeSchool("中央财经大学", "约 8:1-15:1", "2025 复试线参考：240-260+（会计专硕）", "区位和平台好")],
      tutors: ["财务会计、审计、税务、管理会计方向重视准则和案例。", "核心课程：财务会计、审计、财管、税法。"],
      competitions: [comp("注册会计师全国统一考试", "财会审计就业关键证书。", links.cpa), commonComps[2]],
      jobs: [job("审计助理", "6k-12k/月", "会计准则、Excel、抗压"), job("财务分析", "7k-14k/月", "预算、报表、经营分析"), job("税务助理", "6k-12k/月", "税法、申报、沟通")],
      growth: growth(['准备 CPA/初级会计，CPA 入口：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.cpa + '">中注协</a>', "找事务所、企业财务、税务实习。"]),
      gongPosts: [post("税务局财会岗", "会计学、审计学、财务管理", "往年进面常见 125-145+"), post("审计机关岗位", "会计审计类，部分要求证书", "往年进面常见 125-145+")]
    }),
    "电气工程": major({
      aliases: ["电气", "电力系统", "自动化"],
      schools: [makeSchool("华北电力大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "电力系统特色强"), makeSchool("西安交通大学", "约 6:1-12:1", "2025 复试线参考：340-370+", "电气强校"), makeSchool("重庆大学", "约 4:1-9:1", "2025 复试线参考：320-355+", "电气工程实力强")],
      tutors: ["电力系统、电机电器、电力电子、新能源并网方向。", "核心课程：电路、电机、电力系统分析、继电保护。"],
      competitions: [commonComps[2], comp("全国大学生电子设计竞赛", "适合电气电子工程实践展示。", links.neea)],
      jobs: [job("电气工程师", "7k-15k/月", "电力系统、电气设计"), job("电力运维/调度", "6k-13k/月", "电网知识、倒班适应"), job("新能源电气工程师", "8k-16k/月", "储能、光伏、并网")],
      growth: growth(["学习电力系统和新能源并网项目。", "关注电网、发电集团、新能源企业校招。"]),
      gongPosts: [post("能源监管/工信相关岗位", "电气工程类，本科及以上", "往年进面常见 120-140+"), post("事业单位设备管理岗", "电气、自动化相关", "以地方公告为准")]
    }),
    "土木工程": major({
      aliases: ["土木", "结构工程", "岩土", "工程管理"],
      schools: [makeSchool("同济大学", "约 6:1-12:1", "2025 复试线参考：320-360+", "土木建筑强校"), makeSchool("东南大学", "约 5:1-10:1", "2025 复试线参考：315-350+", "建筑土木平台强"), makeSchool("哈尔滨工业大学", "约 4:1-9:1", "2025 复试线参考：310-350+", "工科基础扎实")],
      tutors: ["结构、岩土、桥梁、智能建造方向重视力学和工程实践。", "核心课程：结构力学、混凝土、钢结构、施工组织。"],
      competitions: [commonComps[2], comp("全国大学生结构设计竞赛", "适合结构设计和工程实践能力展示。", links.neea)],
      jobs: [job("结构设计助理", "6k-12k/月", "力学、规范、CAD/PKPM"), job("施工管理", "6k-11k/月", "现场协调、进度质量"), job("BIM 工程师", "6k-13k/月", "Revit、建模、协同")],
      growth: growth(["准备作品集和工程软件能力。", "关注设计院、施工单位、城投平台实习。"]),
      gongPosts: [post("住建局工程管理岗", "土木、建筑、工程管理", "往年进面常见 120-140+"), post("自然资源/交通事业单位", "土木工程类", "以地方公告为准")]
    }),
    "软件工程": major({
      aliases: ["软工", "软件", "计算机"],
      schools: [makeSchool("北京航空航天大学", "约 6:1-12:1", "2025 复试线参考：335-370+", "软件和计算机强"), makeSchool("电子科技大学", "约 5:1-10:1", "2025 复试线参考：330-365+", "电子信息平台强"), makeSchool("大连理工大学", "约 4:1-8:1", "2025 复试线参考：320-355+", "工科性价比高")],
      tutors: ["软件工程、系统架构、云计算、大数据方向重视工程项目。", "核心课程：软件工程、数据库、操作系统、分布式系统。"],
      competitions: [commonComps[1], commonComps[2], comp("中国大学生程序设计竞赛", "适合算法和工程能力展示。", "https://ccpc.io/")],
      jobs: [job("软件开发工程师", "10k-22k/月", "工程能力、代码质量"), job("前端工程师", "8k-18k/月", "JS/框架/交互"), job("DevOps 工程师", "9k-18k/月", "Linux、云、CI/CD")],
      growth: growth(["做开源项目或完整产品 Demo。", "训练代码质量、测试、部署和协作流程。"]),
      gongPosts: [post("信息中心技术岗", "软件工程、计算机类", "往年进面常见 125-145+"), post("政务数据管理岗", "计算机/软件/数据相关", "往年进面常见 120-140+")]
    }),
    "市场营销": major({
      aliases: ["营销", "工商管理", "品牌管理"],
      schools: [makeSchool("中国人民大学", "约 6:1-12:1", "2025 复试线参考：355-380+", "商科平台强"), makeSchool("中山大学", "约 5:1-10:1", "2025 复试线参考：345-370+", "管理学实力强"), makeSchool("对外经济贸易大学", "约 5:1-10:1", "2025 复试线参考：345-375+", "商科就业好")],
      tutors: ["消费者行为、品牌管理、数字营销方向重视案例和数据。", "核心课程：市场调研、消费者行为、品牌管理、数据营销。"],
      competitions: [comp("全国大学生广告艺术大赛", "适合品牌策划和创意作品展示。", "https://www.sun-ada.net/"), commonComps[1]],
      jobs: [job("品牌策划", "6k-13k/月", "洞察、文案、提案"), job("用户运营", "6k-14k/月", "活动、社群、数据"), job("广告投放", "7k-15k/月", "投流、素材、复盘")],
      growth: growth(["做品牌策划案和数据复盘作品。", "找快消、互联网、电商、广告公司实习。"]),
      gongPosts: [post("市场监管综合岗", "工商管理、市场营销等", "往年进面常见 125-140+"), post("商务部门综合岗", "管理类、经济类", "往年进面常见 120-140+")]
    }),
    "财务管理": major({
      aliases: ["财管", "会计", "公司财务"],
      schools: [makeSchool("西南财经大学", "约 6:1-12:1", "2025 复试线参考：350-380+", "财经特色强"), makeSchool("中南财经政法大学", "约 5:1-10:1", "2025 复试线参考：345-375+", "财会法融合"), makeSchool("东北财经大学", "约 4:1-9:1", "2025 复试线参考：340-370+", "财经性价比高")],
      tutors: ["公司财务、资本预算、管理会计方向重视案例和数据。", "核心课程：财务管理、会计、审计、税法。"],
      competitions: [comp("注册会计师全国统一考试", "财务管理就业关键证书。", links.cpa), commonComps[2]],
      jobs: [job("财务专员", "6k-12k/月", "会计、报表、Excel"), job("经营分析", "7k-15k/月", "预算、BI、业务理解"), job("资金管理助理", "7k-14k/月", "现金流、融资、风险")],
      growth: growth(['准备 CPA/初会：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.cpa + '">CPA 报名入口</a>', "做财务模型和经营分析案例。"]),
      gongPosts: [post("财政局/税务局岗位", "财务管理、会计、财政类", "往年进面常见 125-145+"), post("审计与国资监管岗", "财会审计类", "往年进面常见 125-145+")]
    }),
    "机械工程": major({
      aliases: ["机械", "机电", "智能制造"],
      schools: [makeSchool("西安交通大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "机械强校"), makeSchool("哈尔滨工业大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "工程平台强"), makeSchool("华中科技大学", "约 5:1-10:1", "2025 复试线参考：325-365+", "制造方向强")],
      tutors: ["机器人、智能制造、机械设计、车辆工程方向。", "核心课程：机械设计、控制、材料力学、制造工艺。"],
      competitions: [comp("全国大学生机械创新设计大赛", "适合机械设计和工程实践展示。", links.neea), commonComps[1]],
      jobs: [job("机械设计工程师", "7k-14k/月", "CAD/CAE、结构设计"), job("工艺工程师", "6k-13k/月", "生产工艺、质量改善"), job("机器人工程师", "8k-16k/月", "控制、机构、调试")],
      growth: growth(["做机械设计作品和工程图纸集。", "关注制造业、新能源车、机器人企业实习。"]),
      gongPosts: [post("市场监管特种设备岗", "机械类，本科及以上", "往年进面常见 120-140+"), post("工信/质检事业单位", "机械工程类", "以地方公告为准")]
    }),
    "化学工程": major({
      aliases: ["化工", "化学", "应用化学"],
      schools: [makeSchool("天津大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "化工强校"), makeSchool("华东理工大学", "约 5:1-10:1", "2025 复试线参考：315-355+", "化工就业资源好"), makeSchool("北京化工大学", "约 4:1-8:1", "2025 复试线参考：310-350+", "化工特色鲜明")],
      tutors: ["反应工程、分离工程、材料化工、绿色化工方向。", "核心课程：化工原理、反应工程、物化、有机化学。"],
      competitions: [commonComps[0], comp("全国大学生化工设计竞赛", "适合化工流程设计和团队协作展示。", links.neea)],
      jobs: [job("化工工艺工程师", "7k-14k/月", "流程、设备、安全"), job("研发助理", "7k-15k/月", "实验、分析、记录"), job("EHS 工程师", "7k-14k/月", "安全环保、法规")],
      growth: growth(["强化实验记录、工艺模拟和安全规范。", "关注新材料、精细化工、能源化工实习。"]),
      gongPosts: [post("生态环境执法/监测岗", "化学、化工、环境类", "往年进面常见 120-140+"), post("应急管理相关岗位", "化工安全相关", "往年进面常见 120-140+")]
    }),
    "生物医学工程": major({
      aliases: ["生医工", "医疗器械", "生物工程"],
      schools: [makeSchool("东南大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "生医工实力强"), makeSchool("上海交通大学", "约 6:1-12:1", "2025 复试线参考：335-370+", "医工交叉平台强"), makeSchool("浙江大学", "约 6:1-12:1", "2025 复试线参考：330-365+", "交叉学科资源好")],
      tutors: ["医学影像、医疗器械、生物材料、神经工程方向。", "核心课程：生物医学信号、医学成像、传感器、生物材料。"],
      competitions: [commonComps[1], commonComps[2], commonComps[0]],
      jobs: [job("医疗器械研发", "8k-16k/月", "电子/机械/法规"), job("医学影像算法助理", "10k-20k/月", "图像处理、AI"), job("注册/质量工程师", "7k-14k/月", "医疗器械法规、质量体系")],
      growth: growth(["做医疗器械或医学影像项目。", "了解 NMPA 注册、质量体系和临床需求。"]),
      gongPosts: [post("药监/市场监管医疗器械岗", "生物医学工程、医疗器械相关", "往年进面常见 120-140+"), post("卫健委信息/设备岗", "医工交叉专业", "以地方公告为准")]
    }),
    "药学": major({
      aliases: ["药物制剂", "药理", "中药学"],
      schools: [makeSchool("中国药科大学", "约 5:1-10:1", "2025 复试线参考：320-360+", "药学特色强"), makeSchool("沈阳药科大学", "约 4:1-8:1", "2025 复试线参考：310-350+", "药学传统强校"), makeSchool("北京大学药学院", "约 6:1-12:1", "2025 复试线参考：330-370+", "平台和科研强")],
      tutors: ["药物化学、药剂、药理、临床药学方向。", "核心课程：药理学、药剂学、药物分析、药物化学。"],
      competitions: [commonComps[0], commonComps[1]],
      jobs: [job("药企研发助理", "7k-15k/月", "实验、文献、记录"), job("药品注册专员", "7k-14k/月", "法规、申报资料"), job("临床监察员 CRA", "8k-16k/月", "GCP、沟通、出差")],
      growth: growth(["积累药企、医院药房或临床试验实习。", "训练文献检索、实验记录和法规意识。"]),
      gongPosts: [post("药监局监管岗", "药学、药物制剂相关", "往年进面常见 120-140+"), post("市场监管药品安全岗", "药学类，本科及以上", "往年进面常见 120-140+")]
    }),
    "护理学": major({
      aliases: ["护理", "助产", "老年护理"],
      schools: [makeSchool("北京协和医学院", "约 4:1-8:1", "2025 复试线参考：310-345+", "护理教育资源强"), makeSchool("中南大学", "约 4:1-8:1", "2025 复试线参考：305-340+", "护理学科强"), makeSchool("四川大学", "约 4:1-8:1", "2025 复试线参考：305-340+", "医学平台好")],
      tutors: ["临床护理、护理管理、老年护理、社区护理方向。", "核心课程：基础护理、内外科护理、护理研究、护理管理。"],
      competitions: [commonComps[0], comp("护士执业资格考试", "护理就业核心资格考试。", links.neea)],
      jobs: [job("临床护士", "5k-11k/月", "护士资格证、临床操作"), job("护理管理助理", "6k-12k/月", "沟通、流程、质控"), job("健康管理师助理", "5k-10k/月", "慢病管理、沟通服务")],
      growth: growth(["通过护士执业资格考试，积累医院实习。", "关注老年护理、社区护理、专科护士方向。"]),
      gongPosts: [post("卫健系统事业编护理岗", "护理学，护士资格证", "以地方公告和综合成绩为准"), post("疾控/社区卫生相关岗位", "护理或公共卫生相关", "往年进面常见 115-135+")]
    }),
    "心理学": major({
      aliases: ["应用心理", "心理咨询", "心理健康教育"],
      schools: [makeSchool("北京师范大学", "约 8:1-16:1", "2025 复试线参考：360-390+", "心理学顶尖平台"), makeSchool("华东师范大学", "约 6:1-12:1", "2025 复试线参考：350-380+", "心理与教育资源强"), makeSchool("华南师范大学", "约 5:1-10:1", "2025 复试线参考：345-375+", "应用心理资源好")],
      tutors: ["发展心理、教育心理、咨询心理、用户研究方向。", "核心课程：心理统计、实验心理、心理测量、咨询理论。"],
      competitions: [commonComps[0], commonComps[2]],
      jobs: [job("用户研究助理", "8k-16k/月", "访谈、问卷、数据分析"), job("心理健康教师", "5k-11k/月", "教师资格、咨询基础"), job("EAP/心理服务运营", "6k-12k/月", "心理学基础、项目运营")],
      growth: growth(["训练统计、问卷、访谈和报告写作。", '教育方向准备教师资格证：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + links.moeTeacher + '">官方入口</a>']),
      gongPosts: [post("监狱/戒毒系统心理矫治岗", "心理学类，部分有体测要求", "往年进面常见 115-135+"), post("教育系统心理健康岗", "心理学、教育学相关", "以地方公告为准")]
    }),
    "应用经济学": major({
      aliases: ["经济学", "产业经济", "区域经济", "国际贸易"],
      schools: [makeSchool("中国人民大学", "约 8:1-16:1", "2025 复试线参考：360-390+", "经济学平台强"), makeSchool("南开大学", "约 6:1-12:1", "2025 复试线参考：350-380+", "经济学传统强校"), makeSchool("厦门大学", "约 6:1-12:1", "2025 复试线参考：350-380+", "财政金融和统计资源好")],
      tutors: ["产业经济、区域经济、国际贸易、数量经济方向。", "核心课程：微观、宏观、计量经济学、产业经济学。"],
      competitions: [commonComps[2], commonComps[1]],
      jobs: [job("经济研究助理", "7k-15k/月", "数据、报告、宏观分析"), job("产业分析师", "8k-16k/月", "行业研究、政策分析"), job("数据运营/商业分析", "8k-18k/月", "SQL、BI、业务理解")],
      growth: growth(["训练计量、数据分析和政策研究报告。", "找智库、券商研究、咨询、政府研究机构实习。"]),
      gongPosts: [post("发改委/统计局综合岗", "经济学、统计、应用经济学", "往年进面常见 125-145+"), post("商务/财政部门岗位", "经济贸易、财政金融相关", "往年进面常见 125-145+")]
    })
  };

  return {
    industries: industries,
    majors: majors,
    competitions: commonComps,
    links: links,
    exams: [
      { name: "2025 年国考", time: "报名：2024 年 10 月 15 日至 10 月 24 日；公共科目笔试：2024 年 12 月 1 日。", link: links.scs2025, note: "以国家公务员局 2025 年度考试录用公务员专题为准。" },
      { name: "2025 年各省省考", time: "各省时间不同，多数省份在 2025 年 1-3 月发布公告并组织报名，2-4 月笔试。", link: links.scs, note: "请以各省公务员主管部门公告为准，本站提供国家公务员局入口做汇总跳转。" },
      { name: "2025 年事业单位", time: "事业单位全年分批招聘，联考多见于上半年和下半年，岗位以各地人社部门公告为准。", link: links.mohrss, note: "以人社部门、招聘单位和当地人事考试网公告为准。" }
    ],
    civilTypes: [
      { name: "国考", desc: "中央机关及直属机构统一招录，岗位覆盖税务、海关、统计、铁路公安等，竞争范围全国，公告和职位表集中发布。" },
      { name: "省考", desc: "省市县乡机关招录，地域属性强，适合想留在本省发展的同学，考试时间和题型由各省安排。" },
      { name: "事业单位", desc: "学校、医院、科研院所、公共服务机构等招聘，既有综合管理岗也有专业技术岗，考试内容因地区和单位差异较大。" },
      { name: "选调生", desc: "面向优秀应届毕业生和部分基层项目人员，通常重视学校、党员、学生干部、基层服务意愿等条件。" }
    ]
  };
}

DATA = buildExpandedData2025();

/* 2025 全站数据强化：行业细分岗位 / 头部企业 / 行业趋势 */
(function enrichIndustriesFull() {
  var map = {
    "互联网": { subPositions: [["后端开发工程师", "服务端接口、数据库与高并发系统", "10k-22k/月", "Java/Go/Python、数据库、项目"], ["前端开发工程师", "Web/小程序界面与交互", "8k-18k/月", "JS框架、CSS、工程化"], ["产品经理", "需求拆解、原型与项目推进", "9k-18k/月", "用户调研、文档、沟通"], ["数据分析师", "业务指标、报表与AB实验", "8k-18k/月", "SQL、Python、统计"]], topCompanies: ["腾讯", "阿里巴巴", "字节跳动", "美团", "百度", "京东", "网易", "快手", "滴滴", "拼多多"], trend2025: "AI 应用与产业互联网仍是结构性机会，大模型落地、出海 SaaS 与智能体方向增长明显，但通用运营和初级开发竞争加剧。" },
    "金融": { subPositions: [["银行管培生", "轮岗培训与基层业务", "7k-14k/月", "金融基础、网申笔试"], ["券商研究助理", "行业与公司研究、报告撰写", "8k-18k/月", "财务分析、写作"], ["风控/合规助理", "风险识别与合规审查", "7k-15k/月", "法规、数据分析"], ["财富管理助理", "客户资产配置与服务", "7k-13k/月", "沟通、证书加分"]], topCompanies: ["工商银行", "建设银行", "中国银行", "招商银行", "中信证券", "中金公司", "华泰证券", "国泰君安", "中国人寿", "平安集团"], trend2025: "金融科技、财富管理与合规风控需求稳定，居民资产配置与对外开放带来新机会，但对专业与证书门槛提高。" },
    "教育": { subPositions: [["中小学教师", "学科教学与班级管理", "5k-11k/月", "教师资格证、试讲"], ["教研/课程设计", "课程开发与教学设计", "6k-12k/月", "教学设计、沟通"], ["教育运营", "用户运营与活动组织", "5k-10k/月", "运营、数据意识"]], topCompanies: ["新东方", "好未来", "猿辅导", "作业帮", "学而思", "中公教育", "粉笔教育", "网易有道", "高途教育", "科大讯飞教育"], trend2025: "职业教育、素质教育与教育数字化仍有机会，学科类培训收缩后，AI 辅助教学与职业能力评价成为增长点。" },
    "医疗": { subPositions: [["住院/规培医师", "临床诊疗与轮转", "6k-12k/月", "执业医师路径、规培"], ["临床研究协调员", "临床试验执行与数据", "6k-11k/月", "GCP、流程"], ["医学事务专员", "医学沟通与文献支持", "8k-15k/月", "医学文献、合规"]], topCompanies: ["恒瑞医药", "迈瑞医疗", "药明康德", "联影医疗", "百济神州", "石药集团", "华润医药", "微创医疗", "信达生物", "复星医药"], trend2025: "人口老龄化与创新药械带来长期需求，医疗器械国产替代、细胞基因治疗与 AI 影像是重点方向。" },
    "制造业": { subPositions: [["工艺工程师", "生产流程优化", "6k-13k/月", "工艺、设备基础"], ["质量工程师", "质量体系与检验", "6k-12k/月", "质量工具、细致"], ["智能制造工程师", "产线自动化与数据", "7k-14k/月", "自动化、数据"]], topCompanies: ["三一重工", "美的集团", "海尔智家", "格力电器", "中联重科", "徐工机械", "比亚迪", "宁德时代", "立讯精密", "汇川技术"], trend2025: "高端制造、工业软件与机器人持续升级，出海与智能化转型是主线，对复合工程人才需求上升。" },
    "新能源": { subPositions: [["电池研发工程师", "电芯与材料研发", "8k-18k/月", "电化学、材料"], ["储能工程师", "储能系统设计与集成", "8k-16k/月", "电气、系统"], ["光伏/风电工程师", "电站与设备开发", "7k-15k/月", "电气、能源"]], topCompanies: ["宁德时代", "隆基绿能", "阳光电源", "比亚迪", "晶澳科技", "天合光能", "金风科技", "远景能源", "亿纬锂能", "华为数字能源"], trend2025: "新能源车、储能与新型电力系统仍是高景气，固态电池、构网型储能与海外电站是热点。" },
    "文化传媒": { subPositions: [["新媒体运营", "内容与账号运营", "5k-10k/月", "写作、选题"], ["短视频编导", "脚本与拍摄统筹", "6k-12k/月", "剪辑、策划"], ["品牌策划", "品牌活动与传播", "6k-13k/月", "洞察、提案"]], topCompanies: ["字节跳动", "快手", "芒果超媒", "分众传媒", "华策影视", "光线传媒", "咪咕文化", "阅文集团", "小红书", "B站"], trend2025: "内容产业仍有空间，平台规则变化快，短剧、AIGC 内容与品牌出海带来细分机会。" },
    "咨询": { subPositions: [["战略咨询顾问", "企业战略与诊断", "9k-20k/月", "逻辑、案例、表达"], ["管理咨询顾问", "组织与流程优化", "8k-18k/月", "商业分析"], ["IT 咨询顾问", "数字化方案落地", "8k-17k/月", "技术理解、项目管理"]], topCompanies: ["麦肯锡", "波士顿咨询", "贝恩咨询", "德勤", "普华永道", "埃森哲", "IBM 咨询", "罗兰贝格", "安永", "毕马威"], trend2025: "企业数字化、组织效率与出海带来项目需求，AI 战略与数据治理成为新增长点。" },
    "房地产": { subPositions: [["工程管理", "项目进度与质量", "5k-11k/月", "土木、协调"], ["成本招采", "成本与采购管理", "6k-12k/月", "造价、合同"], ["物业/资产管理", "存量运营与服务", "5k-10k/月", "运营、服务"]], topCompanies: ["万科", "保利发展", "中海地产", "华润置地", "招商蛇口", "龙湖集团", "绿城中国", "越秀地产", "碧桂园服务", "万物云"], trend2025: "行业从高增长转向存量运营、保障房与城市更新，物业与资产管理人才需求相对稳定。" },
    "公务员": { subPositions: [["中央机关综合岗", "政策与综合事务", "5k-12k/月", "行测申论、政审"], ["税务/海关岗", "执法与服务", "5k-11k/月", "专业匹配"], ["选调生", "基层锻炼与培养", "5k-10k/月", "党员、学生干部"]], topCompanies: ["国家税务总局", "海关总署", "公安部", "国家统计局", "中央办公厅", "财政部", "教育部", "国家发改委", "最高人民法院", "国家市场监督总局"], trend2025: "公共服务、基层治理与数字政务持续需要人才，应届与基层经历仍是重要条件。" },
    "半导体": { subPositions: [["芯片设计工程师", "数字/模拟电路设计", "9k-20k/月", "微电子、EDA"], ["验证工程师", "功能验证与仿真", "8k-18k/月", "SystemVerilog、验证"], ["工艺/封测工程师", "制程与封装测试", "7k-15k/月", "材料、工艺"]], topCompanies: ["中芯国际", "华为海思", "长江存储", "韦尔股份", "兆易创新", "紫光展锐", "寒武纪", "北方华创", "中微公司", "沪硅产业"], trend2025: "国产替代、先进封装与汽车芯片需求长期存在，AI 算力芯片与设备国产化是核心主线。" },
    "生物医药": { subPositions: [["药物研发助理", "实验与候选药物筛选", "7k-15k/月", "药学、实验"], ["临床监察员 CRA", "临床试验监督", "8k-16k/月", "GCP、沟通"], ["注册专员", "药品注册申报", "7k-14k/月", "法规、资料"]], topCompanies: ["恒瑞医药", "药明康德", "百济神州", "信达生物", "复星医药", "康方生物", "再鼎医药", "君实生物", "中国生物制药", "石药集团"], trend2025: "创新药、细胞基因治疗与器械仍是重点，ADC、GLP-1 与 AI 制药带来新机会。" },
    "新能源汽车": { subPositions: [["三电系统工程师", "电池/电机/电控开发", "8k-18k/月", "电气、控制"], ["智能座舱工程师", "座舱软件与交互", "9k-18k/月", "软件、HMI"], ["自动驾驶测试", "算法验证与路测", "10k-20k/月", "算法、测试"]], topCompanies: ["比亚迪", "理想汽车", "蔚来", "小鹏汽车", "华为车 BU", "吉利控股", "长安汽车", "广汽埃安", "赛力斯", "零跑汽车"], trend2025: "智能化与电动化继续推进，竞争从整车扩展到智能驾驶与供应链，出海带来增量。" },
    "人工智能": { subPositions: [["算法工程师", "模型研发与优化", "12k-25k/月", "数学、ML、工程"], ["AI 应用工程师", "大模型应用落地", "10k-22k/月", "Prompt、工程"], ["数据科学家", "数据建模与分析", "10k-22k/月", "统计、Python"]], topCompanies: ["百度", "字节跳动", "阿里巴巴", "腾讯", "华为", "商汤科技", "科大讯飞", "旷视科技", "智谱AI", "月之暗面"], trend2025: "大模型应用、行业智能化与智能硬件是热点，Agent、具身智能与垂直模型落地加速。" },
    "广告营销": { subPositions: [["品牌策划", "品牌策略与活动", "6k-13k/月", "洞察、文案"], ["媒介投放", "投放与效果优化", "7k-15k/月", "投流、数据"], ["用户增长", "增长策略与实验", "7k-15k/月", "数据、AB 实验"]], topCompanies: ["分众传媒", "蓝色光标", "省广集团", "华扬联众", "引力传媒", "巨量引擎", "腾讯广告", "小红书商业化", "快手磁力", "阿里妈妈"], trend2025: "数字营销与效果广告仍有需求，AI 创意生成与品效合一成为趋势，更看重数据与复盘。" },
    "物流供应链": { subPositions: [["供应链计划", "需求与库存计划", "6k-13k/月", "数据、逻辑"], ["采购专员", "供应商与采购管理", "6k-12k/月", "谈判、流程"], ["国际物流运营", "跨境物流与关务", "6k-14k/月", "英语、流程"]], topCompanies: ["顺丰控股", "京东物流", "菜鸟网络", "中通快递", "圆通速递", "韵达股份", "满帮集团", "中远海控", "东航物流", "传化智联"], trend2025: "制造出海、即时零售与跨境贸易推动需求，智慧物流与供应链数字化是主线。" },
    "建筑设计": { subPositions: [["建筑设计师", "方案与施工图设计", "5k-12k/月", "制图、作品集"], ["BIM 工程师", "信息模型与协同", "6k-13k/月", "Revit、建模"], ["规划设计", "城市与片区规划", "6k-12k/月", "规划、规范"]], topCompanies: ["中国建筑", "中国中铁", "中国铁建", "华东建筑", "同济设计", "清华同衡", "上海建工", "华南理工设计", "中南建筑", "北京市建筑设计研究院"], trend2025: "新增开发放缓，城市更新、公共建筑与存量改造仍有机会，BIM 与绿色建筑需求上升。" },
    "化工": { subPositions: [["化工工艺工程师", "流程与工艺优化", "7k-14k/月", "化工原理、设备"], ["研发助理", "新材料与配方研发", "7k-15k/月", "实验、分析"], ["EHS 工程师", "安全环保管理", "7k-14k/月", "法规、现场"]], topCompanies: ["中国石化", "中国石油", "万华化学", "华鲁恒升", "荣盛石化", "恒力石化", "东方盛虹", "宝丰能源", "卫星化学", "合盛硅业"], trend2025: "新材料、精细化工与绿色化工是重点，双碳与高端化工材料带来结构性机会。" },
    "农业": { subPositions: [["种业研发", "品种选育与试验", "5k-11k/月", "农学、生物"], ["植保技术员", "病虫草害防治", "5k-10k/月", "农学、现场"], ["农业科技运营", "智慧农业与数据", "6k-12k/月", "数据、运营"]], topCompanies: ["隆平高科", "大北农", "新希望", "牧原股份", "温氏股份", "北大荒", "中化农业", "先正达", "大疆农业", "极飞科技"], trend2025: "种业振兴、智慧农业与食品安全带来机会，数字农业与生物育种是增长点。" },
    "环保": { subPositions: [["环评工程师", "环境影响评价", "5k-12k/月", "环境工程、法规"], ["污水处理工程师", "水处理工艺与运维", "6k-12k/月", "水处理、工艺"], ["碳管理/ESG", "碳核算与ESG咨询", "6k-13k/月", "数据、政策"]], topCompanies: ["光大环境", "北控水务", "首创环保", "伟明环保", "瀚蓝环境", "绿色动力", "中国天楹", "盈峰环境", "龙净环保", "菲达环保"], trend2025: "双碳、环保合规与绿色供应链推动需求，碳管理与 ESG 咨询成为新增长点。" },
    "法律": { subPositions: [["律师助理", "案件辅助与文书", "6k-12k/月", "法考、检索"], ["企业法务", "合同与合规", "7k-15k/月", "合同、沟通"], ["知识产权专员", "专利商标与诉讼", "7k-14k/月", "知产、外语"]], topCompanies: ["金杜律师事务所", "中伦律师事务所", "君合律师事务所", "方达律师事务所", "海问律师事务所", "通商律师事务所", "锦天城", "大成律师事务所", "德恒律师事务所", "中伦文德"], trend2025: "合规、数据安全、知识产权与涉外业务增长，法务与合规人才需求稳定上升。" },
    "会计审计": { subPositions: [["审计助理", "审计程序与底稿", "6k-12k/月", "会计准则、Excel"], ["财务分析", "预算与经营分析", "7k-14k/月", "报表、BI"], ["税务助理", "税务申报与筹划", "6k-12k/月", "税法、沟通"]], topCompanies: ["普华永道", "德勤", "毕马威", "安永", "立信", "天健", "信永中和", "大华", "致同", "容诚"], trend2025: "监管合规与企业精细化管理使需求稳定，数字化审计与 ESG 鉴证带来新机会。" },
    "广告传媒": { subPositions: [["广告执行", "投放与执行跟进", "5k-11k/月", "流程、沟通"], ["内容编导", "短视频内容策划", "6k-12k/月", "剪辑、策划"], ["直播策划", "直播脚本与运营", "6k-13k/月", "选品、复盘"]], topCompanies: ["分众传媒", "蓝色光标", "华扬联众", "引力传媒", "芒果超媒", "华策影视", "光线传媒", "巨量引擎", "腾讯广告", "小红书"], trend2025: "品牌内容化与短视频营销仍活跃，AI 创意与达人营销带来效率提升。" },
    "游戏": { subPositions: [["客户端工程师", "游戏客户端开发", "8k-18k/月", "C++、引擎"], ["游戏策划", "玩法与数值设计", "8k-16k/月", "设计、数据"], ["技术美术 TA", "渲染与管线工具", "9k-18k/月", "图形、美术"]], topCompanies: ["腾讯游戏", "网易游戏", "米哈游", "莉莉丝", "叠纸游戏", "完美世界", "三七互娱", "吉比特", "鹰角网络", "游族网络"], trend2025: "精品化、出海与小游戏带来机会，版号与周期带来不确定性，AI 辅助研发成为趋势。" },
    "电商": { subPositions: [["平台运营", "店铺与活动运营", "6k-14k/月", "运营、数据"], ["商品运营", "选品与商品管理", "6k-13k/月", "选品、供应链"], ["数据分析", "交易与用户分析", "7k-15k/月", "SQL、BI"]], topCompanies: ["阿里巴巴", "京东", "拼多多", "抖音电商", "快手电商", "美团", "唯品会", "小红书", "得物", " SHEIN "], trend2025: "即时零售、跨境电商与内容电商继续增长，AI 选品与精细化运营成为竞争力。" },
    "直播电商": { subPositions: [["主播运营", "主播培养与场控", "6k-14k/月", "内容、复盘"], ["投流操盘", "投放与ROI优化", "7k-15k/月", "投流、数据"], ["选品专员", "商品筛选与供应链", "6k-13k/月", "选品、谈判"]], topCompanies: ["抖音电商", "快手电商", "淘宝直播", "东方甄选", "交个朋友", "辛选集团", "遥望科技", "三只羊网络", "京东直播", "视频号电商"], trend2025: "行业进入精细化运营阶段，合规与供应链能力更重要，店播与跨境直播带来增量。" },
    "保险": { subPositions: [["管培生", "轮岗与培养", "6k-12k/月", "金融、沟通"], ["核保核赔", "风险评估与理赔", "6k-12k/月", "医学、法规"], ["精算助理", "定价与准备金", "8k-16k/月", "数学、精算"]], topCompanies: ["中国人寿", "中国平安", "中国人保", "太平洋保险", "新华保险", "泰康保险", "友邦保险", "阳光保险", "众安在线", "水滴公司"], trend2025: "养老、健康险与保险科技仍有空间，银保渠道调整与产品创新带来变化。" },
    "证券": { subPositions: [["投研助理", "行业与公司研究", "8k-18k/月", "财务、写作"], ["财富管理顾问", "客户资产配置", "7k-14k/月", "沟通、证书"], ["机构销售", "机构客户服务", "8k-16k/月", "表达、人脉"]], topCompanies: ["中信证券", "中金公司", "华泰证券", "国泰君安", "海通证券", "招商证券", "广发证券", "申万宏源", "东方财富", "银河证券"], trend2025: "资本市场改革与居民财富管理带来机会，ETF 与指数化投资持续发展。" },
    "基金": { subPositions: [["行业研究助理", "行业与公司研究", "8k-16k/月", "财务、研究"], ["基金运营专员", "份额与清算", "6k-12k/月", "运营、细致"], ["量化助理", "策略研发与回测", "9k-18k/月", "数学、编程"]], topCompanies: ["易方达基金", "华夏基金", "广发基金", "南方基金", "嘉实基金", "博时基金", "汇添富基金", "富国基金", "招商基金", "兴证全球基金"], trend2025: "公募、私募与指数化投资持续发展，养老目标基金与 ETF 成为增长亮点。" },
    "租赁": { subPositions: [["融资租赁业务", "项目尽调与放款", "6k-13k/月", "金融、风控"], ["资产运营", "资产管理与处置", "6k-12k/月", "资产、合同"], ["风控专员", "风险审查与贷后", "6k-12k/月", "风控、数据"]], topCompanies: ["国银金租", "交银金租", "招银金租", "远东宏信", "平安租赁", "海通恒信", "中建投租赁", "中关村租赁", "光大金租", "民生金租"], trend2025: "产业设备更新与消费租赁带来细分机会，绿色租赁与数字化风控是趋势。" }
  };
  DATA.industries.forEach(function (it) {
    var m = map[it.name];
    if (!m) return;
    if (!it.subPositions) it.subPositions = m.subPositions;
    if (!it.topCompanies) it.topCompanies = m.topCompanies;
    if (!it.trend2025) it.trend2025 = m.trend2025;
  });
})();

/* 考研专区强化：补 10 个热门专业至 30 个 + 考试科目 / 国家线 / 院校招生方向学费调剂 / 一站式时间节点 / 备考资料 */
(function enrichKaoyanFull() {
  var L = DATA.links, C = DATA.competitions;
  function mkSchool(name, ratio, line, note) { return { name: name, ratio: ratio, line: line, note: note }; }
  function mkJob(name, salary, req) { return { name: name, salary: salary, req: req }; }
  function mkPost(name, req, score) { return { name: name, req: req, score: score }; }
  var newMajors = {
    "新闻与传播": {
      aliases: ["新闻", "传播学", "广告学", "网络与新媒体", "广电"],
      schools: [mkSchool("中国人民大学", "约 8:1-15:1", "2025 文学复试线参考 365-395+", "新闻传播顶尖平台"), mkSchool("中国传媒大学", "约 6:1-12:1", "2025 复试线参考 360-385+", "传媒特色最强"), mkSchool("复旦大学", "约 8:1-16:1", "2025 复试线参考 370-400+", "区位与学科强")],
      tutors: ["新闻业务、传播理论、新媒体与舆情方向重视理论与实务结合。", "核心课程：新闻理论、传播学、新闻采访写作、新媒体研究。"],
      competitions: [C[0], mkComp("全国大学生广告艺术大赛", "适合文案、策划、传播作品展示。", "https://www.sun-ada.net/")],
      jobs: [mkJob("新媒体编辑", "5k-11k/月", "写作、选题、排版"), mkJob("品牌公关", "6k-13k/月", "策划、媒介、危机"), mkJob("记者/内容策划", "5k-12k/月", "采访、写作、抗压")],
      growth: growth(["积累公众号、短视频、评论作品。", "关注央媒、门户与新媒体实习。"]),
      gongPosts: [mkPost("宣传部门综合岗", "新闻传播类，本科及以上", "往年进面常见 125-140+"), mkPost("网信办/广电岗位", "新闻传播、网络新媒体相关", "往年进面常见 120-140+")],
      examSubjects: "公共课：101 思想政治理论、201 英语一；学硕专业课：新闻传播学综合；专硕（0552）专业课：334 新闻与传播专业综合能力、440 专业基础。",
      scoreLine: "文学门类国家线长期居高位，2025 年 A 区文学学硕总分线约 355 分（单科 53/80）；新闻与传播专硕 A 区约 355 分。",
      schoolNote: "学硕学费约 8000 元/年；新闻与传播专硕学费 1万-5万元/年不等，顶尖院校偏高；调剂名额偏少，竞争集中在初试。"
    },
    "工商管理": {
      aliases: ["MBA", "企业管理", "工商管理硕士"],
      schools: [mkSchool("清华大学经管学院", "提前批为主", "MBA 提面+管理类联考", "顶尖 MBA 平台"), mkSchool("复旦大学管理学院", "提前批为主", "MBA 提面+管理类联考", "区位与校友强"), mkSchool("中山大学管理学院", "约 6:1-10:1", "MBA 联考复试线参考 170+", "华南就业好")],
      tutors: ["战略管理、组织行为、市场营销、创新创业方向。", "核心课程：管理学、战略管理、组织行为、运营管理。"],
      competitions: [C[1], C[2]],
      jobs: [mkJob("管培生", "8k-15k/月", "沟通、逻辑、轮岗"), mkJob("业务运营", "7k-14k/月", "流程、数据"), mkJob("市场/品牌", "7k-15k/月", "洞察、提案")],
      growth: growth(["积累商赛、实习与项目复盘。", "准备管理类联考综合能力与英语二。"]),
      gongPosts: [mkPost("市场监管综合岗", "工商管理、市场营销相关", "往年进面常见 120-140+"), mkPost("商务/发改部门岗", "管理类、经济类", "往年进面常见 120-140+")],
      examSubjects: "学硕：101 政治、201 英语一、303 数学三、管理学综合；专硕 MBA/1251：199 管理类联考综合能力、204 英语二。",
      scoreLine: "管理学学硕 A 区国家线 2025 年约 347 分；管理类联考 MBA A 区总分线近年约 162-170 分（含单科线）。",
      schoolNote: "MBA 学费跨度大，普通院校 5万-15万元，顶尖院校 30万-60万元；全日制与非全日制均招生，调剂机会以非全日制和 B 区院校为主。"
    },
    "公共管理": {
      aliases: ["MPA", "行政管理", "公共事业管理"],
      schools: [mkSchool("中国人民大学", "约 8:1-14:1", "MPA 联考复试线参考 175+", "公共管理顶尖"), mkSchool("清华大学", "提前批为主", "MPA 提面+联考", "政策与治理强"), mkSchool("中山大学", "约 6:1-10:1", "MPA 联考复试线参考 170+", "华南公共管理强")],
      tutors: ["公共政策、行政管理、社会保障、城市治理方向。", "核心课程：公共管理学、公共政策分析、政治学、研究方法。"],
      competitions: [C[0], C[2]],
      jobs: [mkJob("行政/人事专员", "5k-11k/月", "沟通、办公软件"), mkJob("公共政策研究助理", "7k-13k/月", "政策、写作"), mkJob("社区/基层治理", "5k-10k/月", "协调、服务")],
      growth: growth(["关注政府、街道、事业单位实习。", "准备管理类联考与申论写作。"]),
      gongPosts: [mkPost("街道/乡镇综合管理岗", "公共管理、行政管理类", "往年进面常见 120-140+"), mkPost("人社/民政部门岗", "公共管理、社会保障相关", "往年进面常见 125-140+")],
      examSubjects: "学硕：101 政治、201 英语一、公共管理学综合；专硕 MPA/1252：199 管理类联考综合能力、204 英语二。",
      scoreLine: "管理学 A 区国家线 2025 年学硕约 347 分；MPA A 区联考总分线近年约 170-178 分。",
      schoolNote: "MPA 学费 2万-10万元不等，非全日制为主；与考公方向高度契合，调剂以非全日制和 B 区院校为主。"
    },
    "自动化": {
      aliases: ["自动化", "控制工程", "机器人工程"],
      schools: [mkSchool("清华大学", "约 8:1-16:1", "2025 复试线参考 340-375+", "控制科学顶尖"), mkSchool("浙江大学", "约 7:1-14:1", "2025 复试线参考 335-370+", "控制与工业智能强"), mkSchool("北京理工大学", "约 6:1-12:1", "2025 复试线参考 330-365+", "军工与机器人平台")],
      tutors: ["控制理论与控制工程、模式识别、机器人、智能系统方向。", "核心课程：自动控制原理、电路、微机原理、信号与系统。"],
      competitions: [C[2], mkComp("全国大学生电子设计竞赛", "适合自动化与电子工程实践展示。", L.neea)],
      jobs: [mkJob("控制工程师", "8k-16k/月", "控制算法、PLC"), mkJob("机器人工程师", "9k-18k/月", "运动控制、感知"), mkJob("算法/嵌入式工程师", "9k-18k/月", "C/嵌入式、算法")],
      growth: growth(["做控制或机器人项目作品。", "关注智能制造、机器人、新能源企业实习。"]),
      gongPosts: [mkPost("工信/质检特种设备岗", "自动化、控制工程类", "往年进面常见 120-140+"), mkPost("交通/能源事业单位", "自动化、电气相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、301 数学一、自动控制原理（或电路/信号）；专硕电子信息 0854：政治、英语、数学一/二、专业课。",
      scoreLine: "工学 A 区国家线 2025 年约 273 分（单科 37/56）；自划线院校与热门方向复试线常远高于国家线。",
      schoolNote: "学硕学费约 8000 元/年；专硕 1万-2万元/年；自动化调剂机会相对多，但热门院校与方向竞争激烈。"
    },
    "环境工程": {
      aliases: ["环境", "环境科学", "给排水"],
      schools: [mkSchool("清华大学", "约 7:1-14:1", "2025 复试线参考 320-355+", "环境平台顶尖"), mkSchool("同济大学", "约 5:1-10:1", "2025 复试线参考 315-350+", "环境工程实力强"), mkSchool("哈尔滨工业大学", "约 4:1-9:1", "2025 复试线参考 310-345+", "市政环境传统强")],
      tutors: ["水污染控制、大气、固废、环境监测与双碳方向。", "核心课程：环境工程原理、水处理、大气污染控制、环境监测。"],
      competitions: [C[0], C[2]],
      jobs: [mkJob("环评工程师", "6k-12k/月", "环评、法规"), mkJob("水处理工程师", "6k-12k/月", "工艺、设备"), mkJob("EHS/碳管理", "6k-13k/月", "合规、数据")],
      growth: growth(["做环评、水处理或碳核算项目。", "关注环保企业、设计院与 ESG 咨询实习。"]),
      gongPosts: [mkPost("生态环境执法/监测岗", "环境工程、环境科学类", "往年进面常见 120-140+"), mkPost("住建/水务事业单位", "环境、给排水相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、301 数学二、环境工程学/环境科学综合；专硕资源与环境 0857：政治、英语、数学、专业课。",
      scoreLine: "工学 A 区国家线 2025 年约 273 分；环境工程调剂机会较多，A 区部分院校与 B 区接收调剂。",
      schoolNote: "学硕约 8000 元/年；专硕 1万-1.5万元/年；调剂相对友好，但需关注数学与专业课基础。"
    },
    "食品科学与工程": {
      aliases: ["食品", "食品工程", "粮食工程"],
      schools: [mkSchool("中国农业大学", "约 5:1-10:1", "2025 复试线参考 310-345+", "食品学科顶尖"), mkSchool("江南大学", "约 5:1-10:1", "2025 复试线参考 315-350+", "食品工程强校"), mkSchool("华南理工大学", "约 4:1-8:1", "2025 复试线参考 310-345+", "轻工食品平台好")],
      tutors: ["食品加工、食品营养、食品安全、谷物与发酵方向。", "核心课程：食品化学、食品微生物、食品工艺学、食品分析。"],
      competitions: [C[0], C[2]],
      jobs: [mkJob("食品研发助理", "6k-12k/月", "实验、配方"), mkJob("质量/品控工程师", "6k-11k/月", "QA、法规"), mkJob("注册/营养咨询", "6k-12k/月", "营养师证、沟通")],
      growth: growth(["积累食品研发或品控实习。", "关注食品企业、检测机构与营养健康方向。"]),
      gongPosts: [mkPost("市场监管食品监管岗", "食品科学、食品工程类", "往年进面常见 120-138+"), mkPost("海关/卫健相关岗位", "食品、营养相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、302 数学二、食品化学/微生物学综合；专硕生物与医药 0860：政治、英语、数学、专业课。",
      scoreLine: "工学/农学 A 区国家线 2025 年工学约 273 分、农学约 252 分；调剂机会较多。",
      schoolNote: "学硕约 8000 元/年；专硕 1万元左右/年；调剂友好，B 区与农业类院校接收名额较多。"
    },
    "农学": {
      aliases: ["农学", "作物学", "植物保护", "园艺"],
      schools: [mkSchool("中国农业大学", "约 5:1-10:1", "2025 复试线参考 300-335+", "农学顶尖平台"), mkSchool("南京农业大学", "约 4:1-8:1", "2025 复试线参考 295-330+", "作物与资植强"), mkSchool("西北农林科技大学", "约 3:1-7:1", "2025 复试线参考 290-325+", "985 农业平台")],
      tutors: ["作物栽培、作物育种、植物保护、农业资源方向。", "核心课程：植物生理学、遗传学、作物栽培学、植物保护学。"],
      competitions: [C[0], C[2]],
      jobs: [mkJob("种业研发助理", "5k-11k/月", "育种、试验"), mkJob("植保技术员", "5k-10k/月", "农学、现场"), mkJob("农业科技运营", "6k-12k/月", "数据、运营")],
      growth: growth(["参加田间试验与农业科技项目。", "关注种业、农资与智慧农业企业实习。"]),
      gongPosts: [mkPost("农业农村部门综合岗", "农学、植物保护类", "往年进面常见 115-135+"), mkPost("自然资源/林草事业单位", "农学、园艺相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、314 数学农/315 化学农、414 植物生理学与生物化学；部分院校自命题。",
      scoreLine: "农学 A 区国家线 2025 年约 252 分（单科 33/50）；农学门类竞争相对低，调剂机会较多。",
      schoolNote: "学硕约 8000 元/年；专硕农艺与种业 0951 约 6000-10000 元/年；B 区与涉农院校调剂名额多。"
    },
    "马克思主义理论": {
      aliases: ["马理论", "思政", "马克思主义中国化"],
      schools: [mkSchool("中国人民大学", "约 8:1-16:1", "2025 复试线参考 360-390+", "马理论顶尖"), mkSchool("北京大学", "约 7:1-14:1", "2025 复试线参考 355-385+", "学科与平台强"), mkSchool("复旦大学", "约 6:1-12:1", "2025 复试线参考 350-380+", "理论与区位好")],
      tutors: ["马克思主义中国化、思政教育、马克思主义基本原理、党史方向。", "核心课程：马原、毛中特、思政教育学、党史党建。"],
      competitions: [C[0]],
      jobs: [mkJob("高校辅导员/思政教师", "6k-12k/月", "党员、表达"), mkJob("党政机关文字岗", "6k-11k/月", "公文、理论"), mkJob("党媒/理论宣传", "6k-12k/月", "写作、理论")],
      growth: growth(["积累党建、思政或理论研究经历。", "关注高校辅导员、党校与党政机关招聘。"]),
      gongPosts: [mkPost("党政机关综合文字岗", "马克思主义理论、政治学类", "往年进面常见 125-145+"), mkPost("党校/宣传系统岗位", "马理论、党史相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、马克思主义基本原理与发展史/中国化马克思主义综合；不考数学。",
      scoreLine: "法学门类 A 区国家线 2025 年约 326 分（马理论按法学门类划线，单科 44/66）；近年报考热度上升。",
      schoolNote: "学硕约 8000 元/年；调剂以非全日制和部分师范/地方院校为主；适合考公与高校辅导员方向。"
    },
    "电子信息": {
      aliases: ["电子信息", "通信工程", "电子科学与技术", "集成电路"],
      schools: [mkSchool("电子科技大学", "约 6:1-12:1", "2025 复试线参考 330-365+", "电子通信强校"), mkSchool("西安电子科技大学", "约 5:1-10:1", "2025 复试线参考 325-360+", "电子信息性价比高"), mkSchool("北京邮电大学", "约 6:1-12:1", "2025 复试线参考 330-365+", "通信与电子认可度高")],
      tutors: ["通信与信息系统、信号处理、电磁场与微波、集成电路方向。", "核心课程：信号与系统、通信原理、数字信号处理、电磁场。"],
      competitions: [C[2], mkComp("全国大学生电子设计竞赛", "适合电子信息与工程实践展示。", L.neea)],
      jobs: [mkJob("通信/算法工程师", "9k-18k/月", "信号、算法"), mkJob("硬件/射频工程师", "8k-16k/月", "电路、射频"), mkJob("嵌入式工程师", "8k-17k/月", "C、嵌入式")],
      growth: growth(["做电子设计或通信算法项目。", "关注电子、通信、半导体与国防企业实习。"]),
      gongPosts: [mkPost("工信/无线电管理岗", "电子信息、通信工程类", "往年进面常见 120-140+"), mkPost("气象/测绘事业单位", "电子信息、通信相关", "以地方公告为准")],
      examSubjects: "学硕：101 政治、201 英语一、301 数学一、信号与系统/通信原理/电路；专硕电子信息 0854：政治、英语、数学一/二、专业课。",
      scoreLine: "工学 A 区国家线 2025 年约 273 分；热门院校与集成电路方向复试线常 330+，调剂以专硕和 B 区为主。",
      schoolNote: "学硕约 8000 元/年；专硕 1万-2万元/年；专硕招生量大，但热门方向调剂仍紧张。"
    },
    "设计学": {
      aliases: ["艺术设计", "视觉传达", "工业设计", "环境设计"],
      schools: [mkSchool("同济大学", "约 6:1-12:1", "2025 复试线参考 350-385+（设计学）", "设计学科强"), mkSchool("江南大学", "约 5:1-10:1", "2025 复试线参考 345-380+", "设计传统强校"), mkSchool("中央美术学院", "约 5:1-10:1", "2025 复试线参考按校自划", "艺术与设计平台")],
      tutors: ["视觉传达、工业设计、环境设计、数字媒体方向。", "核心课程：设计史、设计方法论、视觉传达、交互设计。"],
      competitions: [mkComp("全国大学生广告艺术大赛", "适合视觉与策划作品展示。", "https://www.sun-ada.net/"), C[1]],
      jobs: [mkJob("UI/视觉设计师", "7k-15k/月", "作品集、软件"), mkJob("工业设计师", "7k-14k/月", "建模、工艺"), mkJob("交互/体验设计师", "8k-16k/月", "UX、原型")],
      growth: growth(["打磨高质量作品集。", "关注互联网、设计公司与制造业设计岗实习。"]),
      gongPosts: [mkPost("文旅/宣传视觉岗", "设计学、美术类", "以地方公告为准"), mkPost("事业单位宣传岗", "设计、美术相关", "往年进面常见 115-135+")],
      examSubjects: "学硕：101 政治、201 英语一、设计史论/设计综合；专硕艺术 1357 设计：政治、英语二、专业设计手绘/快题。",
      scoreLine: "艺术学 A 区国家线 2025 年约 351 分（单科 37/56）；自划线与美院线常更高，调剂偏少。",
      schoolNote: "学硕约 8000 元/年；艺术设计专硕 1万-3万元/年；调剂偏少，初试手绘与作品集是关键。"
    }
  };
  Object.keys(newMajors).forEach(function (k) { if (!DATA.majors[k]) DATA.majors[k] = newMajors[k]; });

  var scoreMap = {
    "计算机科学与技术": { examSubjects: "学硕：101 政治、201 英语一、301 数学一、408 计算机学科专业基础；专硕电子信息 0854：政治、英语、数学一/二、专业课（部分院校 408 或自命题）。", scoreLine: "工学 A 区国家线 2025 年约 273 分（单科 37/56）；自划线与 408 院校复试线常 330-360+。", schoolNote: "学硕约 8000 元/年；专硕 1万-2万元/年；热门院校调剂少，B 区与软件类专硕机会稍多。" },
    "临床医学": { examSubjects: "学硕：101 政治、201 英语一、306 临床医学综合；专硕 1051 临床医学：政治、英语一、306 临床医学综合。", scoreLine: "医学 A 区国家线 2025 年临床医学学硕约 294 分、专硕约 294 分（单科 43/129）；自划线医学院常 330+。", schoolNote: "学硕约 8000 元/年；专硕与规培并轨，学费 1万-1.5万元/年；调剂受规培名额与专业限制较大。" },
    "法学": { examSubjects: "学硕：101 政治、201 英语一、法学综合（法理/宪法/民法/刑法等）；法律硕士 0351：政治、英语一/二、397/497 法硕联考专业基础与综合。", scoreLine: "法学 A 区国家线 2025 年约 326 分（单科 44/66）；法硕竞争高，自划线院校常 340-360+。", schoolNote: "学硕约 8000 元/年；法硕（非法学）学费 1.5万-4万元/年；调剂以非全日制和 B 区为主。" },
    "金融": { examSubjects: "学硕：101 政治、201 英语一、303 数学三、431 金融学综合；专硕 0251 金融：政治、英语二、396 经济类综合/数学三、431 金融学综合。", scoreLine: "经济学 A 区国家线 2025 年约 338 分（单科 47/71）；金融专硕竞争激烈，顶尖院校复试线常 370-400+。", schoolNote: "学硕约 8000 元/年；金融专硕学费 2万-15万元/年不等，顶尖偏高；调剂名额少。" },
    "教育学": { examSubjects: "学硕：101 政治、201 英语一、311 教育学专业基础（或自命题）；专硕 0451 教育：政治、英语二、333 教育综合、专业课二。", scoreLine: "教育学 A 区国家线 2025 年约 341 分（单科 47/71）；学科教学类竞争高，复试线常 350+。", schoolNote: "学硕约 8000 元/年；教育专硕 1万-2万元/年；调剂以非全日制与 B 区师范院校为主。" },
    "汉语言文学": { examSubjects: "学硕：101 政治、201 英语一、文学综合（文学史/文学理论/语言学）；专硕 0453 汉语国际教育：政治、英语一、354 汉语基础、445 汉语国际教育基础。", scoreLine: "文学 A 区国家线 2025 年约 355 分（单科 53/80）；竞争高，调剂名额少。", schoolNote: "学硕约 8000 元/年；汉语国际教育专硕 1万-2万元/年；调剂偏少，初试分数是关键。" },
    "英语": { examSubjects: "学硕：101 政治、241/242 二外、英语综合（基础英语/翻译/文学）；专硕 0551 翻译：政治、211 翻译硕士英语、357 英汉翻译、448 百科。", scoreLine: "文学 A 区国家线 2025 年约 355 分（单科 53/80）；翻译硕士竞争高，顶尖院校 370+。", schoolNote: "学硕约 8000 元/年；翻译专硕 2万-5万元/年；调剂以非全日制和 B 区为主。" },
    "会计学": { examSubjects: "学硕：101 政治、201 英语一、303 数学三、管理学/会计学综合；专硕 1253 会计：199 管理类联考综合能力、204 英语二。", scoreLine: "管理学 A 区国家线 2025 年学硕约 347 分；会计专硕 A 区联考总分线近年约 201-210 分（含单科线）。", schoolNote: "学硕约 8000 元/年；会计专硕 2万-8万元/年；会计专硕调剂极少，竞争集中在初试与复试。" },
    "电气工程": { examSubjects: "学硕：101 政治、201 英语一、301 数学一、电路原理/电力系统分析；专硕电气工程 0858：政治、英语、数学一/二、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；电气强校复试线常 320-360+，调剂以专硕为主。", schoolNote: "学硕约 8000 元/年；专硕 1万-2万元/年；电力院校就业好，调剂名额有限。" },
    "土木工程": { examSubjects: "学硕：101 政治、201 英语一、301 数学一、结构力学/材料力学；专硕土木水利 0859：政治、英语、数学一/二、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；土木调剂机会较多，A 区部分院校与 B 区接收调剂。", schoolNote: "学硕约 8000 元/年；专硕 1万元左右/年；调剂相对友好，行业收缩使报考热度下降。" },
    "软件工程": { examSubjects: "学硕：101 政治、201 英语一、301 数学一/二、408 或软件工程综合；专硕电子信息 0854：政治、英语、数学、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；软件工程热门院校复试线常 330-360+。", schoolNote: "学硕约 8000 元/年；软件专硕 2万-4万元/年（部分院校按学分收费较高）；调剂以 B 区为主。" },
    "市场营销": { examSubjects: "学硕：101 政治、201 英语一、303 数学三、管理学/营销学综合；专硕 1251/1252 联考综合能力 + 英语二。", scoreLine: "管理学 A 区国家线 2025 年约 347 分；竞争中等，调剂以非全日制为主。", schoolNote: "学硕约 8000 元/年；专硕 2万-8万元/年；调剂机会以非全日制和 B 区为多。" },
    "财务管理": { examSubjects: "学硕：101 政治、201 英语一、303 数学三、管理学/财务管理综合；专硕 1253 会计/1251 工商管理联考。", scoreLine: "管理学 A 区国家线 2025 年约 347 分；财管方向竞争较高。", schoolNote: "学硕约 8000 元/年；专硕 2万-8万元/年；调剂以非全日制为主。" },
    "机械工程": { examSubjects: "学硕：101 政治、201 英语一、301 数学一、机械原理/机械设计/控制工程基础；专硕机械 0855：政治、英语、数学一/二、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；机械调剂机会较多。", schoolNote: "学硕约 8000 元/年；专硕 1万元左右/年；调剂友好，智能制造与机器人方向更热。" },
    "化学工程": { examSubjects: "学硕：101 政治、201 英语一、302 数学二、化工原理/物理化学；专硕材料与化工 0856：政治、英语、数学、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；化工调剂机会较多。", schoolNote: "学硕约 8000 元/年；专硕 1万元左右/年；调剂友好，新材料与精细化工方向更热。" },
    "生物医学工程": { examSubjects: "学硕：101 政治、201 英语一、301 数学一、生物医学工程综合/信号与系统；专硕电子信息 0854：政治、英语、数学、专业课。", scoreLine: "工学 A 区国家线 2025 年约 273 分；生医工调剂以专硕为主。", schoolNote: "学硕约 8000 元/年；专硕 1万-2万元/年；交叉学科，调剂机会中等。" },
    "药学": { examSubjects: "学硕：101 政治、201 英语一、349 药学综合/有机化学/分析化学；专硕 1055 药学：政治、英语一、349 药学综合。", scoreLine: "医学 A 区国家线 2025 年约 294 分（理学门类药学按自划线/国家线视院校而定）；调剂以专硕为主。", schoolNote: "学硕约 8000 元/年；药学专硕 1万-2万元/年；调剂以专硕和 B 区为主。" },
    "护理学": { examSubjects: "学硕：101 政治、201 英语一、308 护理综合；专硕 1054 护理：政治、英语一/二、308 护理综合。", scoreLine: "医学 A 区国家线 2025 年约 294 分；护理竞争中等，调剂机会较多。", schoolNote: "学硕约 8000 元/年；护理专硕 1万元左右/年；调剂以专硕和非全日制为主。" },
    "心理学": { examSubjects: "学硕：101 政治、201 英语一、312 心理学专业基础（统考）；专硕 0454 应用心理：政治、英语二、347 心理学专业综合（自命题）。", scoreLine: "教育学 A 区国家线 2025 年约 341 分；应用心理竞争高，顶尖院校 360+。", schoolNote: "学硕约 8000 元/年；应用心理专硕 1.5万-5万元/年；调剂以非全日制和 B 区为主。" },
    "应用经济学": { examSubjects: "学硕：101 政治、201 英语一、303 数学三、803 经济学综合（微观/宏观/计量）；专硕 0251 金融/0252 应用统计：政治、英语、396/数学三、专业课。", scoreLine: "经济学 A 区国家线 2025 年约 338 分；竞争高，顶尖院校 360-390+。", schoolNote: "学硕约 8000 元/年；专硕 2万-10万元/年；调剂以非全日制和 B 区为主。" }
  };
  Object.keys(DATA.majors).forEach(function (k) {
    var m = scoreMap[k] || newMajors[k];
    if (!m) return;
    var target = DATA.majors[k];
    if (!target.examSubjects && m.examSubjects) target.examSubjects = m.examSubjects;
    if (!target.scoreLine && m.scoreLine) target.scoreLine = m.scoreLine;
    if (!target.schoolNote && m.schoolNote) target.schoolNote = m.schoolNote;
  });

  DATA.kaoyanTimeline = [
    { node: "招生简章与专业目录", time: "8 月—9 月陆续发布", link: L.yanzhaoMajor, note: "关注招生人数、考试科目与参考书变化。" },
    { node: "预报名", time: "9 月下旬（约 9 月 24—27 日）", link: "https://yz.chsi.com.cn/", note: "应届生可预报名，信息与正式报名同等有效。" },
    { node: "正式报名", time: "10 月（约 10 月 8—25 日）", link: "https://yz.chsi.com.cn/", note: "逾期不再补报，信息务必核对。" },
    { node: "网上确认/现场确认", time: "10 月底—11 月初", link: "https://yz.chsi.com.cn/", note: "确认报名信息并上传材料，逾期不可确认。" },
    { node: "准考证打印", time: "12 月中旬（初试前 10 天左右）", link: "https://yz.chsi.com.cn/", note: "凭网报用户名登录下载，多打印备用。" },
    { node: "初试", time: "12 月倒数第二个周末", link: "https://yz.chsi.com.cn/", note: "政治、英语、数学/专业课分时段考试。" },
    { node: "初试成绩查询", time: "次年 2 月下旬—3 月初", link: "https://yz.chsi.com.cn/apply/cjcx/", note: "以报考院校与省级招办公告为准。" },
    { node: "国家线与复试线公布", time: "3 月中旬", link: "https://yz.chsi.com.cn/kyzx/kydt/", note: "国家线与 34 所自划线院校复试线陆续公布。" },
    { node: "复试与调剂", time: "3 月下旬—4 月", link: "https://yz.chsi.com.cn/tjxx/", note: "复试名单、调剂系统同步开放。" },
    { node: "录取与调档", time: "5 月—6 月", link: "https://yz.chsi.com.cn/", note: "录取通知书发放，按校要求办理调档。" }
  ];
  DATA.kaoyanMaterials = {
    public: [
      { name: "研招网官方入口", desc: "报名、准考证、成绩、调剂一站式官方通道。", url: L.yanzhao },
      { name: "硕士专业目录查询", desc: "查招生单位、考试科目与研究方向。", url: L.yanzhaoMajor },
      { name: "研招资讯", desc: "招生简章、公告与时间节点发布。", url: L.yanzhaoNews },
      { name: "中国教育在线考研", desc: "院校库、报录比与历年分数线汇总。", url: "https://kaoyan.eol.cn/" },
      { name: "考研帮", desc: "经验贴、真题与院校讨论社区。", url: "https://www.kaoyan.com/" }
    ],
    courses: [
      { name: "政治：徐涛 / 肖秀荣", desc: "强化班+冲刺+肖四肖八，主观题背肖四为主流方案。", url: "https://www.xuexi.cn/" },
      { name: "英语：田静 / 唐迟 / 王江涛", desc: "长难句+阅读逻辑+作文模板，英语一/二各有侧重。", url: "https://www.neea.edu.cn/" },
      { name: "数学：张宇 / 汤家凤 / 李永乐", desc: "高数+线代+概率，基础-强化-真题三阶段。", url: "https://www.moe.gov.cn/" },
      { name: "管综：幂学 / 老吕", desc: "199 联考逻辑+写作+初数，适合作答节奏训练。", url: "https://www.mohrss.gov.cn/" }
    ],
    major: [
      { name: "中国大学 MOOC", desc: "公共课与专业课慕课资源。", url: "https://www.icourse163.org/" },
      { name: "B 站考研区", desc: "免费名师课程与经验贴集中地。", url: "https://www.bilibili.com/" },
      { name: "知网 / 万方", desc: "学硕专业文献与综述检索。", url: "https://www.cnki.net/" }
    ]
  };
  function mkComp(name, desc, url) { return { name: name, desc: desc, url: url }; }
  function growth(items) {
    return items.concat([
      '实习投递：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + L.ncss + '">国家大学生就业服务平台</a>',
      '简历面试：<a class="text-brand font-semibold" target="_blank" rel="noopener" href="' + L.resume + '">就业指导与简历资源</a>'
    ]);
  }
})();

/* 就业专区强化：校招时间线 / 头部企业投递入口 / 实习平台 / 学期路线 / 3 套简历模板 */
(function enrichJobFull() {
  var L = DATA.links;
  DATA.jobTimeline = [
    { stage: "暑期实习", time: "大三 3 月—5 月网申，6 月—8 月到岗", desc: "暑期实习是秋招提前批和留用的关键，头部企业多在 3—5 月开放网申。" },
    { stage: "秋招提前批", time: "大三 7 月—8 月", desc: "部分互联网、快消、金融企业开放提前批，节奏快、名额集中。" },
    { stage: "秋招正式批", time: "大四 9 月—11 月", desc: "全年最大规模校招，宣讲会、网申、笔试、面试密集进行。" },
    { stage: "秋招补录", time: "12 月—次年 1 月", desc: "部分岗位补录，机会窗口较短，适合查漏补缺投递。" },
    { stage: "春招", time: "次年 2 月—4 月", desc: "秋招未上岸者主战场，岗位数量少于秋招但仍有头部企业补招。" },
    { stage: "暑期实习（下届）", time: "次年 3 月—5 月", desc: "下一届暑期实习开放，建议同步关注以争取留用。" }
  ];
  DATA.internPlatforms = [
    { name: "国家大学生就业服务平台", url: L.ncss, desc: "官方校招与实习主入口" },
    { name: "教育部招聘会", url: L.jobPlatform, desc: "线上招聘会与实习信息" },
    { name: "实习僧", url: "https://www.shixiseng.com/", desc: "互联网与各行业实习" },
    { name: "BOSS 直聘校招", url: "https://www.zhipin.com/", desc: "校招与实习直聊" },
    { name: "应届生求职网", url: "https://www.yingjiesheng.com/", desc: "校招与宣讲会信息" },
    { name: "牛客网", url: "https://www.nowcoder.com/", desc: "技术岗笔试面试与实习" }
  ];
  DATA.resumeTemplates = [
    { name: "极简一页型", style: "minimal", accent: "#1677ff", desc: "适合互联网、咨询、金融，重结果与数据，单页紧凑。", tip: "顶部姓名+一句话定位，经历用 STAR，量化成果。" },
    { name: "项目作品型", style: "project", accent: "#14b8a6", desc: "适合技术、设计、产品岗，突出项目与作品链接。", tip: "项目占主版面，写清技术栈、职责与可验证成果。" },
    { name: "学生综合型", style: "student", accent: "#7c5cff", desc: "适合应届与实习，突出课程、比赛、社团与实习。", tip: "教育经历优先，搭配课程项目与技能证书。" }
  ];
  var compMap = {
    "计算机科学与技术": { companies: [["腾讯", "https://join.qq.com/"], ["字节跳动", "https://jobs.bytedance.com/"], ["阿里巴巴", "https://talent.alibaba.com/"], ["美团", "https://zhaopin.meituan.com/"], ["华为", "https://career.huawei.com/"], ["百度", "https://talent.baidu.com/"]], certs: [["蓝桥杯", "https://dasai.lanqiao.cn/"], ["中国大学生程序设计竞赛", "https://ccpc.io/"], ["PAT 计算机程序设计能力考试", "https://www.patest.cn/"]] },
    "临床医学": { companies: [["恒瑞医药", "https://www.hrs.com.cn/"], ["迈瑞医疗", "https://www.mindray.com/"], ["药明康德", "https://www.wuxiapptec.com.cn/"], ["联影医疗", "https://www.united-imaging.com/"]], certs: [["执业医师资格考试", "https://www.nmec.org.cn/"], ["全国大学生基础医学创新论坛", L.neea]] },
    "法学": { companies: [["金杜律师事务所", "https://www.kwm.com/"], ["中伦律师事务所", "https://www.zhonglun.com/"], ["方达律师事务所", "https://www.fangdalaw.com/"], ["字节跳动法务", "https://jobs.bytedance.com/"]], certs: [["国家统一法律职业资格考试", L.bar]] },
    "金融": { companies: [["工商银行", "http://www.icbc.com.cn/"], ["中信证券", "https://www.citics.com/"], ["中金公司", "https://www.cicc.com/"], ["招商银行", "https://www.cmbchina.com/"], ["华泰证券", "https://www.htsc.com/"]], certs: [["CPA 注册会计师", L.cpa], ["CFA 协会", "https://www.cfainstitute.org/"], ["基金从业", "https://www.amac.org.cn/"]] },
    "教育学": { companies: [["新东方", "https://www.xdf.cn/"], ["好未来", "https://www.100tal.com/"], ["网易有道", "https://hr.youdao.com/"], ["中公教育", "https://www.offcn.com/"]], certs: [["中小学教师资格考试 NTCE", L.moeTeacher]] },
    "汉语言文学": { companies: [["字节跳动", "https://jobs.bytedance.com/"], ["快手", "https://zhaopin.kuaishou.cn/"], ["芒果超媒", "https://www.mgtv.com/"], ["阅文集团", "https://www.yuewen.com/"]], certs: [["教师资格考试", L.moeTeacher], ["全国大学生广告艺术大赛", "https://www.sun-ada.net/"]] },
    "英语": { companies: [["字节跳动", "https://jobs.bytedance.com/"], ["网易有道", "https://hr.youdao.com/"], ["外贸企业", L.ncss], ["外研社", "https://www.fltrp.com/"]], certs: [["CATTI 翻译资格", "https://www.catticenter.com/"], ["专四专八", L.neea], ["教师资格考试", L.moeTeacher]] },
    "会计学": { companies: [["普华永道", "https://www.pwccn.com/"], ["德勤", "https://www2.deloitte.com/"], ["立信", "https://www.bdo.com.cn/"], ["天健", "https://www.pccpa.cn/"]], certs: [["CPA 注册会计师", L.cpa], ["初级会计", "https://www.mof.gov.cn/"], ["ACCA", "https://www.accaglobal.com/"]] },
    "电气工程": { companies: [["国家电网", "http://www.sgcc.com.cn/"], ["南方电网", "http://www.csg.cn/"], ["宁德时代", "https://www.catl.com/"], ["华为", "https://career.huawei.com/"]], certs: [["全国大学生电子设计竞赛", L.neea], ["注册电气工程师", "https://www.mohrss.gov.cn/"]] },
    "土木工程": { companies: [["中国建筑", "https://www.cscec.com.cn/"], ["中国中铁", "https://www.crec.cn/"], ["上海建工", "https://www.scg.com.cn/"], ["同济设计", "https://www.tjad.cn/"]], certs: [["全国大学生结构设计竞赛", L.neea], ["BIM 等级考试", "https://www.isc.org.cn/"]] },
    "软件工程": { companies: [["腾讯", "https://join.qq.com/"], ["字节跳动", "https://jobs.bytedance.com/"], ["网易", "https://hr.163.com/"], ["美团", "https://zhaopin.meituan.com/"], ["华为", "https://career.huawei.com/"]], certs: [["中国大学生程序设计竞赛", "https://ccpc.io/"], ["软件设计师", "https://www.ruankao.org.cn/"]] },
    "市场营销": { companies: [["宝洁", "https://www.pg.com.cn/"], ["联合利华", "https://www.unilever.com.cn/"], ["欧莱雅", "https://www.lorealchina.com/"], ["字节跳动", "https://jobs.bytedance.com/"]], certs: [["全国大学生广告艺术大赛", "https://www.sun-ada.net/"], ["市场营销师", "https://www.mohrss.gov.cn/"]] },
    "财务管理": { companies: [["普华永道", "https://www.pwccn.com/"], ["招商局集团", "https://www.cmhk.com/"], ["中信集团", "https://www.citic.com/"], ["立信", "https://www.bdo.com.cn/"]], certs: [["CPA 注册会计师", L.cpa], ["初级会计", "https://www.mof.gov.cn/"]] },
    "机械工程": { companies: [["三一重工", "https://www.sanygroup.com/"], ["比亚迪", "https://job.byd.com/"], ["大疆", "https://we.dji.com/"], ["汇川技术", "https://www.inovance.com/"]], certs: [["全国大学生机械创新设计大赛", L.neea], ["SolidWorks 认证", "https://www.solidworks.com/"]] },
    "化学工程": { companies: [["万华化学", "https://www.whchem.com/"], ["中国石化", "https://www.sinopec.com/"], ["恒力石化", "https://www.hengli.com/"], ["宝丰能源", "https://www.baofengenergy.com/"]], certs: [["全国大学生化工设计竞赛", L.neea], ["注册化工工程师", "https://www.mohrss.gov.cn/"]] },
    "生物医学工程": { companies: [["迈瑞医疗", "https://www.mindray.com/"], ["联影医疗", "https://www.united-imaging.com/"], ["微创医疗", "https://www.microport.com/"], ["乐普医疗", "https://www.lepumedical.com/"]], certs: [["全国大学生生物医学工程创新设计", L.neea]] },
    "药学": { companies: [["恒瑞医药", "https://www.hrs.com.cn/"], ["药明康德", "https://www.wuxiapptec.com.cn/"], ["百济神州", "https://www.beigene.com/"], ["石药集团", "https://www.cspc.com.cn/"]], certs: [["执业药师", "https://www.nmpa.gov.cn/"], ["全国大学生药苑论坛", L.neea]] },
    "护理学": { companies: [["北京协和医院", "https://www.pumch.cn/"], ["华西医院", "https://www.wchscu.cn/"], ["中南大学湘雅医院", "https://www.xiangya.com.cn/"]], certs: [["护士执业资格考试", L.neea]] },
    "心理学": { companies: [["字节跳动", "https://jobs.bytedance.com/"], ["腾讯", "https://join.qq.com/"], ["好未来", "https://www.100tal.com/"], ["简单心理", "https://www.jiandanxinli.com/"]], certs: [["心理咨询师", "https://www.mohrss.gov.cn/"], ["教师资格考试", L.moeTeacher]] },
    "应用经济学": { companies: [["中信证券", "https://www.citics.com/"], ["中金公司", "https://www.cicc.com/"], ["国家发改委", "https://www.ndrc.gov.cn/"], ["招商银行", "https://www.cmbchina.com/"]], certs: [["CPA 注册会计师", L.cpa], ["证券从业", "https://www.sac.net.cn/"], ["统计从业", "https://www.stats.gov.cn/"]] },
    "新闻与传播": { companies: [["字节跳动", "https://jobs.bytedance.com/"], ["快手", "https://zhaopin.kuaishou.cn/"], ["央视", "https://www.cctv.com/"], ["小红书", "https://careers.xiaohongshu.com/"]], certs: [["全国大学生广告艺术大赛", "https://www.sun-ada.net/"], ["教师资格考试", L.moeTeacher]] },
    "工商管理": { companies: [["宝洁", "https://www.pg.com.cn/"], ["联合利华", "https://www.unilever.com.cn/"], ["雀巢", "https://www.nestle.com.cn/"], ["字节跳动", "https://jobs.bytedance.com/"]], certs: [["全国大学生电子商务挑战赛", L.innovation], ["人力资源管理师", "https://www.mohrss.gov.cn/"]] },
    "公共管理": { companies: [["地方街道/机关", L.scs], ["中国建筑", "https://www.cscec.com.cn/"], ["华润", "https://www.crc.com.cn/"]], certs: [["社会工作者职业资格", "https://www.mohrss.gov.cn/"], ["人力资源管理师", "https://www.mohrss.gov.cn/"]] },
    "自动化": { companies: [["大疆", "https://we.dji.com/"], ["比亚迪", "https://job.byd.com/"], ["华为", "https://career.huawei.com/"], ["汇川技术", "https://www.inovance.com/"]], certs: [["全国大学生电子设计竞赛", L.neea], ["西门子杯智能制造", "https://www.siemens.com.cn/"]] },
    "环境工程": { companies: [["北控水务", "https://www.bewg.net/"], ["光大环境", "https://www.cebenvironment.com/"], ["首创环保", "https://www.capitalwater.cn/"], ["EHS 咨询", L.ncss]], certs: [["注册环保工程师", "https://www.mohrss.gov.cn/"], ["环境影响评价工程师", "https://www.mee.gov.cn/"]] },
    "食品科学与工程": { companies: [["伊利", "https://www.yili.com/"], ["蒙牛", "https://www.mengniu.com/"], ["康师傅", "https://www.masterkong.com.cn/"], ["中粮", "https://www.cofco.com/"]], certs: [["注册营养师", "https://www.cndietitian.org/"], ["食品安全师", "https://www.mohrss.gov.cn/"]] },
    "农学": { companies: [["隆平高科", "https://www.lpht.com.cn/"], ["先正达", "https://www.syngenta.com.cn/"], ["大疆农业", "https://we.dji.com/"], ["新希望", "https://www.newhopegroup.com/"]], certs: [["农技人员职称", "https://www.moa.gov.cn/"], ["全国大学生农业创新", L.innovation]] },
    "马克思主义理论": { companies: [["高校辅导员招聘", L.ncss], ["党政机关", L.scs], ["党校", "https://www.ccps.gov.cn/"]], certs: [["教师资格考试", L.moeTeacher], ["公文写作", "https://www.mohrss.gov.cn/"]] },
    "电子信息": { companies: [["华为", "https://career.huawei.com/"], ["中兴", "https://job.zte.com.cn/"], ["中国电科", "https://www.cetc.com.cn/"], ["vivo", "https://hr.vivo.com/"]], certs: [["全国大学生电子设计竞赛", L.neea], ["通信工程师", "https://www.mohrss.gov.cn/"]] },
    "设计学": { companies: [["字节跳动", "https://jobs.bytedance.com/"], ["腾讯", "https://join.qq.com/"], ["网易", "https://hr.163.com/"], ["小红书", "https://careers.xiaohongshu.com/"]], certs: [["全国大学生广告艺术大赛", "https://www.sun-ada.net/"], ["Adobe 认证", "https://www.adobe.com/"]] }
  };
  Object.keys(compMap).forEach(function (k) {
    var t = DATA.majors[k]; if (!t) return;
    var c = compMap[k];
    if (!t.jobCompanies && c.companies) t.jobCompanies = c.companies;
    if (!t.certLinks && c.certs) t.certLinks = c.certs;
  });
  Object.keys(DATA.majors).forEach(function (k) {
    var t = DATA.majors[k]; if (t.jobCompanies) return;
    t.jobCompanies = [["国家大学生就业服务平台", L.ncss]];
  });
})();

/* 2025 考公专区数据强化：省考时间科目招录 / 专业可报岗位+竞争比 / 一站式官方入口 / 行测申论备考 */
(function enrichGongFull() {
  var L = DATA.links || {};
  DATA.provincialExams = [
    { region: "北京", time: "2025 年 2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 6000+", link: "https://www.beijing.gov.cn/" },
    { region: "上海", time: "2025 年 11-12 月公告（来年），3 月笔试", subjects: "行测、申论", recruit: "约 3000+", link: "https://www.shanghai.gov.cn/" },
    { region: "广东", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 15000+", link: "https://www.gd.gov.cn/" },
    { region: "江苏", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论、部分专业科目", recruit: "约 9000+", link: "https://www.jiangsu.gov.cn/" },
    { region: "浙江", time: "2024 年 11 月公告，2025 年 1 月笔试", subjects: "行测、申论", recruit: "约 7000+", link: "https://www.zj.gov.cn/" },
    { region: "山东", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 12000+", link: "http://www.shandong.gov.cn/" },
    { region: "四川", time: "2025 年 1-2 月公告，3-4 月笔试", subjects: "行测、申论", recruit: "约 8000+", link: "https://www.sc.gov.cn/" },
    { region: "河南", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 10000+", link: "https://www.henan.gov.cn/" },
    { region: "湖北", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 7000+", link: "https://www.hubei.gov.cn/" },
    { region: "湖南", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 6000+", link: "https://www.hunan.gov.cn/" },
    { region: "福建", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 4000+", link: "https://www.fujian.gov.cn/" },
    { region: "安徽", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 7000+", link: "https://www.ah.gov.cn/" },
    { region: "陕西", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 6000+", link: "http://www.shaanxi.gov.cn/" },
    { region: "辽宁", time: "2025 年 1-2 月公告，3 月笔试", subjects: "行测、申论", recruit: "约 5000+", link: "https://www.ln.gov.cn/" }
  ];
  DATA.gongOfficialLinks = [
    { type: "国考", items: [
      { name: "报名入口", url: L.scs2025 || "http://bm.scs.gov.cn/kl2025" },
      { name: "准考证打印", url: L.scs2025 || "http://bm.scs.gov.cn/kl2025" },
      { name: "成绩查询", url: L.scs2025 || "http://bm.scs.gov.cn/kl2025" },
      { name: "国家公务员局", url: L.scs || "https://www.scs.gov.cn/" }
    ]},
    { type: "省考", items: [
      { name: "各省公告汇总", url: L.scs || "https://www.scs.gov.cn/" },
      { name: "省考报名与成绩", url: "https://www.mohrss.gov.cn/" }
    ]},
    { type: "事业单位", items: [
      { name: "全国事业单位招聘网", url: "https://www.qgsydw.org/" },
      { name: "中央事业单位招聘", url: L.mohrss || "https://www.mohrss.gov.cn/" }
    ]},
    { type: "选调生", items: [
      { name: "各省选调生公告", url: "https://www.mohrss.gov.cn/" },
      { name: "中央选调信息", url: L.scs || "https://www.scs.gov.cn/" }
    ]}
  ];
  DATA.gongPrepModules = {
    xingce: [
      { name: "言语理解", method: "先精读题干再做题，积累高频成语与转折词；每天 15-20 题，限时训练。", materials: "粉笔 1000 题、华图模块宝典、历年真题" },
      { name: "判断推理", method: "图形推理记常考规律，逻辑判断熟练翻译推理规则，限时刷题提速度。", materials: "中公判断推理、粉笔专项题本" },
      { name: "数量关系", method: "抓工程、行程、利润、排列组合高频题型；先做会的，难题果断放弃。", materials: "粉笔数量关系专项、华图 5000 题" },
      { name: "资料分析", method: "先看问法再找数据，背熟增长率、比重、平均数公式；优先提分模块。", materials: "粉笔资料分析、华图 5000 题" },
      { name: "常识判断", method: "覆盖时政、法律、科技、人文；日常积累为主，考前突击热点与重要会议。", materials: "半月谈、人民日报、粉笔常识题库" }
    ],
    shenlun: [
      { name: "归纳概括", method: "训练找关键词与分层归纳，注意字数限制与要点完整度。", materials: "粉笔申论规矩、中公申论热点" },
      { name: "提出对策", method: "对策要针对问题、可操作；积累常用对策模板与表述。", materials: "粉笔申论专项、半月谈" },
      { name: "综合分析", method: "理解分析逻辑：是什么-为什么-怎么办；多写真题对照参考答案。", materials: "历年申论真题、华图申论范文" },
      { name: "应用文写作", method: "熟练公文格式：通知、倡议书、讲话稿、调研报告；注意身份与对象。", materials: "粉笔公文格式手册、党政机关公文处理条例" },
      { name: "大作文", method: "立意准确-结构清晰-论证扎实；每周写 1-2 篇，对照范文改稿。", materials: "人民日报评论、半月谈、粉笔范文" }
    ]
  };
  var statsMap = {
    "计算机科学与技术": { cats: "税务、海关、网信办、公安信息化、政务数据", avgRecruit: "全国年均 3000+", avgRatio: "约 40:1-80:1" },
    "临床医学": { cats: "卫健委、公立医院事业编、药监、疾控", avgRecruit: "全国年均 2000+", avgRatio: "约 15:1-30:1" },
    "法学": { cats: "法院、检察院、司法行政、市场监管、执法岗", avgRecruit: "全国年均 4000+", avgRatio: "约 30:1-60:1" },
    "金融": { cats: "税务、财政、金融监管、商务、统计", avgRecruit: "全国年均 3000+", avgRatio: "约 40:1-70:1" },
    "教育学": { cats: "教育局、教育督导、事业单位教师、学生管理", avgRecruit: "全国年均 2500+", avgRatio: "约 25:1-50:1" },
    "汉语言文学": { cats: "机关文字岗、宣传、组织、办公综合", avgRecruit: "全国年均 3500+", avgRatio: "约 35:1-65:1" },
    "英语": { cats: "海关、外事、商务、综合文字、翻译岗", avgRecruit: "全国年均 1500+", avgRatio: "约 30:1-60:1" },
    "会计学": { cats: "税务、审计、财政、国资监管、事业财务", avgRecruit: "全国年均 3500+", avgRatio: "约 40:1-70:1" },
    "电气工程": { cats: "能源监管、工信、铁路、交通、事业设备管理", avgRecruit: "全国年均 1200+", avgRatio: "约 25:1-50:1" },
    "土木工程": { cats: "住建、自然资源、交通、水利、工程管理", avgRecruit: "全国年均 2000+", avgRatio: "约 30:1-55:1" },
    "软件工程": { cats: "信息中心、政务数据、网信办、海关技术", avgRecruit: "全国年均 1800+", avgRatio: "约 35:1-65:1" },
    "市场营销": { cats: "市场监管、商务、发改、街道综合管理", avgRecruit: "全国年均 1500+", avgRatio: "约 30:1-55:1" },
    "财务管理": { cats: "财政、税务、审计、国资监管", avgRecruit: "全国年均 2000+", avgRatio: "约 35:1-65:1" },
    "机械工程": { cats: "市场监管特种设备、工信、质检、交通", avgRecruit: "全国年均 1200+", avgRatio: "约 25:1-50:1" },
    "化学工程": { cats: "生态环境、应急管理、市场监管、海关", avgRecruit: "全国年均 1200+", avgRatio: "约 25:1-50:1" },
    "生物医学工程": { cats: "药监、卫健、市场监管医疗器械岗", avgRecruit: "全国年均 600+", avgRatio: "约 20:1-45:1" },
    "药学": { cats: "药监、市场监管、卫健、医院药剂", avgRecruit: "全国年均 800+", avgRatio: "约 25:1-50:1" },
    "护理学": { cats: "卫健系统事业编、疾控、社区卫生", avgRecruit: "全国年均 1500+", avgRatio: "约 15:1-30:1" },
    "心理学": { cats: "监狱心理矫治、教育心理、社区矫治", avgRecruit: "全国年均 500+", avgRatio: "约 20:1-40:1" },
    "应用经济学": { cats: "发改、统计、商务、财政、税务", avgRecruit: "全国年均 2500+", avgRatio: "约 35:1-65:1" },
    "新闻与传播": { cats: "宣传、网信办、广电、机关文字岗", avgRecruit: "全国年均 1500+", avgRatio: "约 30:1-60:1" },
    "工商管理": { cats: "市场监管、商务、发改、街道综合管理", avgRecruit: "全国年均 1500+", avgRatio: "约 30:1-55:1" },
    "公共管理": { cats: "街道乡镇、人社、民政、综合管理", avgRecruit: "全国年均 2000+", avgRatio: "约 30:1-55:1" },
    "自动化": { cats: "工信、质检特种设备、交通、能源", avgRecruit: "全国年均 1000+", avgRatio: "约 25:1-50:1" },
    "环境工程": { cats: "生态环境、住建、水务、自然资源", avgRecruit: "全国年均 1000+", avgRatio: "约 25:1-50:1" },
    "食品科学与工程": { cats: "市场监管食品监管、海关、卫健", avgRecruit: "全国年均 800+", avgRatio: "约 25:1-45:1" },
    "农学": { cats: "农业农村、自然资源、林草、乡镇", avgRecruit: "全国年均 1000+", avgRatio: "约 20:1-45:1" },
    "马克思主义理论": { cats: "党政机关文字、党校、宣传系统", avgRecruit: "全国年均 800+", avgRatio: "约 25:1-50:1" },
    "电子信息": { cats: "工信、无线电管理、气象、测绘", avgRecruit: "全国年均 1200+", avgRatio: "约 25:1-50:1" },
    "设计学": { cats: "文旅、宣传视觉、事业单位宣传岗", avgRecruit: "全国年均 500+", avgRatio: "约 20:1-40:1" }
  };
  Object.keys(statsMap).forEach(function (k) {
    var t = DATA.majors[k];
    if (t) t.gongStats = statsMap[k];
  });
  Object.keys(DATA.majors).forEach(function (k) {
    var t = DATA.majors[k];
    if (!t.gongStats) t.gongStats = { cats: "综合管理、街道乡镇、机关文字岗", avgRecruit: "全国年均 1000+", avgRatio: "约 25:1-55:1" };
  });
})();

function resumeTemplateHTML(style, accent) {
  var a = accent || "#1677ff";
  var base = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>简历模板</title><style>' +
    'body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;color:#0f172a;max-width:760px;margin:0 auto;padding:32px;line-height:1.6}' +
    'h1{font-size:24px;margin:0 0 4px;color:' + a + '}h2{font-size:15px;border-bottom:2px solid ' + a + ';padding-bottom:4px;margin:18px 0 8px;color:' + a + '}' +
    'p,li{font-size:13px;margin:2px 0}.meta{color:#64748b;font-size:12px}.row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}' +
    '.item{margin:0 0 10px}.tag{background:' + a + '1a;color:' + a + ';padding:2px 8px;border-radius:9999px;font-size:11px;margin-right:4px}' +
    '</style></head><body>';
  if (style === "project") {
    return base + '<h1>你的姓名</h1><p class="meta">求职意向：后端/前端/产品工程师 · 城市 · 电话 · 邮箱</p>' +
      '<h2>个人简介</h2><p>2 段实习 + 3 个上线项目，擅长 X 技术栈，关注工程化与可验证成果。</p>' +
      '<h2>项目经历</h2><div class="item"><div class="row"><b>项目名 A</b><span class="meta">2025.03—2025.06</span></div><p>技术栈：<span class="tag">Java</span><span class="tag">MySQL</span><span class="tag">Redis</span></p><p>职责：设计接口、优化查询、QPS 提升 3 倍；上线后日活 +20%。</p></div>' +
      '<div class="item"><div class="row"><b>项目名 B</b><span class="meta">2024.09—2024.12</span></div><p>技术栈：<span class="tag">Vue</span><span class="tag">Node</span></p><p>职责：从 0 搭建作品集站点，GitHub 收获 200+ star。</p></div>' +
      '<h2>实习经历</h2><div class="item"><div class="row"><b>某科技公司</b><span class="meta">2025.07—2025.09</span></div><p>实习岗位，完成模块开发并通过转正答辩。</p></div>' +
      '<h2>教育经历</h2><p>XX 大学 · 专业 · 2022—2026 · GPA 3.7/4.0</p><p><a href="https://github.com/">作品集链接</a></p></body></html>';
  }
  if (style === "student") {
    return base + '<h1>你的姓名</h1><p class="meta">应届毕业生 · 求职意向 · 城市 · 电话 · 邮箱</p>' +
      '<h2>教育经历</h2><p>XX 大学 · 专业 · 2022—2026 · 主修课程：A、B、C · GPA 3.6/4.0</p>' +
      '<h2>实习经历</h2><div class="item"><div class="row"><b>某公司 · 实习岗位</b><span class="meta">2025.07—2025.09</span></div><p>协助完成 XX 项目，输出 XX 报告，得到主管认可。</p></div>' +
      '<h2>校园经历</h2><div class="item"><div class="row"><b>学生组织 · 职务</b><span class="meta">2023—2024</span></div><p>组织 XX 活动，参与 200+ 人，复盘沉淀流程文档。</p></div>' +
      '<h2>比赛与证书</h2><p><span class="tag">挑战杯省奖</span><span class="tag">英语六级</span><span class="tag">计算机二级</span></p>' +
      '<h2>技能</h2><p>Office · 数据分析 · Python 基础 · 沟通表达</p></body></html>';
  }
  return base + '<h1>你的姓名</h1><p class="meta">一句话定位 · 城市 · 电话 · 邮箱 · 主页/作品链接</p>' +
    '<h2>实习经历</h2><div class="item"><div class="row"><b>公司 · 岗位</b><span class="meta">2025.07—2025.09</span></div><p>情境：XX；任务：XX；行动：XX；结果：指标提升 30%。</p></div>' +
    '<div class="item"><div class="row"><b>公司 · 岗位</b><span class="meta">2024.12—2025.03</span></div><p>负责 XX，输出 XX，转化率 +15%。</p></div>' +
    '<h2>项目经历</h2><div class="item"><div class="row"><b>项目名</b><span class="meta">2025</span></div><p>目标、方法、数据结果，一句话量化成果。</p></div>' +
    '<h2>教育经历</h2><p>XX 大学 · 专业 · 2022—2026</p>' +
    '<h2>技能</h2><p><span class="tag">数据分析</span><span class="tag">SQL</span><span class="tag">PPT</span><span class="tag">英语六级</span></p></body></html>';
}

function init() {
  renderIndustries();
  renderQuiz();
  renderKaoyan();
  renderJob();
  renderGong();
  bindEvents();
  route("home");
}

init();
