function Mark({ children, className = '' }) {
  return (
    <mark className={`bg-highlight text-gray-800 px-1 rounded-sm${className ? ' ' + className : ''}`}>{children}</mark>
  )
}

export default Mark


