/**
 * 篩選時的過場動畫。圈圈樣式沿用全站的 LoadingAnimation，
 * 讓「按下標籤 → 清單換掉」中間有一拍，而不是瞬間跳掉。
 *
 * minHeightClass 由呼叫端指定成大約兩個列表項目的高度，圈圈才不會把整頁縮短，
 * 害下面的 footer 在篩選前後上下彈。
 */
function ListLoading({ minHeightClass = '' }) {
  return (
    <div
      className={`flex items-center justify-center py-24 ${minHeightClass}`}
      role='status'
      aria-live='polite'
    >
      <div className='w-10 h-10 rounded-full border-4 border-highlight border-t-transparent animate-spin' />
    </div>
  )
}

export default ListLoading
