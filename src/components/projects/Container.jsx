function Container({ children, className = '' }) {
  return (
    <div className={`max-w-3xl mobile:max-w-full px-16 mobile:px-8 mx-auto w-full ${className}`}>
      {children}
    </div>
  )
}

export default Container

