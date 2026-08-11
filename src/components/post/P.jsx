function P({ children, className = '' }) {
  return (
    <p className={`mb-4 mobile:mb-4 text-p ${className ? ' ' + className : ''}`}>{children}</p>
  )
}

export default P


