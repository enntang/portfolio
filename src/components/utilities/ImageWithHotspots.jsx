import React from 'react'
import { useImageHotspots } from '../../hooks/useImageHotspots'
import LazyImage from './LazyImage'

/**
 * Ripple Button Component with concentric circle animation
 */
function RippleButton({ x, y, onClick, isActive, colorVariant = 'blue' }) {
  const colorClasses = {
    blue: {
      ripple: 'bg-blue-500',
      rippleActive: 'bg-blue-600',
      dot: isActive ? 'bg-blue-600' : 'bg-blue-500',
      dotHover: 'group-hover:bg-blue-600',
      rippleClass: 'bg-blue-500',
    },
    purple: {
      ripple: 'bg-purple-500',
      rippleActive: 'bg-purple-600',
      dot: isActive ? 'bg-purple-600' : 'bg-purple-500',
      dotHover: 'group-hover:bg-purple-600',
      rippleClass: 'bg-purple-500',
    },
    highlight: {
      ripple: 'bg-highlight',
      rippleActive: 'bg-highlight',
      dot: isActive ? 'bg-highlight' : 'bg-highlight',
      dotHover: 'group-hover:bg-highlight',
      rippleClass: 'bg-highlight',
    },
  }

  const colors = colorClasses[colorVariant] || colorClasses.blue
  
  // For custom colors like highlight, use inline styles for opacity
  const useInlineOpacity = colorVariant === 'highlight'
  const rippleStyle1 = useInlineOpacity ? { backgroundColor: 'rgba(204, 235, 111, 0.3)' } : {}
  const rippleStyle2 = useInlineOpacity ? { backgroundColor: 'rgba(204, 235, 111, 0.2)' } : {}
  const rippleStyle3 = useInlineOpacity ? { backgroundColor: 'rgba(204, 235, 111, 0.15)' } : {}
  const rippleStyle4 = useInlineOpacity ? { backgroundColor: 'rgba(204, 235, 111, 0.4)' } : {}

  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label="Show details"
    >
      {/* Concentric ripple circles */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer ripple 1 */}
        <span 
          className={`absolute inset-0 rounded-full ${useInlineOpacity ? '' : colors.rippleClass + '/30'} animate-ping`}
          style={{ animationDuration: '2s', ...rippleStyle1 }} 
        />
        {/* Outer ripple 2 */}
        <span 
          className={`absolute inset-0 rounded-full ${useInlineOpacity ? '' : colors.rippleClass + '/20'} animate-ping`}
          style={{ animationDuration: '2s', animationDelay: '0.5s', ...rippleStyle2 }} 
        />
        {/* Outer ripple 3 */}
        <span 
          className={`absolute inset-0 rounded-full ${useInlineOpacity ? '' : colors.rippleClass + '/15'} animate-ping`}
          style={{ animationDuration: '2s', animationDelay: '1s', ...rippleStyle3 }} 
        />
        {/* Middle circle */}
        <span 
          className={`absolute inset-0 rounded-full ${useInlineOpacity ? '' : colors.rippleClass + '/40'} scale-[0.6]`}
          style={rippleStyle4}
        />
        {/* Inner dot */}
        <span 
          className={`relative z-10 w-5 h-5 rounded-full transition-colors ${colors.dot} ${colors.dotHover}`}
        />
      </div>
    </button>
  )
}

/**
 * Tooltip Component
 */
function Tooltip({ content, x, y, arrowPosition = 'bottom' }) {
  const transformMap = {
    bottom: 'translate(-50%, calc(-100% - 16px))',
    // Place tooltip just below the hotspot when arrow is on top
    top: 'translate(-50%, 16px)',
    left: 'translate(calc(-100% - 16px), -50%)',
    right: 'translate(calc(100% + 16px), -50%)',
  }

  const arrowClasses = {
    bottom: 'left-1/2 -translate-x-1/2 -bottom-2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white',
    top: 'left-1/2 -translate-x-1/2 -top-2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white',
    left: 'top-1/2 -translate-y-1/2 -left-2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white',
    right: 'top-1/2 -translate-y-1/2 -right-2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white',
  }

  return (
    <div 
      className="absolute z-20 px-4 py-2 bg-white/80 backdrop-blur rounded-lg shadow-lg text-gray-600 text-sm pointer-events-none w-[200px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: transformMap[arrowPosition] || transformMap.bottom
      }}
    >
      {content}
      {/* Tooltip arrow */}
      <div className={`absolute w-0 h-0 ${arrowClasses[arrowPosition] || arrowClasses.bottom}`} />
    </div>
  )
}

/**
 * Image with Interactive Hotspots Component
 * @param {string} src - Image source
 * @param {string} alt - Image alt text
 * @param {Array} hotspots - Array of hotspot configurations
 * @param {string} className - Additional CSS classes for the image
 * @param {string} containerClassName - Additional CSS classes for the container
 * @param {string} colorVariant - Color variant: 'blue', 'purple', or 'highlight' (default: 'blue')
 * 
 * @example
 * const hotspots = [
 *   { id: 'point1', x: 30, y: 20, content: 'Feature 1', arrowPosition: 'bottom' },
 *   { id: 'point2', x: 70, y: 50, content: 'Feature 2', arrowPosition: 'top' },
 * ]
 * 
 * <ImageWithHotspots 
 *   src={myImage} 
 *   alt="My image" 
 *   hotspots={hotspots}
 *   colorVariant="purple"
 * />
 */
export default function ImageWithHotspots({ 
  src, 
  alt, 
  hotspots = [],
  className = '',
  containerClassName = '',
  colorVariant = 'blue',
}) {
  const { containerRef, activeHotspot, setActiveHotspot, handleHotspotClick } = useImageHotspots()

  return (
    <div 
      ref={containerRef}
      className={`relative w-full cursor-pointer ${containerClassName}`}
      onClick={() => setActiveHotspot(null)}
    >
      <LazyImage src={src} alt={alt} className={`w-full rounded-sm ${className}`} />
      
      {/* Render hotspot buttons */}
      {hotspots.map((hotspot) => (
        <RippleButton
          key={hotspot.id}
          x={hotspot.x}
          y={hotspot.y}
          onClick={(e) => handleHotspotClick(hotspot.id, e)}
          isActive={activeHotspot === hotspot.id}
          colorVariant={colorVariant}
        />
      ))}

      {/* Render active tooltip */}
      {activeHotspot && hotspots.find(h => h.id === activeHotspot) && (
        <Tooltip
          content={hotspots.find(h => h.id === activeHotspot).content}
          x={hotspots.find(h => h.id === activeHotspot).x}
          y={hotspots.find(h => h.id === activeHotspot).y}
          arrowPosition={hotspots.find(h => h.id === activeHotspot).arrowPosition}
        />
      )}
    </div>
  )
}

