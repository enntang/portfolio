import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import { getProjectsByLanguage } from '../../utils/projectsLoader'
import { buildPath } from '../../utils/routing'
import { getPublicPath } from '../../utils/path'
import LazyImage from '../utilities/LazyImage'

function RelatedProjects({ currentSlug, count = 3 }) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const allProjects = getProjectsByLanguage(language)

  // Filter out current project and get random related projects
  const relatedProjects = allProjects
    .filter((project) => project.slug !== currentSlug)
    .slice(0, count)

  if (relatedProjects.length === 0) return null

  return (
    <div className="w-full">
      <h3 className="text-h3 text-center mb-8 text-gray-700">
        {t('projects.related') || 'More Projects'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map((project, index) => (
          <a
            key={index}
            href={buildPath(`/project/${project.slug}`, language)}
            className="group block"
          >
            <div className="overflow-hidden rounded-lg mb-3">
              {project.imageSrc ? (
                <LazyImage
                  src={getPublicPath(project.imageSrc)}
                  alt={project.imageAlt || project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{project.title}</span>
                </div>
              )}
            </div>
            <h4 className="text-caption font-medium text-gray-800 group-hover:text-gray-500 transition-colors">
              {project.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  )
}

export default RelatedProjects
