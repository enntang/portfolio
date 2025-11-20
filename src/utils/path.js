/**
 * Get the public asset path with base URL prefix
 * @param {string} path - The path starting with '/'
 * @returns {string} - The path with base URL prefix
 */
export function getPublicPath(path) {
  if (!path) return path
  // If path already starts with base, return as is
  if (path.startsWith(import.meta.env.BASE_URL)) return path
  // If path starts with '/', prepend base URL
  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`
  }
  // Otherwise return as is
  return path
}

