function H3({ children, id, className = '' }) {
  return (
    <h3 id={id} className={`text-h3 scroll-mt-[200px] mt-8 mb-4${className ? ' ' + className : ''}`}>{children}</h3>
  )
}

export default H3


