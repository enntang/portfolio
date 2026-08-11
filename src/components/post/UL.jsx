function UL({ children, className = '' }) {
  return (
    <ul className={`mb-4 mobile:mb-4 list-disc pl-5 ${className ? ' ' + className : ''}`}>{children}</ul>
  )
}

export default UL



