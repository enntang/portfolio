import { getPublicPath } from '../../utils/path'
 
function ProjectCardVertical({ project }) {
  const { title, description, imageSrc, imageAlt } = project;

  return (
    <a href={project?.slug ? `#/project/${project.slug}` : '#/projects'} className="group flex flex-col mobile:flex-col gap-5 mobile:gap-4">
      {/* Project Image */}
      <div className="flex-1">
        <div className="relative overflow-hidden">
          {imageSrc ? (
            <img 
              src={getPublicPath(imageSrc)}
              alt={imageAlt || title}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
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
        <h3 className="text-h2 mobile:text-h2-mobile text-gray-900 mb-4 mobile:mb-3">{title}</h3>
        <p className="text-p text-gray-700 mb-6 mobile:mb-4">{description}</p>
      </div>
    </a>
  );
}

export default ProjectCardVertical;


