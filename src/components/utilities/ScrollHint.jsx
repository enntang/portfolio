import { useFloatingAnimation } from '../../hooks/useFloatingAnimation'

/**
 * 專案頁 hero 底下的「還可以往下捲」提示：一條細線往下帶到滑鼠外框，
 * 滑鼠裡的滾輪往下掉，整組再上下漂浮。
 *
 * 顏色走 currentColor，所以放在深色 hero 就給 text-white、
 * 淺色 hero 就給 text-gray-900，不用另外改樣式。
 */
function ScrollHint({ className = '', label = 'Scroll down' }) {
  const floatRef = useFloatingAnimation({ y: -15, duration: 1.8, delay: 0.2 })

  return (
    <div
      ref={floatRef}
      role="img"
      aria-label={label}
      className={`scroll-hint ${className}`}
    >
      <span className="scroll-hint__line" aria-hidden="true" />
      <span className="scroll-hint__mouse" aria-hidden="true">
        <span className="scroll-hint__wheel" />
      </span>
    </div>
  )
}

export default ScrollHint
