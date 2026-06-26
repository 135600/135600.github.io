 个人网站 - 内容配置文件
   
   【怎么用】
   用记事本打开这个文件，直接改引号里的文字就行
   改完保存（Ctrl+S），刷新网页就能看到效果
   
   【注意事项】
   - 引号必须用英文的 " 不要用中文的 ""
   - 每行末尾的逗号 , 不要删
   - 要加新作品/新项目，看下面的注释说明
   
   【加新作品】
   在 WORKS 数组里，复制一整个 { ... } 块，粘贴到后面，改内容就行
   
   【加新项目】
   在 PROJECTS 数组里，同样复制一整个 { ... } 块
   ============================================================ */
// ==================== 个人信息 ====================
var INFO = {
    name: "陈文亮",
    name_en: "Wenliang Chen",
    // 一句话介绍（首页大标题）
    hero_title: "设计师，也是投资者",
    hero_title_en: "Designer & Investor",
    // 首页副标题
    tagline: "广州美术学院 · 汽车设计方向。用东方美学做设计，用结构性思维做投资。",
    tagline_en: "GAFA · Automotive Design. Eastern aesthetics in design, structural thinking in investment.",
    // 首页右侧信息
    meta_line1: "基于",
    meta_line1_en: "Based in ",
    meta_city: "广州",
    meta_city_en: "Guangzhou",
    meta_line2: "专注于",
    meta_line2_en: "Focus on ",
    meta_focus: "汽车设计 × 投资",
    meta_focus_en: "Auto Design × Investment",
    meta_line3: "可用",
    meta_line3_en: "Available for ",
    meta_avail: "合作与邀约",
    meta_avail_en: "Collaboration",
    // 学校
    school: "广州美术学院 · 工业设计 · 汽车设计方向",
    school_en: "GAFA · Industrial Design · Automotive",
    // 专注领域
    focus: "汽车设计 / 服务设计 / 数字建模",
    focus_en: "Auto Design / Service Design / Digital Modeling",
    // 设计语言
    design_lang: "东方意境，结构叙事",
    design_lang_en: "Eastern Mood, Structural Narrative",
    design_lang_sub: "将文化意象转化为可感知的形态语言",
    design_lang_sub_en: "Transforming cultural imagery into perceivable form language",
    // 投资标签
    invest_label: "A 股 · 偏进攻型 · 结构性赛道",
    invest_label_en: "A-Shares · Aggressive · Structural Tracks",
    // 联系方式
    email: "3323798056@qq.com",
    phone: "+86 135 600 780 21",
    // 联系页大字
    contact_big: "让我们一起<br>做些<em>有意思</em>的<br>事情。",
    contact_big_en: "Let's build<br>something <em>interesting</em><br>together.",
    // 首页人物照片（放一张你的照片到 photos 文件夹，然后填文件名）
    // 例如：hero_photo: "photos/me.jpg"
    hero_photo: "",
    hero_photo_en: ""
};
// ==================== 关于我 ====================
var ABOUT = {
    p1: "我是陈文亮，广州美术学院汽车设计方向的学生。相信好的设计不止于功能与形式的统一——它应该承载文化记忆、触发情感共鸣，并在观者心中留下某种「意境」。",
    p1_en: "I'm Wenliang Chen, an automotive design student at GAFA. I believe great design goes beyond the unity of function and form — it should carry cultural memory, trigger emotional resonance, and leave an 'impression' in the viewer's mind.",
    p2: "我的设计实践围绕东方美学展开：从丝绸文化到邮轮造型，从情感化汽车设计到概念 SUV，我尝试将传统文化意象转化为当代设计语言。每一个项目都是一次叙事——关于过去与未来的对话。",
    p2_en: "My design practice revolves around Eastern aesthetics: from silk culture to cruise form, from emotional automotive design to concept SUVs. I transform traditional cultural imagery into contemporary design language. Every project is a narrative — a dialogue between past and future.",
    p3: "与此同时，我也是一个活跃的个人投资者。设计中的比例感与结构思维，同样适用于对市场的判断。两者看似无关，实则共享同一种底层逻辑——对趋势的敏感，对结构的理解，对「美」与「价值」的直觉。",
    p3_en: "Meanwhile, I'm also an active individual investor. The sense of proportion and structural thinking from design applies equally to market judgment. The two may seem unrelated, but share the same underlying logic — sensitivity to trends, understanding of structure, and intuition for 'beauty' and 'value'."
};
// ==================== 作品集 ====================
/*
   【加新作品】复制下面一整个 { ... } 块，粘贴到最后 ] 的前面，改内容
   
   字段说明：
   tag     = 左上角小标签（如 "概念设计"）
   year    = 年份
   title   = 作品标题
   desc    = 作品描述
   icon    = 中间装饰符号，可选：◆ ◇ △ ◇ ○ ▽ ◎ ✦ 或任意 HTML 符号
   image   = 封面图片路径（可选，留空 "" 则显示装饰符号）
   gallery = 图集数组，点击卡片后全屏浏览的图片列表
             格式：["photos/文件名1.jpg", "photos/文件名2.jpg", ...]
             留空 [] 则点击不弹出图集
*/
var WORKS = [
    {
        tag: "汽车设计",
        tag_en: "Automotive Design",
        year: "2026",
        title: "Alfa Romeo Otto Vittoria 33",
        title_en: "Alfa Romeo Otto Vittoria 33",
        desc: "致敬经典赛车的限量概念超跑，传承 Vittorio Jano 的黄金时代设计灵魂",
        desc_en: "A limited-edition concept supercar paying tribute to the golden era of Vittorio Jano",
        icon: "◆",
        image: "photos/alfa/alfa_01_03.jpg",
        gallery: [
            "photos/alfa/alfa_01_03.jpg",
            "photos/alfa/alfa_02_03.jpg",
            "photos/alfa/alfa_03_03.jpg",
            "photos/alfa/alfa_04.jpg",
            "photos/alfa/alfa_05.jpg",
            "photos/alfa/alfa_06.jpg",
            "photos/alfa/alfa_07.jpg",
            "photos/alfa/alfa_08.jpg",
            "photos/alfa/alfa_09_03.jpg",
            "photos/alfa/alfa_10.jpg"
        ]
    },
    {
        tag: "汽车设计",
        tag_en: "Automotive Design",
        year: "2026",
        title: "悍马 · 荒雅",
        title_en: "HUMMER · Huangya",
        desc: "荒野不是绝望之地，而是盛宴之所——将战士精神注入现代越野车设计",
        desc_en: "The wilderness is not despair but a feast — injecting warrior spirit into modern off-road design",
        icon: "◇",
        image: "photos/hummer/hummer_01.jpg",
        gallery: [
            "photos/hummer/hummer_01.jpg",
            "photos/hummer/hummer_02.jpg",
            "photos/hummer/hummer_03.jpg",
            "photos/hummer/hummer_04.jpg",
            "photos/hummer/hummer_05.jpg",
            "photos/hummer/hummer_06.jpg",
            "photos/hummer/hummer_07.jpg",
            "photos/hummer/hummer_08.jpg",
            "photos/hummer/hummer_09.jpg",
            "photos/hummer/hummer_10.jpg",
            "photos/hummer/hummer_11.jpg",
            "photos/hummer/hummer_12.jpg",
            "photos/hummer/hummer_13.jpg",
            "photos/hummer/hummer_14.jpg",
            "photos/hummer/hummer_15.jpg"
        ]
    },
    {
        tag: "汽车设计",
        tag_en: "Automotive Design",
        year: "2082",
        title: "Tesla Eclipse",
        title_en: "Tesla Eclipse",
        desc: "Project Eclipse — 2082年特斯拉高端双座概念车，驶离黑暗的最后一次日出",
        desc_en: "Project Eclipse — 2082 Tesla high-end two-seater concept, the last sunrise driving away darkness",
        icon: "△",
        image: "photos/tesla/tesla_01.jpg",
        gallery: [
            "photos/tesla/tesla_01.jpg",
            "photos/tesla/tesla_02.jpg",
            "photos/tesla/tesla_03.jpg",
            "photos/tesla/tesla_04.jpg",
            "photos/tesla/tesla_05.jpg",
            "photos/tesla/tesla_06.jpg",
            "photos/tesla/tesla_07.jpg",
            "photos/tesla/tesla_08.jpg",
            "photos/tesla/tesla_09.jpg",
            "photos/tesla/tesla_10.jpg",
            "photos/tesla/tesla_11.jpg",
            "photos/tesla/tesla_12.jpg"
        ]
    },
    {
        tag: "汽车设计",
        tag_en: "Automotive Design",
        year: "2026",
        title: "Volvo Embers",
        title_en: "Volvo Embers",
        desc: "传承1800ES基因的豪华电动轿跑——深色车身如冬夜，勃艮第座椅如不灭余烬",
        desc_en: "A luxury EV coupe inheriting 1800ES DNA — dark body like winter night, burgundy seats like undying embers",
        icon: "✦",
        image: "photos/volvo/volvo_01.jpg",
        gallery: [
            "photos/volvo/volvo_01.jpg",
            "photos/volvo/volvo_02.jpg",
            "photos/volvo/volvo_03.jpg",
            "photos/volvo/volvo_04.jpg",
            "photos/volvo/volvo_05.jpg",
            "photos/volvo/volvo_06.jpg",
            "photos/volvo/volvo_07.jpg",
            "photos/volvo/volvo_08.jpg",
            "photos/volvo/volvo_09.jpg",
            "photos/volvo/volvo_10.jpg",
            "photos/volvo/volvo_11.jpg",
            "photos/volvo/volvo_12.jpg"
        ]
    }
];
// ==================== 项目经历 ====================
/*
   【加新项目】同样复制一整个 { ... } 块
   tags 是标签数组，用英文逗号分隔，每个用引号包起来
*/
var PROJECTS = [
    {
        year: "26",
        title: "潮汐 · 织造 — <span>邮轮设计</span>",
        title_en: "Tide · Weaving — <span>Cruise Design</span>",
        desc: "将丝绸文化融入邮轮造型设计。四象叙事结构构建从海上丝绸之路到当代东方美学的完整叙事线。融合麒麟 IP、牡丹纹样与和平理念。",
        desc_en: "Integrating silk culture into cruise form design. A four-act narrative structure building a complete storyline from the Maritime Silk Road to contemporary Eastern aesthetics.",
        tags: ["邮轮设计", "东方美学", "文化叙事", "丝绸意象"],
        tags_en: ["Cruise Design", "Eastern Aesthetic", "Cultural Narrative", "Silk Motif"]
    },
    {
        year: "26",
        title: "比亚迪设计大赛 — <span>情感化汽车设计</span>",
        title_en: "BYD Design Contest — <span>Emotional Auto Design</span>",
        desc: "以「久别重逢的清冽」为情感锚点，围绕人车关系展开探索。将个人记忆与出行体验融合，构建具有东方意境的汽车设计方案。",
        desc_en: "With 'the clarity of reuniting' as the emotional anchor, exploring human-vehicle relationships. Merging personal memory with mobility experience.",
        tags: ["汽车设计", "情感化设计", "BYD"],
        tags_en: ["Auto Design", "Emotional Design", "BYD"]
    },
    {
        year: "26",
        title: "上汽名爵 MG 寻星 — <span>概念 SUV</span>",
        title_en: "SAIC MG Star Seeker — <span>Concept SUV</span>",
        desc: "为上汽名爵设计的概念 SUV 方案，探索未来出行语境下的设计语言。融合品牌基因与前瞻趋势，定义年轻化的都市探索者形象。",
        desc_en: "Concept SUV for SAIC MG, exploring design language in future mobility context. Fusing brand DNA with forward-looking trends.",
        tags: ["概念 SUV", "前瞻设计", "MG"],
        tags_en: ["Concept SUV", "Foresight Design", "MG"]
    },
    {
        year: "25",
        title: "台球厅服务设计 — <span>体验系统</span>",
        title_en: "Billiard Hall — <span>Experience System</span>",
        desc: "从用户体验出发，对台球厅全流程服务进行系统性再设计。涵盖空间动线、交互触点、会员体系与服务仪式感的整体优化。",
        desc_en: "Starting from UX, systematically redesigning the full service process of a billiard hall.",
        tags: ["服务设计", "用户体验", "空间设计"],
        tags_en: ["Service Design", "UX", "Spatial Design"]
    }
];
// ==================== 投资方向 ====================
var INVEST = {
    p1: "以 A 股和基金为主要标的，采用<strong>偏进攻型</strong>的投资策略。聚焦高成长性结构性赛道，通过产业链研究和技术趋势判断捕捉机会。",
    p1_en: "Focused on A-shares and funds with an <strong>aggressive</strong> strategy. Targeting high-growth structural tracks through supply chain research and technology trend analysis.",
    p2: "核心方向覆盖<strong>稀有金属与 AI 算力材料</strong>、<strong>新能源产业链</strong>、以及<strong>半导体存储与先进封装</strong>。相信设计中的比例感与结构思维，同样适用于对投资组合的风险管理。",
    p2_en: "Core: <strong>rare metals & AI computing materials</strong>, <strong>new energy supply chain</strong>, and <strong>semiconductor storage & advanced packaging</strong>. The proportion and structural thinking from design applies equally to portfolio risk management.",
    /*
       【加新赛道】复制一整个 { ... } 块
       image 字段可选，填图片路径如 "photos/rare-metal.jpg"
    */
    tracks: [
        {
            title: "稀有金属 / AI 算力材料",
            title_en: "Rare Metals / AI Computing",
            desc: "锗 · 锡 · 稀土 — 算力基础设施底层资源",
            desc_en: "Ge · Sn · Rare Earths — Computing infrastructure foundation",
            image: ""
        },
        {
            title: "半导体 / 存储产业链",
            title_en: "Semiconductor / Storage Chain",
            desc: "先进封装 · HBM · 存储芯片",
            desc_en: "Advanced Packaging · HBM · Memory Chips",
            image: ""
        },
        {
            title: "新能源材料",
            title_en: " New Energy Materials",
            desc: "电解液 · 电池材料 — 电动化下半场",
            desc_en: "Electrolyte · Battery — The second half of electrification",
            image: ""
        },
        {
            title: "军工新材料",
            title_en: "Defense Materials",
            desc: "国防科技 · 先进材料",
            desc_en: "Defense Tech · Advanced Materials",
            image: ""
        },
        {
            title: "投资风格",
            title_en: "Investment Style",
            desc: "偏进攻型 · 高波动高回报 · 严格止盈止损",
            desc_en: "Aggressive · High Volatility · Strict Stop-loss",
            image: ""
        }
    ]
};