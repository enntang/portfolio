function TwoColumn({ children, className = '' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${className}`}>
      {children}
    </div>
  )
}

export default TwoColumn

