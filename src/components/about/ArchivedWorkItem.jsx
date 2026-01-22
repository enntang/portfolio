import { getPublicPath } from '../../utils/path'

export default function ArchivedWorkItem({ title, company, href, target }) {
  return (
    <a href={href} target={target} className="block border-b border-gray-200 first:border-t hover:bg-highlight hover:text-gray-800 py-4 transition-colors duration-200 px-2">
      <div className='flex flex-col text-gray-800 w-full'>
        <div className='flex items-center justify-between gap-2'>
          <div className='text-bold'><p className='underline'>{title}</p></div>
          <img src={getPublicPath('/icon-arrow-right.svg')} alt="link" className='w-4 h-4 self-center shrink-0' />
        </div>
        <div className='text-xs mt-2 text-gray-600 font-light'>{company}</div>
      </div>
    </a>
  )
}


