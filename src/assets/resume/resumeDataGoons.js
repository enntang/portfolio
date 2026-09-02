// Resume content sourced verbatim (zh) / translated (en) from the Notion spec page:
// "Product Designer | EdTech | Hybrid" — customized variant of the base resume,
// tailored for the Goons application. Identical to resumeData.js apart from the
// rewritten `about` section.

export const resumeDataGoons = {
  zh: {
    nameEn: 'Enn Tang',
    nameZh: '湯靜恬',
    linkedinLabel: 'enntang',
    linkedinHref: 'https://www.linkedin.com/in/enntang/',
    email: 'enntang.work@gmail.com',
    labels: {
      target: 'TARGET',
      tools: 'TOOLS',
      languages: '語言能力',
      education: 'EDUCATION',
      about: '關於 About',
      focus: '核心能力 Focus',
      experience: '經歷 Experience',
      downloadPdf: '下載 PDF',
      back: '返回',
    },
    target: ['Product Designer', 'UI/UX Designer'],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'HTML5', 'CSS3', 'SCSS', 'Tailwind', 'Git', 'VS Code', 'Notion', 'Claude Code'],
    languages: [
      { name: '中文', level: '母語／精通' },
      { name: '日文', level: 'JLPT N2' },
      { name: '英文', level: 'TOEIC 750' },
    ],
    education: [
      {
        period: '2023/9–2025/6',
        school: '國立臺灣科技大學',
        detail: '設計系碩士班 碩士畢業',
      },
      {
        period: '2010/9–2013/6',
        school: '國立臺北教育大學',
        detail: '藝術與造形設計學系 大學肆業',
      },
    ],
    about: [
      'UI/UX 設計師，具多年數位產品設計經驗。擅長從需求探索、問題定義與資訊架構出發，將複雜需求轉化為具體的產品體驗，並與跨職能團隊協作推動設計落地。',
      '曾於三貝德數位文創股份有限公司擔任 Design Lead，從零建立 4 人設計團隊，負責人才招募、培訓與專案分工。團隊成員背景多元，我依據成員專長與發展方向進行任務配置，並進行教育訓練，培養 UI/UX 及產品思維，逐步建立兼具設計與前端技術能力的團隊。',
      '帶領團隊期間，同時推進既有產品改版與新產品 0 到 1 開發，透過人力調度與密集的跨部門協作完成產品落地，並以使用者滿意度調查正向驗證改版成效。具備從需求釐清、設計執行到前端交付的完整專案經驗，期待在設計與技術並重的環境中，持續參與產品策略與專案推進。',
    ],
    focus: [
      { label: '需求統籌與跨部門協作', text: '於 0 到 1 產品開發過程中，統籌研發、內容、行銷等跨部門需求，轉化為設計決策與規劃方向' },
      { label: 'UI/UX 實務', text: '從需求釐清、資訊架構規劃，到介面設計與前端交付，具備獨立執行完整專案流程經驗' },
      { label: 'Design System 建立', text: '在 POS 產品與 AI 整合學習平台等專案中，主導建立可擴展的設計規範' },
      { label: 'AI-First 設計協作', text: '運用 AI 工具驅動快速原型製作、Design System 建構與跨職能交接流程，加速從概念到可執行設計的轉換' },
    ],
    experience: [
      {
        period: '2025/11–2026/5',
        company: '島島阿學 Dao Dao',
        role: 'User Experience Designer（遠端兼職）',
        items: [
          '主導 MVP 產品設計，於 4 個月內完成上線',
          '建立 Design System 框架，支援平台後續迭代擴展',
          '推動 AI-first 設計開發協作流程，透過快速原型製作加速跨職能交接',
        ],
      },
      {
        period: '2023/3–2024/5',
        company: '三貝德數位文創股份有限公司',
        role: 'Design Lead',
        items: [
          '從零開始建立設計部門，負責人才招募、培訓與一對一指導，在職期間達成團隊零離職率',
          {
            text: '主導 AI 整合學習平台（Mentor）從概念發想到上線的完整流程，統籌研發、內容、行銷跨部門需求，建立可擴展 Design System，一年內如期上線',
            link: { href: 'https://enntang.github.io/portfolio/tw/project/mentor', label: '觀看 Mentor 詳細專案介紹' },
          },
          '帶領設計團隊執行既有產品改版及新產品上線等專案，並透過使用者滿意度調查正向驗證改版成效',
        ],
      },
      {
        period: '2021/1–2023/3',
        company: '麥奇數位股份有限公司 (TutorABC)',
        role: 'UI/UX 設計師',
        items: [
          '教育科技產業經歷：主導 tutorJr 全新官網 UI/UX 設計，並執行 tutorJr x Disney 幼兒英語學習 App 主視覺設計',
          '建立產品設計規範，制定 Style Guide 與元件標準',
          '獨立推動研發部門導入 Figma 協作流程並主導教育訓練，取代原先 Sketch/Zeplin 交接模式，設計與工程協作時間約減少 50%',
        ],
      },
      {
        period: '2018/7–2020/12',
        company: '壹立方數碼股份有限公司 (ACubeDT)',
        role: 'UI/UX 設計師',
        items: [
          '主導多個 RWD 網頁與 POS 系統設計，2 年半內累積八個以上專案，客戶涵蓋政府機關、教育單位與企業客戶',
          {
            text: '獨立完成從需求釐清、資訊架構規劃與 UI/UX 介面設計全流程，代表作品 eHairPOS（美髮業管理系統）、巴塞爾公約官方網站皆成功上線',
            link: { href: 'https://enntang.github.io/portfolio/tw/project/ehairpos', label: '觀看 eHairPOS 詳細專案介紹' },
          },
        ],
      },
      {
        period: '2016/1–2018/2',
        company: '南億興業股份有限公司 (南一書局)',
        role: '美術設計',
        items: [
          '負責教科書、參考書、周邊文宣視覺設計，熟稔印前實務知識與跨部門溝通協作',
        ],
      },
      {
        period: '2014/12–2015/8',
        company: '寶澤珠寶股份有限公司',
        role: '美術設計',
        items: [
          '負責銀飾精品及金工手作體驗課品牌設計，負責網路商城視覺、活動海報文宣設計、社群媒體經營等行銷實務',
        ],
      },
    ],
  },

  en: {
    nameEn: 'Enn Tang',
    nameZh: '湯靜恬',
    linkedinLabel: 'enntang',
    linkedinHref: 'https://www.linkedin.com/in/enntang/',
    email: 'enntang.work@gmail.com',
    labels: {
      target: 'TARGET',
      tools: 'TOOLS',
      languages: 'LANGUAGES',
      education: 'EDUCATION',
      about: 'About',
      focus: 'Focus',
      experience: 'Experience',
      downloadPdf: 'Download PDF',
      back: 'Back',
    },
    target: ['Product Designer', 'UI/UX Designer'],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'HTML5', 'CSS3', 'SCSS', 'Tailwind', 'Git', 'VS Code', 'Notion', 'Claude Code'],
    languages: [
      { name: 'Chinese', level: 'Native / Fluent' },
      { name: 'Japanese', level: 'JLPT N2' },
      { name: 'English', level: 'TOEIC 750' },
    ],
    education: [
      {
        period: 'Sep 2023 – Jun 2025',
        school: 'National Taiwan University of Science and Technology',
        detail: "Master's Program in Design — Graduated",
      },
      {
        period: 'Sep 2010 – Jun 2013',
        school: 'National Taipei University of Education',
        detail: 'Department of Arts and Design — Did not complete degree',
      },
    ],
    about: [
      'A UI/UX designer with extensive experience in digital product design. I work from discovery, problem definition, and information architecture, turning complex requirements into concrete product experiences and collaborating with cross-functional teams to bring designs to launch.',
      'At Somebest, I served as Design Lead, building a 4-person design team from scratch and taking charge of recruiting, training, and project allocation. The team came from diverse backgrounds, so I assigned work according to each member\'s strengths and growth direction, and ran training to develop their UI/UX and product thinking — gradually building a team fluent in both design and front-end development.',
      'While leading the team, I drove a redesign of existing products and 0-to-1 development of new ones in parallel, bringing both to launch through careful resourcing and close cross-departmental collaboration, with the redesign positively validated by a user satisfaction survey. I have end-to-end project experience from requirements clarification through design execution to front-end delivery, and I am looking for an environment that values design and technology equally, where I can keep contributing to product strategy and project momentum.',
    ],
    focus: [
      { label: 'Requirements Coordination & Cross-Team Collaboration', text: 'Coordinated cross-departmental requirements from R&D, content, and marketing throughout 0-to-1 product development, translating them into design decisions and direction' },
      { label: 'UI/UX Practice', text: 'End-to-end experience independently executing full project workflows, from requirement clarification and information architecture planning to interface design and frontend handoff' },
      { label: 'Design System Development', text: 'Led the creation of scalable design standards across projects such as POS products and AI-integrated learning platforms' },
      { label: 'AI-First Design Collaboration', text: 'Using AI tools to drive rapid prototyping, design system construction, and cross-functional handoff, accelerating the transition from concept to executable design' },
    ],
    experience: [
      {
        period: 'Nov 2025 – May 2026',
        company: 'Dao Dao',
        role: 'User Experience Designer (Remote, Part-time)',
        items: [
          'Led MVP product design, launching within 4 months',
          "Built a Design System framework to support the platform's ongoing iteration and expansion",
          'Drove an AI-first design and development collaboration workflow, using rapid prototyping to accelerate cross-functional handoff',
        ],
      },
      {
        period: 'Mar 2023 – May 2024',
        company: 'Somebest',
        role: 'Design Lead',
        items: [
          'Built the design department from scratch, responsible for talent recruitment, training, and one-on-one mentoring, achieving zero team turnover during tenure',
          {
            text: 'Led the AI-integrated learning platform (Mentor) through its full lifecycle from concept to launch, coordinating cross-departmental requirements from R&D, content, and marketing, and building a scalable design system — launched on schedule within a year',
            link: { href: 'https://enntang.github.io/portfolio/project/mentor', label: 'View the Mentor project case study' },
          },
          "Led the design team through projects such as revamping an existing product and launching a new product, with the redesign's success positively validated through user satisfaction surveys",
        ],
      },
      {
        period: 'Jan 2021 – Mar 2023',
        company: 'TutorABC',
        role: 'UI/UX Designer',
        items: [
          'EdTech industry experience: led the UI/UX design of the brand-new tutorJr official website, and executed the key visual design for the tutorJr x Disney early childhood English learning app',
          'Established product design guidelines, defining a style guide and component standards',
          "Independently drove the R&D department's adoption of a Figma collaboration workflow and led the related training, replacing the previous Sketch/Zeplin handoff model and reducing design-engineering collaboration time by about 50%",
        ],
      },
      {
        period: 'Jul 2018 – Dec 2020',
        company: 'ACubeDT',
        role: 'UI/UX Designer',
        items: [
          'Led multiple RWD website and POS system design projects, accumulating eight or more projects within two and a half years, serving clients across government agencies, educational institutions, and enterprises',
          {
            text: 'Independently completed the full process from requirement clarification and information architecture planning to UI/UX interface design; flagship works eHairPOS (a hair salon management system) and the Basel Convention official website both launched successfully',
            link: { href: 'https://enntang.github.io/portfolio/project/ehairpos', label: 'View the eHairPOS project case study' },
          },
        ],
      },
      {
        period: 'Jan 2016 – Feb 2018',
        company: 'Nan I Book Enterprise',
        role: 'Graphic Design',
        items: [
          'Responsible for the visual design of textbooks, reference books, and promotional materials; well-versed in pre-press practical knowledge and cross-departmental communication',
        ],
      },
      {
        period: 'Dec 2014 – Aug 2015',
        company: 'Baoze Jewelry',
        role: 'Graphic Design',
        items: [
          'Responsible for brand design for silver jewelry and metalsmithing workshop experiences, covering online store visuals, event poster and promotional material design, and social media marketing',
        ],
      },
    ],
  },
}
