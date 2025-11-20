function List({ items = [], children, className = '' }) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children
  return (
    <ul className={`list-disc list-inside text-gray-700 text-p mb-4 mobile:mb-4${className ? ' ' + className : ''}`}>
      {hasChildren
        ? children
        : items.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))
      }
    </ul>
  )
}

export default List



