import { useEffect, useState } from 'react'

/**
 * Hook for preloading images in the background
 * @param {string|string[]} imageSrcs - Single image URL or array of image URLs to preload
 * @returns {boolean} - Whether all images have been loaded
 * 
 * @example
 * // Preload a single image
 * const isLoaded = usePreloadImage('/path/to/image.png')
 * 
 * // Preload multiple images
 * const allLoaded = usePreloadImage([
 *   '/path/to/image1.png',
 *   '/path/to/image2.png',
 *   '/path/to/image3.png'
 * ])
 */
export function usePreloadImage(imageSrcs) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!imageSrcs) return

    const images = Array.isArray(imageSrcs) ? imageSrcs : [imageSrcs]
    if (images.length === 0) return

    let loadedCount = 0
    const totalImages = images.length

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
        img.src = src
      })
    }

    // Load all images
    Promise.allSettled(images.map(loadImage))
      .then(() => {
        setIsLoaded(true)
      })
      .catch((error) => {
        console.warn('Some images failed to preload:', error)
        // Still set loaded to true even if some fail
        setIsLoaded(true)
      })
  }, [imageSrcs])

  return isLoaded
}

export default usePreloadImage

