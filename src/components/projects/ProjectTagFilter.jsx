import { getTagLabel } from '../../utils/tags'

/**
 * 作品列表頁的標籤篩選：一行「ALL / BOOKS / …」的文字清單，選中的那一項套上底色。
 *
 * 單選。標籤清單來自當前分頁實際用到的 tag，所以不會出現按了什麼都沒有的空篩選；
 * 再按一次已選中的標籤就回到 ALL。
 */
// 標籤清單可能是空的（例如 Collection 還沒有作品），這時仍然要留下「全部」，
// 版面才不會少一塊，切換分頁時控制列也不會左右跳動。
function ProjectTagFilter({ tags, selectedTag, onChange, allLabel, count, t }) {
  const itemClass = (isActive) =>
    `rounded-full px-3 py-1 font-lexend-exa uppercase tracking-[0.06em] text-caption whitespace-nowrap transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
      isActive ? 'bg-highlight text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`

  const items = [
    { key: '', label: allLabel, count },
    ...tags.map(tag => ({ key: tag, label: getTagLabel(t, tag) })),
  ]

  return (
    <div className='flex flex-wrap items-center gap-y-1 mobile:justify-center'>
      {items.map((item, index) => (
        <div key={item.key || 'all'} className='flex items-center'>
          {index > 0 && <span aria-hidden='true' className='text-gray-300 px-1'>/</span>}
          <button
            type='button'
            onClick={() => onChange(selectedTag === item.key ? '' : item.key)}
            aria-pressed={selectedTag === item.key}
            className={itemClass(selectedTag === item.key)}
          >
            {item.label}
            {typeof item.count === 'number' && (
              <span className='ml-1 text-gray-400'>({item.count})</span>
            )}
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProjectTagFilter
