import { useEffect } from 'react'
import { usePreloadImage } from '../../hooks/usePreloadImage'

/**
 * Component for preloading images in the background without displaying them
 * Useful for preloading critical images that will be shown later
 * 
 * @param {string|string[]} src - Single image URL or array of image URLs to preload
 * @param {function} onLoad - Optional callback when all images are loaded
 * @param {function} onError - Optional callback when image loading fails
 * 
 * @example
 * // Preload a single important image
 * <PreloadImage src="/path/to/hero-image.png" />
 * 
 * // Preload multiple images
 * <PreloadImage 
 *   src={[
 *     '/path/to/image1.png',
 *     '/path/to/image2.png',
 *     '/path/to/image3.png'
 *   ]}
 *   onLoad={() => console.log('All images loaded!')}
 * />
 * 
 * // Preload images for a carousel
 * <PreloadImage 
 *   src={carouselImages.map(img => img.src)}
 *   onLoad={() => setCarouselReady(true)}
 * />
 */
function PreloadImage({ src, onLoad, onError }) {
  const isLoaded = usePreloadImage(src)

  useEffect(() => {
    if (isLoaded && onLoad) {
      onLoad()
    }
  }, [isLoaded, onLoad])

  // This component doesn't render anything
  return null
}

export default PreloadImage

