// Resume content sourced verbatim (zh) / translated (en) from the Notion spec page:
// "個人網站履歷 - 內容規格（給 Claude 生成網頁用）"

export const resumeData = {
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
    target: ['UI/UX Designer', 'Product Designer'],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'HTML5', 'CSS3', 'SCSS', 'Tailwind', 'Git', 'VS Code', 'Notion', 'Claude Code'],
    languages: [
      { name: '中文', level: '母語／精通' },
      { name: '日文', level: 'JLPT N2' },
      { name: '英文', level: 'TOEIC 700' },
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
      '熱愛以使用者為中心的 UI/UX 設計師，擁有設計學碩士學位，致力於打造直覺易用的介面體驗。擅長網頁設計與數位產品開發，具備帶領 4 人設計團隊的經驗，並能與編輯、工程師及專案企劃跨職能協作。除 UI 設計外，亦具備視覺設計、書籍排版與插畫的實務能力。',
      '在最新的一項經歷中，擔任 Design Lead 從零招募、建立 4 人設計團隊，並進行人才培訓與一對一指導，在一年內同時完成一項產品改版與一項新產品上線，並透過使用者滿意度調查正向驗證了改版成效。',
    ],
    focus: [
      { label: 'UI/UX 實務', text: '從需求釐清、資訊架構規劃，到介面設計與前端交付，具備獨立執行完整專案流程經驗' },
      { label: 'Design System 建立', text: '在 POS 產品與 AI 整合學習平台等專案中，與團隊合作建立可擴展設計規範' },
      { label: '使用者驗證', text: '以易用性量表、後台數據等資料解讀可平台優化項目並落實執行' },
      { label: '美術風格規劃與執行', text: '定調品牌視覺風格，具備插畫與平面設計實務能力，能將視覺敘事融入介面設計' },
      { label: 'AI-First 設計協作', text: '運用 AI 工具驅動快速原型制作、Design System 建構與跨職能交接流程，加速從概念到可執行設計的轉換' },
    ],
    experience: [
      {
        period: '2023/3–2024/5',
        company: '三貝德',
        role: 'Design Lead',
        items: [
          '從零開始建立設計部門，負責人才招募、培訓與一對一指導，在職期間達成團隊零離職率',
          {
            text: '負責設計品質管理與跨部門協作，主導 AI 整合學習平台介面設計與 Design System 建立，在一年內如期上線',
            link: { href: 'https://enntang.github.io/portfolio/tw/project/mentor', label: '觀看 Mentor 詳細專案介紹' },
          },
          '帶領設計團隊執行既有產品改版及新產品上線等專案，並在使用者問卷中獲得高滿意度評價',
        ],
      },
      {
        period: '2021/1–2023/3',
        company: 'TutorABC',
        role: 'UI/UX 設計師',
        items: [
          '主導 tutorJr 全新官網 UI/UX 設計，並執行 tutorJr x Disney 幼兒英語學習 App 主視覺設計',
          '建立產品設計規範，制定 Style Guide 與元件標準',
          '獨立推動研發部門導入 Figma 協作流程並主導教育訓練，取代原先 Sketch/Zeplin 交接模式，設計與工程協作時間約減少 50%',
        ],
      },
      {
        period: '2018/7–2020/12',
        company: 'ACubeDT',
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
        company: '南一書局',
        role: '美術設計',
        items: [
          '負責教科書、參考書、周邊文宣視覺設計，熟稔印前實務知識與跨部門溝通協作',
        ],
      },
      {
        period: '2014/12–2015/8',
        company: '寶澤珠寶',
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
    target: ['UI/UX Designer', 'Product Designer'],
    tools: ['Figma', 'Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'HTML5', 'CSS3', 'SCSS', 'Tailwind', 'Git', 'VS Code', 'Notion', 'Claude Code'],
    languages: [
      { name: 'Chinese', level: 'Native / Fluent' },
      { name: 'Japanese', level: 'JLPT N2' },
      { name: 'English', level: 'TOEIC 700' },
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
      "A UI/UX designer passionate about user-centered design, holding a master's degree in design and dedicated to creating intuitive, easy-to-use interface experiences. Skilled in web design and digital product development, with experience leading a 4-person design team and collaborating cross-functionally with editors, engineers, and project planners. Beyond UI design, also experienced in visual design, book layout, and illustration.",
      "In my most recent role, I worked as a Design Lead, recruiting and building a 4-person design team from scratch, providing talent training and one-on-one mentoring, and completing a product redesign and a new product launch within the same year — with the redesign's success positively validated through a user satisfaction survey.",
    ],
    focus: [
      { label: 'UI/UX Practice', text: 'End-to-end experience independently executing full project workflows, from requirement clarification and information architecture planning to interface design and frontend handoff' },
      { label: 'Design System Development', text: 'Collaborated with teams to build scalable design standards across projects such as POS products and AI-integrated learning platforms' },
      { label: 'User Validation', text: 'Interpreting usability metrics and backend data to identify platform optimization opportunities and implement them' },
      { label: 'Art Direction & Execution', text: 'Defining brand visual style, with hands-on illustration and graphic design skills to weave visual storytelling into interface design' },
      { label: 'AI-First Design Collaboration', text: 'Using AI tools to drive rapid prototyping, design system construction, and cross-functional handoff, accelerating the transition from concept to executable design' },
    ],
    experience: [
      {
        period: 'Mar 2023 – May 2024',
        company: 'Somebest',
        role: 'Design Lead',
        items: [
          'Built the design department from scratch, responsible for talent recruitment, training, and one-on-one mentoring, achieving zero team turnover during tenure',
          {
            text: 'Responsible for design quality management and cross-departmental collaboration; led the interface design and design system development of an AI-integrated learning platform, launching on schedule within a year',
            link: { href: 'https://enntang.github.io/portfolio/project/mentor', label: 'View the Mentor project case study' },
          },
          'Led the design team through projects such as revamping an existing product and launching a new product, earning high satisfaction ratings in user surveys',
        ],
      },
      {
        period: 'Jan 2021 – Mar 2023',
        company: 'TutorABC',
        role: 'UI/UX Designer',
        items: [
          'Led the UI/UX design of the brand-new tutorJr official website, and executed the key visual design for the tutorJr x Disney early childhood English learning app',
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
