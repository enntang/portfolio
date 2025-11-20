export default function ProjectStickyNote({ children, className = '' }) {
  return (
    <div className={`rotate-[-8deg] text-caption backdrop-blur rounded-sm p-4 shadow-xl ${className}`}>
      {children}
    </div>
  )
}


