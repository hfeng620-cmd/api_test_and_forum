export const tickerItems = [
  { label: "虎虎填表可拿 3 美刀试用额度", color: "#3b82f6" },
  { label: "虎虎进 QQ 群可继续领部分免费额度", color: "#10b981" },
  { label: "杂货铺 GPT 模型当前整理倍率为 0.058x", color: "#f59e0b" },
  { label: "星见雅公益当前标记为免费入口，适合单独关注", color: "#8b5cf6" },
];

export const guideSteps = [
  {
    index: "01",
    title: "先看倍率",
    description: "把倍率低、口径清楚的站先筛出来，避免一上来就被加价。",
  },
  {
    index: "02",
    title: "再看备注",
    description: "像日卡、周卡、模型分组、未实测这类备注，往往比数字更关键。",
  },
  {
    index: "03",
    title: "最后看入口",
    description: "能试用的先试，能看群友反馈的先看反馈，不要只盯着低价。",
  },
];

export const highlightMetrics = [
  { label: "已录入站点", value: "12", note: "按你提供的这批真实中转站先做首版观察表" },
  { label: "可直接试用入口", value: "2", note: "虎虎试用单和 dazes.cc 新人赠额都已挂到页面" },
  { label: "特殊价格口径", value: "5+", note: "含多倍率、日卡/周卡/月卡、plus/pro 分组等情况" },
  { label: "共建优先级", value: "高", note: "这批数据最需要群友继续补测和纠错" },
];

export const updateBoard = [
  "虎虎最新整理倍率更新为 0.12x，试用入口仍保留",
  "Aether 最新整理倍率更新为 0.263x",
  "杂货铺已拆成 GPT 0.058x / Claude Max 1.15x 双口径",
];

export const stationSnapshots = [
  {
    name: "虎虎",
    group: "huhuai.xyz / 试用入口",
    tag: "可试用",
    price: "0.12 倍率",
    multiplier: "0.12x",
    uptime: "待群测",
    latency: "待补",
  },
  {
    name: "Aether",
    group: "to-aether.com / 社区常用",
    tag: "较稳定",
    price: "0.263 倍率",
    multiplier: "0.263x",
    uptime: "待补",
    latency: "待补",
  },
  {
    name: "杂货铺",
    group: "api.dstopology.com / 低倍率",
    tag: "双口径",
    price: "GPT 0.058 / Claude Max 1.15",
    multiplier: "0.058x 起",
    uptime: "待补",
    latency: "待补",
  },
];

export const communityPosts = [
  {
    category: "集合更新",
    meta: "刚整理 · 需要大家补测",
    title: "这批中转站已经先挂上来了，接下来最缺的是稳定性和模型分组反馈",
    summary:
      "现在已经不是空样品了，而是把你给的真实站点集合先做进页面。下一步最有价值的是群友补充高峰期稳定性、实际模型可用性和价格是否持续有效。",
  },
  {
    category: "试用提醒",
    meta: "优先入口",
    title: "虎虎可以先填试用单拿 3 美刀，再进群看有没有额外免费额度",
    summary:
      "这类入口型信息适合放在首页明显位置，先让新来的人能低成本试，再决定长期用哪个站。",
  },
  {
    category: "避坑",
    meta: "社区口径",
    title: "Primdream 目前不推荐，主要是价格口径偏高",
    summary:
      "像这类带主观判断的信息不应该写成铁结论，更适合标成“当前社区口径”，后面如果价格变化再及时改。",
  },
  {
    category: "待核验",
    meta: "继续共建",
    title: "Datopology、WayX、xiaoya-api 这几类站最需要大家补第一手体验",
    summary:
      "有的站现在只有倍率或入口，没有足够的高峰稳定性和模型实际反馈，这正是大家一起补数据最能发挥作用的地方。",
  },
];

