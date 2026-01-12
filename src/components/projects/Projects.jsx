// 這是Projects列表組件，用在首頁

import ProjectCard from './ProjectCard';
import ProjectCardVertical from './ProjectCardVertical';
import BtnWhite from '../utilities/BtnWhite';
import SectionTitle from '../home/SectionTitle';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { getProjectsByLanguage } from '../../utils/projectsLoader';
import { buildPath } from '../../utils/routing';

function Projects({ projects, title, showMoreButton = true, showSectionTitle = true, direction = 'horizontal' }) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const projectsData = getProjectsByLanguage(language);
  const defaultTitle = title || t('projects.title');
  const data = projects && projects.length ? projects : projectsData.slice(0, 3);

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }


  return (
    <>
      <section className="mb-32">
        {/* Section Title */}
        {showSectionTitle &&
          <SectionTitle name={defaultTitle} />}

        {/* Projects */}
        <div className={`space-y-0 grid gap-12 ${direction === 'vertical' ? 'grid-cols-2 mobile:grid-cols-1' : 'grid-cols-1'}`}>

          {data.map((project, index) =>
            direction === 'horizontal' ? (
              <ProjectCard
                key={index}
                project={project}
                isReversed={index % 2 === 1}
              />
            ) : (
              <ProjectCardVertical
                key={index}
                project={project}
              />
            )
          )}
        </div>

        {/* More Projects Button */}
        {showMoreButton && (
          <div className="flex justify-center mt-16 mobile:mt-8">
            <BtnWhite name={t('projects.title')} href={buildHref('/projects')} />
          </div>
        )}
      </section>

    </>
  );
}

export default Projects;


