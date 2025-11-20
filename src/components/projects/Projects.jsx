// 這是Projects列表組件，用在首頁

import ProjectCard from './ProjectCard';
import ProjectCardVertical from './ProjectCardVertical';
import BtnWhite from '../utilities/BtnWhite';
import SectionTitle from '../home/SectionTitle';
import projectsData from '../../assets/projects.json'

function Projects({ projects, title = 'Projects', showMoreButton = true, showSectionTitle = true, direction = 'horizontal' }) {
  const data = projects && projects.length ? projects : projectsData.slice(0, 3);


  return (
    <>
      <section className="mb-32">
        {/* Section Title */}
        {showSectionTitle &&
          <SectionTitle name={title} />}

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
            <BtnWhite name="More Projects" href="#/projects" />
          </div>
        )}
      </section>

    </>
  );
}

export default Projects;


