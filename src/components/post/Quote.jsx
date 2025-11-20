import { getPublicPath } from '../../utils/path'

function Quote({ children, cite, className = '' }) {
  return (
    <figure className={`rounded-sm border border-gray-200 p-8 text-gray-800 relative${className ? ' ' + className : ''}`}>
      <img src={getPublicPath('/icon-quote.svg')} alt="quote" className='absolute top-1 left-1' />
      <blockquote className='text-p'>
        {children}
      </blockquote>
      {cite && <figcaption className='mt-2  text-gray-400 text-right font-light text-xs'>— {cite}</figcaption>}
    </figure>
  )
}

export default Quote