export const demoVideos = [
  {
    title: "演示视频 01",
    subtitle: "首页怎么快速找到试用入口和群友备注",
    note: "建议你后面录一个 30 秒首页导览，讲清楚怎么先试、怎么看备注。",
  },
  {
    title: "演示视频 02",
    subtitle: "榜单页怎么比较倍率、多分组价格和特殊口径",
    note: "建议录一个榜单筛选和阅读说明，尤其讲清楚同站点多倍率怎么理解。",
  },
  {
    title: "演示视频 03",
    subtitle: "怎么把新站点、纠错和群聊结论提交到仓库",
    note: "建议录一个 GitHub 协作视频，方便直接号召群友一起维护。",
  },
];

export const collaborationSteps = [
  {
    title: "先发线索",
    description: "新站点、价格变化、邀请码和试用入口先丢 Discussions 或 Issue。",
  },
  {
    title: "再补口径",
    description: "带上倍率、模型组、注册链接、截图和出现时间，尽量别只口头说。",
  },
  {
    title: "最后入表",
    description: "确认后再走 PR，把数据和文案一起正式收录到观察站里。",
  },
];

export const pendingVerifications = [
  {
    name: "WayX",
    need: "缺高峰期稳定性和模型可用反馈",
  },
  {
    name: "Datopology",
    need: "缺第一手体验，也需要确认是否与妖怪杂货铺属于同域名不同口径",
  },
  {
    name: "dasuAPI",
    need: "缺具体倍率、模型分组和价格截图",
  },
  {
    name: "ai8.my",
    need: "目前只整理到 0.06x，缺模型覆盖和高峰稳定性反馈",
  },
  {
    name: "星见雅公益",
    need: "当前只标记为免费，缺额度规则和长期可用性说明",
  },
];

export const contributionTasks = [
  "补一个你用过的站",
  "纠正一条过期价格",
  "提交一个试用入口",
  "补充一条避坑备注",
];

export const featuredColumns = [
  {
    title: "试用入口汇总",
    description: "把试用单、注册送额度、互填邀请这种入口统一整理成一个板块。",
  },
  {
    title: "多倍率说明",
    description: "专门解释 GPT、Claude、plus、pro、Max、日卡/周卡/月卡的不同口径。",
  },
  {
    title: "待补实测清单",
    description: "公开列出哪些站还缺群友测试，让大家知道下一步帮什么最有价值。",
  },
];

export const resourceLinks = [
  {
    title: "虎虎 API 试用单",
    href: "https://www.kdocs.cn/l/cj84YbmlJswN",
    note: "填表可获 3 美刀额度，页面里建议作为首选试用入口。",
  },
  {
    title: "API 中转站集合统计表",
    href: "https://www.kdocs.cn/l/cr2932V6f6bH",
    note: "可复制到金山文档 APP 打开，适合继续补更多站点信息。",
  },
  {
    title: "QQ群免费额度提醒",
    href: "https://www.kdocs.cn/l/cj84YbmlJswN",
    note: "虎虎这类入口进群后可能还有补充免费额度，适合继续补测。",
  },
];

export type HomeFeaturedStation = {
  name: string;
  badge: string;
  summary: string;
  price: string;
  multiplier: string;
  reason: string;
};

export const homeFeaturedStations: HomeFeaturedStation[] = [
  {
    name: "虎虎",
    badge: "先试用",
    summary: "填表先拿 3 美刀，进 QQ 群还有机会补充免费额度。",
    price: "0.12 倍率",
    multiplier: "0.12x",
    reason: "最适合新来的人先试水，不用一上来就充值。",
  },
  {
    name: "Aether",
    badge: "常用口碑",
    summary: "群里常用口径偏稳，也可以继续和老板谈组队价格。",
    price: "0.263 倍率",
    multiplier: "0.263x",
    reason: "更像主力候选站，适合稳定需求的人继续观察。",
  },
  {
    name: "杂货铺",
    badge: "双口径",
    summary: "GPT 模型按 0.058x 整理，Claude Max 单独是 1.15x，必须拆开看。",
    price: "GPT 0.058 / Claude Max 1.15",
    multiplier: "0.058x 起",
    reason: "非常适合拿来提醒大家：同一站点也可能是不同模型不同收费方式。",
  },
  {
    name: "dasuAPI",
    badge: "待补测",
    summary: "目前社区备注偏正向，价格和稳定性都值得继续补第一手反馈。",
    price: "便宜 / 稳定",
    multiplier: "待补",
    reason: "适合放进首页精选，提醒大家继续补倍率和模型分组信息。",
  },
];

