export default function ExperienceItem({ role, title, period, company, subtitle, items = []}) {
  const heading = title ?? role
  const companyText = subtitle ?? company
  return (
    <div className="border-b border-gray-200 pb-4 first:border-t first:pt-4  px-2">
      <div className='flex items-center justify-between text-sm text-gray-600 mb-2'>
        <span className='text-gray-800 text-bold'>{heading}</span>
        <span className='text-gray-600 text-xs font-light'>{period}</span>
      </div>
      <div className='text-xs mb-4 text-gray-600 font-light'>{companyText}</div>
      {items.length > 0 && (
        <ul className='list-disc list-outside pl-4 text-xs leading-normal font-light'>
          {items.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}


