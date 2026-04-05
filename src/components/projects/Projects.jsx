// 這是Projects列表組件，用在首頁

import { useEffect, useRef, useState } from 'react';
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
  const [visibleItems, setVisibleItems] = useState([]);
  const itemRefs = useRef([]);

  // Helper to build path with language prefix
  const buildHref = (path) => {
    return buildPath(path, language)
  }

  useEffect(() => {
    const observers = itemRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => [...new Set([...prev, index])]);
            }, index * 500);
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [data.length]);

  return (
    <>
      <section className="mb-32">
        {/* Section Title */}
        {showSectionTitle &&
          <SectionTitle name={defaultTitle} />}

        {/* Projects */}
        <div className={`mt-[-30px] space-y-0 grid gap-12 ${direction === 'vertical' ? 'grid-cols-2 mobile:grid-cols-1' : 'grid-cols-1'}`}>

          {data.map((project, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              style={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(32px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              {direction === 'horizontal' ? (
                <ProjectCard
                  project={project}
                  isReversed={index % 2 === 1}
                />
              ) : (
                <ProjectCardVertical
                  project={project}
                />
              )}
            </div>
          ))}
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


