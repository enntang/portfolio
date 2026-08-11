function LI({ children, className = '' }) {
  return (
    <li className={`mb-2 text-p ${className ? ' ' + className : ''}`}>{children}</li>
  )
}

export default LI



