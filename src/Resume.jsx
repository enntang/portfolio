import { useState } from 'react'
import { resumeData } from './assets/resume/resumeData'
import { getPublicPath } from './utils/path'
import { buildPath } from './utils/routing'
import { useLanguage } from './contexts/LanguageContext'
import LazyImage from './components/utilities/LazyImage'

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 print:w-3 print:h-3 shrink-0">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 print:w-3 print:h-3 shrink-0">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  )
}

function Resume({ dataset = resumeData }) {
  const { language } = useLanguage()
  const [lang, setLang] = useState(language === 'zh-TW' ? 'zh' : 'en')
  const d = dataset[lang]
  const bodyTracking = lang === 'zh' ? 'tracking-normal' : ''

  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-bg font-sans">
      {/* Top bar */}
      <div className="no-print sticky top-0 z-30 flex items-center justify-between gap-4 px-4 md:px-8 py-4 bg-bg/90 backdrop-blur-md border-b border-gray-100">
        <a
          href={buildPath('/', language)}
          className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
        >
          <img src={getPublicPath('/icon-arrow-left.svg')} alt="" className="w-4 h-4" />
          {d.labels.back}
        </a>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white border border-gray-200 p-1">
            <button
              onClick={() => setLang('zh')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${lang === 'zh' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-highlight'}`}
              aria-label="切換為中文"
            >
              中
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${lang === 'en' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-highlight'}`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white text-sm px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            <img src={getPublicPath('/icon-arrow-down.svg')} alt="" className="w-4 h-4 invert" />
            {d.labels.downloadPdf}
          </button>
        </div>
      </div>

      {/* Resume document */}
      <div
        id="resume-doc"
        className="resume-doc max-w-5xl mx-auto my-6 md:my-10 md:flex md:items-stretch bg-white md:rounded-2xl md:shadow-sm overflow-hidden print:flex print:flex-row print:items-stretch print:my-0 print:max-w-full print:shadow-none print:rounded-none"
      >
        {/* Sidebar */}
        <aside className="resume-sidebar md:w-[300px] print:w-[200px] shrink-0 bg-gray-900 text-white p-8 flex flex-col gap-8 print:p-5 print:gap-3.5">
          <div>
            <LazyImage
              src={getPublicPath('/portrait.png')}
              alt={d.nameEn}
              className="w-24 h-24 print:w-16 print:h-16 rounded-full object-cover border-2 border-white/20 mb-4 print:mb-3"
              preload={true}
            />
            <h1 className="text-xl print:text-base font-semibold leading-tight">
              {lang === 'zh' ? d.nameZh : d.nameEn}
            </h1>
            <p className="text-sm print:text-[11px] text-gray-400">
              {lang === 'zh' ? d.nameEn : d.nameZh}
            </p>
          </div>

          <div className="space-y-2 print:space-y-1.5 text-sm print:text-[11px] text-gray-300">
            <a href={d.linkedinHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <IconLinkedIn />
              <span className="break-all">{d.linkedinLabel}</span>
            </a>
            <a href={`mailto:${d.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <IconMail />
              <span className="break-all">{d.email}</span>
            </a>
          </div>

          <div>
            <h2 className="text-xs print:text-[11px] font-semibold tracking-widest text-gray-400 mb-3 print:mb-2">{d.labels.target}</h2>
            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {d.target.map((tag) => (
                <span key={tag} className="text-xs print:text-[11px] px-3 py-1 print:px-2 print:py-0.5 rounded-full border border-white/20 text-gray-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs print:text-[11px] font-semibold tracking-widest text-gray-400 mb-3 print:mb-2">{d.labels.tools}</h2>
            <div className="flex flex-wrap gap-2 print:gap-1.5">
              {d.tools.map((tool) => (
                <span key={tool} className="text-xs print:text-[11px] px-2.5 py-1 print:px-1.5 print:py-0.5 rounded-md bg-white/10 text-gray-100">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs print:text-[11px] font-semibold tracking-widest text-gray-400 mb-3 print:mb-2">{d.labels.languages}</h2>
            <div className="space-y-1.5 print:space-y-1 text-sm print:text-[11px]">
              {d.languages.map((item) => (
                <div key={item.name} className="flex items-baseline justify-between gap-2">
                  <span className="text-gray-100">{item.name}</span>
                  <span className="text-gray-400 text-xs print:text-[11px]">{item.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs print:text-[11px] font-semibold tracking-widest text-gray-400 mb-3 print:mb-2">{d.labels.education}</h2>
            <div>
              {d.education.map((edu) => (
                <div key={edu.school} className="text-sm print:text-[11px] mb-3 last:mb-0 print:mb-2.5 print:last:mb-0">
                  <div className="text-xs print:text-[11px] text-gray-400">{edu.period}</div>
                  <div className="text-gray-100 font-medium">{edu.school}</div>
                  <div className="text-gray-400 text-xs print:text-[11px]">{edu.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="resume-main flex-1 p-8 md:p-12 print:p-7 flex flex-col gap-10 print:gap-2 text-gray-800">
          <section>
            <h2 className="text-h3 print:text-[15px] font-semibold text-gray-900 pb-2 print:pb-1 border-b border-gray-200 mb-4 print:mb-2">
              {d.labels.about}
            </h2>
            <div className={`space-y-3 print:space-y-2 text-p text-[14px] print:text-[10.5px] print:leading-[1.45] text-gray-700 ${bodyTracking}`}>
              {d.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-h3 print:text-[15px] font-semibold text-gray-900 pb-2 print:pb-1 border-b border-gray-200 mb-4 print:mb-2">
              {d.labels.focus}
            </h2>
            <ul className="resume-focus-grid grid md:grid-cols-2 print:grid-cols-2 gap-x-8 print:gap-x-5 gap-y-3 print:gap-y-2">
              {d.focus.map((item) => (
                <li key={item.label} className={`text-p text-[14px] print:text-[10.5px] print:leading-[1.45] text-gray-700 flex gap-2 ${bodyTracking}`}>
                  <span className="mt-[9px] print:mt-[6px] w-1 h-1 print:w-[3px] print:h-[3px] rounded-full bg-gray-400 shrink-0" />
                  <span>
                    <strong className="text-gray-900 font-semibold">{item.label}</strong>
                    {lang === 'zh' ? '：' : ': '}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h3 print:text-[15px] font-semibold text-gray-900 pb-2 print:pb-1 border-b border-gray-200 mb-6 print:mb-2">
              {d.labels.experience}
            </h2>
            <div className="space-y-8 print:space-y-1.5">
              {d.experience.map((exp) => (
                <div key={`${exp.company}-${exp.period}`} className="resume-exp-item relative pl-6 print:pl-3.5">
                  <div className="absolute left-0 top-2.5 bottom-0 w-0.5 bg-gray-200" />
                  <div className="absolute -left-[3px] top-1.5 w-2 h-2 print:w-1.5 print:h-1.5 rounded-full bg-gray-900" />
                  <div className="text-xs print:text-[11px] text-gray-900 mb-1 print:mb-0.5">{exp.period}</div>
                  <h3 className="text-base print:text-[14px] font-semibold text-gray-900">{exp.company}</h3>
                  <div className="text-sm print:text-[11px] text-gray-500 mb-2 print:mb-1">{exp.role}</div>
                  <ul className="space-y-1.5 print:space-y-1">
                    {exp.items.map((line, i) => {
                      const isLinked = typeof line === 'object'
                      return (
                        <li key={i} className={`text-p text-[14px] print:text-[10.5px] print:leading-[1.45] text-gray-700 flex gap-2 ${bodyTracking}`}>
                          <span className="mt-[9px] print:mt-[6px] w-1 h-1 print:w-[3px] print:h-[3px] rounded-full bg-gray-400 shrink-0" />
                          <span>
                            {isLinked ? line.text : line}
                            {isLinked && (
                              <a
                                href={line.link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="block mt-1 text-gray-500 underline hover:text-gray-900 transition-colors"
                              >
                                → {line.link.label}
                              </a>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Resume
