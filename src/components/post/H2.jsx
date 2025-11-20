function H2({ children, id, className = '' }) {
  return (
    <h2 id={id} className={`text-h2 mb-8${className ? ' ' + className : ''}`} style={{fontWeight: '500'}}>{children}</h2>
  )
}

export default H2


