import NotFound from './NotFound.jsx'

// Eagerly load per-project pages to avoid JSON-driven generation.
// Convention:
// - src/assets/projects/<slug>/Page.jsx
// - or src/assets/projects/<slug>/index.jsx
const pageModules = import.meta.glob('./assets/projects/*/Page.jsx', { eager: true, import: 'default' })
const indexModules = import.meta.glob('./assets/projects/*/index.jsx', { eager: true, import: 'default' })

function buildSlugToComponentMap() {
  const map = {}
  const assign = (modules) => {
    Object.entries(modules).forEach(([p, Comp]) => {
      const afterBase = p.split('/assets/projects/')[1] || ''
      const slug = afterBase.split('/')[0] || ''
      if (slug && Comp && !map[slug]) {
        map[slug] = Comp
      }
    })
  }
  assign(pageModules)
  assign(indexModules)
  return map
}

const slugToComponent = buildSlugToComponentMap()

function ProjectPageRouter({ slug }) {
  const Component = slugToComponent[slug]
  if (!Component) {
    return <NotFound />
  }
  return <Component />
}

export default ProjectPageRouter


