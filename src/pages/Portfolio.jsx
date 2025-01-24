import React from "react";

const Portfolio = () => {
  const projects = [
    { id: 1, name: "作品 1", description: "作品描述 1" },
    { id: 2, name: "作品 2", description: "作品描述 2" },
  ];

  return (
    <div>
      <h1>作品集</h1>
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{project.name}</h5>
                <p className="card-text">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;