export const faqPreview = [
  {
    question: "什么是 API 中转站？",
    answer:
      "它位于你和上游模型服务之间，负责转发请求、统一计费、切换渠道，也因此要同时看价格、倍率和口径是否一致。",
  },
  {
    question: "挑站最先看什么？",
    answer:
      "先看倍率和试用入口，再看群友备注，最后才决定是否长期充值，别只盯最低价。",
  },
];

export const faqEntries = [
  {
    question: "什么是 API 中转站？",
    answer:
      "API 中转站通常位于你和上游模型服务之间，负责转发请求、统一计费、切换渠道，或者把多个模型接口包装成一种调用方式。它的价值在于接入方便、价格灵活、可做聚合与分发，但同时也意味着你并不是直接面对原始模型提供商。",
  },
  {
    question: "为什么不能只看价格最低的站？",
    answer:
      "低价只说明表面成本低，不代表模型映射真实、计费口径一致、峰值时段稳定。尤其是极低倍率站，更应该核验可用性和群友长期反馈。",
  },
  {
    question: "哪些信息最值得首页先展示？",
    answer:
      "对大多数人最有价值的是：试用入口、倍率口径、是否多档位、是否需要特殊获取方式，以及一句能帮助决策的社区备注。",
  },
  {
    question: "什么叫多档位或特殊口径？",
    answer:
      "像 plus / pro、GPT / Claude 分组、日卡 / 周卡 / 月卡、TB 搜索入口这类，都不适合强行塞成单一数字，应该单独说明。",
  },
  {
    question: "第一次使用中转站怎么降低风险？",
    answer:
      "优先用试用额度或注册送额，先做低额度验证，再看高峰期稳定性和真实模型表现，确认没问题后再考虑长期充值。",
  },
];

export const guideCards = [
  {
    title: "新手先试路线",
    description: "先走试用单、注册送额和群友口碑，不要一开始就按最低价重仓。",
  },
  {
    title: "多倍率怎么看",
    description: "同一站点的 GPT、Claude、plus、pro、Max 可能是不同价格体系，要拆开看。",
  },
  {
    title: "群友该怎么共建",
    description: "发站点、补截图、纠正过期口径、记录高峰期报错，都是很有价值的贡献。",
  },
];

export const forumHighlights = [
  {
    title: "经验讨论",
    note: "哪些站适合长期主力用，哪些只适合薅试用。",
  },
  {
    title: "避坑记录",
    note: "把价格变化、模型缩水、特殊限制这类信息及时沉淀下来。",
  },
  {
    title: "新站报料",
    note: "群里谁发现新入口、新活动、新站点，都可以先进这里挂线索。",
  },
];

export const modelPreviewRows = [
  {
    rank: "#01",
    family: "GPT 系",
    scene: "通用平衡",
    focus: "适合通用对话、代码协作和综合任务",
    stationHint: "更适合在倍率清楚、备注完整的站里比较长期成本",
  },
  {
    rank: "#02",
    family: "Claude 系",
    scene: "长文与分析",
    focus: "适合长上下文阅读、总结和细致推理类任务",
    stationHint: "要重点看 Max / 组别 / 独立倍率口径，别和 GPT 混成一个价",
  },
  {
    rank: "#03",
    family: "Gemini / DeepSeek / Qwen",
    scene: "性价比探索",
    focus: "适合做补充选择，看不同站对模型覆盖和活动价格",
    stationHint: "更适合配合中转站页一起看支持度和稳定性",
  },
];

