/**
 * Case Study / Collection 的一鍵切換鈕。
 *
 * 版型：兩側是文字，中間是一顆一般的開關，深色軌道 + 白色圓鈕，圓鈕滑到目前選中的那一側。
 * 顏色只用網站既有的標準色。
 */

export const CASE_STUDY_VIEW = 'case-study'
export const COLLECTION_VIEW = 'collection'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-4 focus-visible:ring-offset-bg'

function Label({ children, isActive, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-pressed={isActive}
      className={`font-lexend-exa uppercase tracking-[0.08em] text-sm mobile:text-xs font-bold whitespace-nowrap transition-colors duration-300 rounded-sm ${FOCUS_RING} ${
        isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

function ProjectViewToggle({ value, onChange, caseStudyLabel, collectionLabel, switchLabel }) {
  const isCollection = value === COLLECTION_VIEW

  return (
    <div
      role='group'
      aria-label={switchLabel}
      className='inline-flex shrink-0 items-center gap-3 mobile:gap-3'
    >
      <Label isActive={!isCollection} onClick={() => onChange(CASE_STUDY_VIEW)}>
        {caseStudyLabel}
      </Label>

      <button
        type='button'
        onClick={() => onChange(isCollection ? CASE_STUDY_VIEW : COLLECTION_VIEW)}
        role='switch'
        aria-checked={isCollection}
        aria-label={switchLabel}
        className={`relative h-[30px] w-[54px] shrink-0 rounded-full bg-gray-900 ${FOCUS_RING}`}
      >
        <span
          className='absolute top-1/2 -translate-y-1/2 block w-[22px] h-[22px] rounded-full bg-white transition-[left] duration-300 ease-out'
          style={{ left: isCollection ? 'calc(100% - 26px)' : '4px' }}
        />
      </button>

      <Label isActive={isCollection} onClick={() => onChange(COLLECTION_VIEW)}>
        {collectionLabel}
      </Label>
    </div>
  )
}

export default ProjectViewToggle
