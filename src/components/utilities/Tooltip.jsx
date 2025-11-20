import React from 'react'

function Tooltip({
  visible,
  x = 0,
  y = 0,
  containerRef,
  offset = 14,
  padding = 8,
  estimatedWidth = 140,
  estimatedHeight = 32,
  className = '',
  children
}) {
  if (!visible) return null

  const containerWidth = containerRef?.current?.clientWidth || 0
  const containerHeight = containerRef?.current?.clientHeight || 0

  const left = Math.max(
    padding,
    Math.min(x + offset, containerWidth - estimatedWidth)
  )

  const top = Math.max(
    padding,
    Math.min(y + offset, containerHeight - estimatedHeight)
  )

  return (
    <div
      className={`absolute z-10 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-gray-900 shadow-md pointer-events-none ${className}`}
      style={{ left, top }}
    >
      {children}
    </div>
  )
}

export default Tooltip