export const stationComparisonRows = [
  {
    name: "虎虎",
    badge: "可试用",
    group: "huhuai.xyz",
    entry: "域名入口 + 试用单",
    packageType: "按倍率",
    status: "试用友好",
    models: "未细分",
    price: "0.12 倍率",
    multiplier: "0.12x",
    uptime: "待补",
    latency: "待补",
    source: "试用单 + 群友备注",
    verdict: "先试再说",
    note: "可联系调低倍率，填表先送 3 美刀，进 QQ 群还有额外免费额度。",
    advantage: "试用入口清晰，适合新用户优先体验。",
    risk: "实际长期价格和稳定性还要继续看群友反馈。",
  },
  {
    name: "Aether",
    badge: "常用",
    group: "https://to-aether.com/dashboard",
    entry: "Dashboard 直链",
    packageType: "按倍率",
    status: "待结构化实测",
    models: "未细分 / 社区常用",
    price: "0.263 倍率",
    multiplier: "0.263x",
    uptime: "待群测",
    latency: "待补",
    source: "群友常用口径",
    verdict: "价格还行，口碑偏稳",
    note: "群里口径是比较常用，也可以和老板商量组队压价。",
    advantage: "价格不差，当前备注里稳定性印象较好。",
    risk: "缺少结构化实测数据，仍需要群友补高峰反馈。",
  },
  {
    name: "杂货铺",
    badge: "双口径",
    group: "https://api.dstopology.com/keys",
    entry: "Keys 页面",
    packageType: "模型分档",
    status: "需要分开理解",
    models: "GPT 模型 / Claude Max",
    price: "GPT 0.058 / Claude Max 1.15",
    multiplier: "0.058x 起",
    uptime: "待补",
    latency: "待补",
    source: "群友备注",
    verdict: "一定要按模型分开看",
    note: "同一个域名下 GPT 和 Claude Max 的价格差异很大，不适合合成一个单值。",
    advantage: "很适合展示“同站不同模型收费完全不同”的真实情况。",
    risk: "如果只看最低值，很容易误读 Claude 组的实际价格。",
  },
  {
    name: "dasuAPI",
    badge: "待补测",
    group: "https://dasuapi.com",
    entry: "官网入口",
    packageType: "待补",
    status: "信息不完整",
    models: "未细分",
    price: "便宜 / 稳定",
    multiplier: "待补",
    uptime: "待补",
    latency: "待补",
    source: "群友正向备注",
    verdict: "先挂上，等补体验",
    note: "目前备注偏正向，但细节不够。",
    advantage: "站点入口明确，适合继续补数据。",
    risk: "缺少具体倍率与模型组信息。",
  },
  {
    name: "Datopology",
    badge: "未实测",
    group: "https://api.dstopology.com/keys",
    entry: "Keys 页面",
    packageType: "待补",
    status: "完全缺样本",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "未试",
    latency: "未试",
    source: "群友待试",
    verdict: "先挂名，等第一手体验",
    note: "当前备注是“没试过，你们试试”。",
    advantage: "和妖怪杂货铺同链接，值得确认是否同站不同口径。",
    risk: "完全缺第一手数据，别写成确定推荐。",
  },
  {
    name: "WayX",
    badge: "待补测",
    group: "https://api.aiwxin.com/dashboard",
    entry: "Dashboard 直链",
    packageType: "待补",
    status: "待核验",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "用户最新整理表",
    verdict: "先收录，待继续反馈",
    note: "这次整理里只保留了入口，没有给出明确倍率。",
    advantage: "入口明确，方便后续继续补数据。",
    risk: "没有明确价格和模型可用性数据。",
  },
  {
    name: "ai8.my",
    badge: "低倍率",
    group: "ai8.my",
    entry: "域名入口",
    packageType: "按倍率",
    status: "待核验",
    models: "未细分",
    price: "0.06 倍率",
    multiplier: "0.06x",
    uptime: "待补",
    latency: "待补",
    source: "群友整理",
    verdict: "倍率比较亮眼",
    note: "目前整理到的主要是倍率，缺模型组和稳定性反馈。",
    advantage: "适合补进低倍率观察区。",
    risk: "信息不全，别只因为价格低就直接推荐。",
  },
  {
    name: "Liary",
    badge: "卡制",
    group: "https://ai.liaryai.com/",
    entry: "官网入口",
    packageType: "待补",
    status: "信息待补",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "用户最新整理表",
    verdict: "先保留入口",
    note: "当前只保留了站点入口，没有新的价格口径。",
    advantage: "后续补数据后可以继续纳入比较。",
    risk: "目前无法直接横向比较。",
  },
  {
    name: "dazes.cc",
    badge: "注册送额",
    group: "https://cn.dazes.cc",
    entry: "官网登录",
    packageType: "待补",
    status: "新人友好",
    models: "未细分",
    price: "便宜 / 稳定",
    multiplier: "待补",
    uptime: "群友口径稳定",
    latency: "待补",
    source: "注册送额 + 邀请码",
    verdict: "新人友好",
    note: "注册送 1 美刀，互相填写再得 1 美刀，邀请码备注是 dGSL。",
    advantage: "门槛低，适合拿来先试。",
    risk: "“稳定”目前更多是社区口径，缺少统一实测。",
  },
  {
    name: "viptoken站",
    badge: "低倍率",
    group: "https://www.viptoken.top/dashboard",
    entry: "Dashboard 直链",
    packageType: "模型分组",
    status: "已拆分口径",
    models: "GPT 模型 / Claude 组",
    price: "GPT 0.2 / Claude 0.15",
    multiplier: "0.15x 起",
    uptime: "待补",
    latency: "待补",
    source: "群友整理",
    verdict: "也需要按模型分开看",
    note: "GPT 模型和 Claude 组是不同倍率，不能简单写成一个统一数字。",
    advantage: "价格分组清楚，适合放进正式榜单做对比。",
    risk: "仍缺高峰稳定性和长期使用反馈。",
  },
  {
    name: "Primdream",
    badge: "暂不推荐",
    group: "https://primdream.store/login",
    entry: "官网登录",
    packageType: "待补",
    status: "信息待补",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "用户最新整理表",
    verdict: "先保留入口",
    note: "当前最新表格没有给出新的倍率或详细备注。",
    advantage: "入口明确，后续更新比较方便。",
    risk: "现在没有足够信息做明确判断。",
  },
  {
    name: "xiaoya-api",
    badge: "多档位",
    group: "https://xiaoya-api.xyz",
    entry: "官网入口",
    packageType: "待补",
    status: "信息待补",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "群友整理",
    verdict: "先收录，等新口径",
    note: "这次用户给的最新整理里没有明确倍率，先保留入口，等后续再补。",
    advantage: "入口明确，后续补数据方便。",
    risk: "当前没有可直接比较的价格信息。",
  },
  {
    name: "星见雅公益",
    badge: "免费",
    group: "https://new.xinjianya.top/",
    entry: "官网入口",
    packageType: "公益 / 免费",
    status: "免费入口",
    models: "待补",
    price: "免费",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "群友整理",
    verdict: "适合单独关注",
    note: "当前只明确是免费入口，额度规则和稳定性还需要继续补。",
    advantage: "对新手非常友好，门槛最低。",
    risk: "免费不代表长期稳定，仍要看规则和高峰表现。",
  },
  {
    name: "五条悟api",
    badge: "特殊入口",
    group: "tb 搜索“五条悟api”",
    entry: "淘宝搜索入口",
    packageType: "待补",
    status: "入口型站点",
    models: "未细分",
    price: "待补",
    multiplier: "-",
    uptime: "待补",
    latency: "待补",
    source: "用户最新整理表",
    verdict: "先保留获取方式",
    note: "当前表格只给了获取方式，没有新的价格或模型细节。",
    advantage: "入口信息明确，方便后续群友补测。",
    risk: "不是标准官网直链，需要特别说明获取方式。",
  },
];
