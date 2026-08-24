import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import { getProjectsByLanguage } from '../../utils/projectsLoader'
import { buildPath } from '../../utils/routing'
import { getPublicPath } from '../../utils/path'
import LazyImage from '../utilities/LazyImage'

function RelatedProjects({ currentSlug, count = 3, invert = false }) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const allProjects = getProjectsByLanguage(language)

  // 從目前這個專案的下一個開始輪、繞一圈回來。固定取名單前幾筆的話，
  // 排在後面的專案（例如 textbook）在任何一頁都不會被帶到。
  const currentIndex = allProjects.findIndex((project) => project.slug === currentSlug)
  const otherProjects = allProjects.filter((project) => project.slug !== currentSlug)
  const relatedProjects = (currentIndex === -1
    ? otherProjects
    : [...otherProjects.slice(currentIndex), ...otherProjects.slice(0, currentIndex)]
  ).slice(0, count)

  if (relatedProjects.length === 0) return null

  return (
    <div className="w-full px-8 xl:px-16 py-16">
      <h3 className={`text-h3 text-center mb-8 ${invert ? 'text-white' : 'text-gray-700'}`}>
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
            <h4
              className={`text-caption font-medium transition-colors ${
                invert
                  ? 'text-white group-hover:text-gray-300'
                  : 'text-gray-800 group-hover:text-gray-500'
              }`}
            >
              {project.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  )
}

export default RelatedProjects
