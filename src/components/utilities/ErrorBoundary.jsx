import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Keep this console log: it's the fastest way to diagnose GitHub Pages white-screen issues.
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const message =
      (this.state.error && (this.state.error.message || String(this.state.error))) ||
      'Unknown error'

    return (
      <div className="min-h-screen bg-white text-gray-900 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
            Something went wrong
          </div>
          <h1 className="mt-3 text-2xl font-bold">App crashed while rendering</h1>
          <p className="mt-2 text-sm text-gray-600">
            Open DevTools → Console to see the real stack trace.
          </p>
          <pre className="mt-6 whitespace-pre-wrap rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm text-gray-800">
            {message}
          </pre>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary

