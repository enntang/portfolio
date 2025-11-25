function SectionBlock({ 
  bgVariant, 
  variant, 
  children, 
  className = '', 
  style = {},
  backgrounds = {} 
}) {
  // 支持 bgVariant 和 variant 两种命名方式（为了兼容不同项目）
  const variantKey = bgVariant || variant
  
  // 检测是否为 iOS 设备
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

  const backgroundImage = variantKey && backgrounds[variantKey] ? backgrounds[variantKey] : null
  const hasCustomBackground = !!(backgroundImage || style.background || style.backgroundImage)
  const isWhiteVariant = variantKey === 'white'
  const textColor = backgroundImage ? 'text-white' : 'text-gray-900'
  const backgroundColor = isWhiteVariant ? 'bg-white' : (hasCustomBackground ? '' : 'bg-bg')

  const combinedStyle = { ...style }

  if (backgroundImage) {
    combinedStyle.backgroundImage = `url(${backgroundImage})`
    if (isIOS) {
      // iOS 设备使用 tile（平铺）方式
      combinedStyle.backgroundSize = 'auto'
      combinedStyle.backgroundRepeat = 'repeat'
      combinedStyle.backgroundAttachment = 'unset'
    } else {
      // 非 iOS 设备使用 cover 方式
      combinedStyle.backgroundSize = 'cover'
      combinedStyle.backgroundPosition = 'center'
      combinedStyle.backgroundRepeat = 'no-repeat'
      combinedStyle.backgroundAttachment = 'fixed'
    }
  }

  return (
    <div
      className={`py-32 mx-auto relative ${backgroundColor} ${textColor} ${className}`}
      style={combinedStyle}
    >
      {children}
    </div>
  )
}

export default SectionBlock

