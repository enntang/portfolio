import { useRef, useState } from 'react'
import Tooltip from './Tooltip'

function EmailCopy({
  email = 'enntang.work@gmail.com',
  className = '',
  containerRef,
  tooltipCopiedText = 'Copied!',
  tooltipDefaultText = 'Click to copy',
  label,
}) {
  const internalContainerRef = useRef(null)
  const effectiveContainerRef = containerRef || internalContainerRef
  const [hover, setHover] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)

  const displayText = label || email

  return (
    <div ref={internalContainerRef} className="relative inline-block text-4xl mobile:text-3xl text-gray-300 font-medium mb-16 mobile:mb-8">
      <button
        type="button"
        aria-label="Click to copy email"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
          } catch (_) { }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => {
          const rect = effectiveContainerRef.current?.getBoundingClientRect()
          if (!rect) return
          setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }}
        className={className}
      >
        {displayText}
      </button>
      <Tooltip
        visible={hover}
        x={cursor.x}
        y={cursor.y}
        containerRef={effectiveContainerRef}
      >
        {copied ? tooltipCopiedText : tooltipDefaultText}
      </Tooltip>
    </div>
  )
}

export default EmailCopy


