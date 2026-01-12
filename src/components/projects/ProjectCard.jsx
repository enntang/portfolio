import { getPublicPath } from '../../utils/path'
import LazyImage from '../utilities/LazyImage'
import { useLanguage } from '../../contexts/LanguageContext'
import { buildPath } from '../../utils/routing'
 
function ProjectCard({ project, isReversed = false }) {
  const { title, description, imageSrc, imageAlt } = project;
  const { language } = useLanguage();

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  return (
    <a href={project?.slug ? buildHref(`/project/${project.slug}`) : buildHref('/projects')} className={`group flex flex-row mobile:flex-col gap-5 mobile:gap-4 ${isReversed ? 'flex-row-reverse mobile:flex-col' : ''}`}>
      {/* Project Image */}
      <div className="flex-1">
        <div className="relative overflow-hidden">
          {imageSrc ? (
            <LazyImage 
              src={getPublicPath(imageSrc)}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-sm"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="text-h2 text-gray-900 mb-2">{title.split(':')[0]}</div>
                <div className="text-sm mobile:text-xs opacity-90">{title.split(':')[1]}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-h3 mobile:text-h3-mobile text-gray-900  group-hover:text-gray-400 transition-all duration-300 mb-4 mobile:mb-3">{title}</h3>
        <p className="text-caption text-gray-700 group-hover:text-gray-400 transition-all duration-300 mb-6 mobile:mb-4">{description}</p>
      </div>
    </a>
  );
}

export default ProjectCard;


