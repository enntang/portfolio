import LazyImage from './LazyImage'

/**
 * 點開燈箱用的圖片。button 負責觸發與排版（寬度、旋轉、位移、外距），視覺樣式
 * （圓角、陰影）留在 img 上，換上來的版面才會跟原本的 LazyImage 一模一樣。
 *
 * 圖片的說明交給 button 的 aria-label，img 一律留空 alt，讀螢幕才不會唸兩次。
 */
function ZoomableImage({ onZoom, label, className = '', imgClassName = '', ...props }) {
  return (
    <button
      type="button"
      onClick={onZoom}
      aria-label={label}
      className={`block cursor-zoom-in ${className}`.trim()}
    >
      <LazyImage className={imgClassName} {...props} />
    </button>
  )
}

export default ZoomableImage
