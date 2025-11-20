function LI({ children, className = '' }) {
  return (
    <li className={`mb-2 text-p ${className ? ' ' + className : ''}`} style={{ fontWeight: '200' }}>{children}</li>
  )
}

export default LI



