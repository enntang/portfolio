import { useState, useEffect, useRef } from 'react'

/**
 * Custom hook for managing interactive hotspots on images
 * @returns {Object} - Hook utilities
 * @returns {React.RefObject} containerRef - Ref to attach to image container
 * @returns {string|null} activeHotspot - Currently active hotspot ID
 * @returns {Function} setActiveHotspot - Function to set active hotspot
 * @returns {Function} handleHotspotClick - Click handler for hotspots
 */
export function useImageHotspots() {
  const [activeHotspot, setActiveHotspot] = useState(null)
  const containerRef = useRef(null)

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeHotspot && containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveHotspot(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeHotspot])

  const handleHotspotClick = (id, event) => {
    event.stopPropagation()
    setActiveHotspot(activeHotspot === id ? null : id)
  }

  return {
    containerRef,
    activeHotspot,
    setActiveHotspot,
    handleHotspotClick,
  }
}

