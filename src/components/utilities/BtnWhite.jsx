import { getPublicPath } from '../../utils/path'

function BtnWhite({ name, variant = 'default', className = '', href = '#', target, as = 'a', ...restProps }) {
  const baseClasses = 'inline-flex items-center gap-2 text-gray-900 bg-white rounded-full px-5 py-2 text-sm font-medium transition-all duration-300'
  const variantClasses = variant === 'bordered' ? 'border border-gray-300' : ''
  const hoverClasses = 'hover:bg-highlight group-hover:bg-highlight'
  const Tag = as
  
  return (
    <Tag
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${className}`}
      {...(as === 'a' ? { href, target } : {})}
      {...restProps}
    >
      {name}
      <img src={getPublicPath('/icon-arrow-right.svg')} alt='' className='w-4 h-4' />
    </Tag>
  )
}

export default BtnWhite
