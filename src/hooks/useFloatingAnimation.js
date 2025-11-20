import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Custom hook for creating floating animation effect
 * @param {Object} options - Animation options
 * @param {number} options.y - Vertical movement distance (default: -20)
 * @param {number} options.duration - Animation duration in seconds (default: 2)
 * @param {number} options.delay - Animation start delay in seconds (default: 0)
 * @param {string} options.ease - GSAP ease function (default: 'power1.inOut')
 * @param {boolean} options.enabled - Whether animation is enabled (default: true)
 * @returns {React.RefObject} - Ref to attach to the element
 */
export function useFloatingAnimation({
  y = -20,
  duration = 2,
  delay = 0,
  ease = 'power1.inOut',
  enabled = true,
} = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (!enabled || !elementRef.current) return

    const animation = gsap.to(elementRef.current, {
      y,
      duration,
      ease,
      repeat: -1,
      yoyo: true,
      delay,
    })

    // Cleanup function to kill animation when component unmounts
    return () => {
      animation.kill()
    }
  }, [y, duration, delay, ease, enabled])

  return elementRef
}

