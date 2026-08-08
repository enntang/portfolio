export default function AboutSectionTitle({ children, className = 'text-gray-800' }) {
    return (
      <h2 className={`tracking-widest font-bold ${className}`}>{children}</h2>
    )
  }
