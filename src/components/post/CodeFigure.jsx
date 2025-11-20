import { useState } from 'react'

function CodeFigure({ language = 'js', code = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.focus()
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  return (
    <figure className='bg-white border border-gray-100 rounded-md overflow-hidden'>
      <div className='flex items-center justify-between px-3 py-2 text-xs tracking-widest text-gray-400'>
        <span className='uppercase'>{language}</span>
        <button onClick={handleCopy} className='px-2 py-1 rounded bg-gray-100 text-gray-800 border border-gray-100 hover:bg-highlight transition-colors duration-200'>
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className='overflow-x-auto p-4 text-[12px] leading-relaxed text-gray-800'>
        <code>{code}</code>
      </pre>
    </figure>
  )
}

export default CodeFigure

