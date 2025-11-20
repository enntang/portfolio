export default function ProjectNote({ children, className = '' }) {
  return (
    <div className={`text-caption bg-white/30 backdrop-blur rounded-sm p-4 shadow-xl rotate-[-8deg] h-fit ${className}`}>
      {children}
    </div>
  )
}


