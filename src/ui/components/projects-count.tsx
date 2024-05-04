import React from "react";

interface ProjectsCountProps {
  availableCount: number;
  inProgressCount: number;
  completedCount: number;
  cancelledCount: number;
}

const ProjectsCount: React.FC<ProjectsCountProps> = ({
  availableCount,
  inProgressCount,
  completedCount,
  cancelledCount
}) => {
  return (
    <div className="row mt-4 m-5 text-center">
      <div className="col-md-3">
        <p>Projetos disponiveis</p>
        <div className="card text-center justify-center p-4">
          <p className="mt-3">{availableCount}</p>
        </div>
      </div>

      <div className="col-12 col-md-3">
        <p>Em andamento</p>
        <div className="card text-center justify-center p-4">
          <p className="mt-3">{inProgressCount}</p>
        </div>
      </div>

      <div className="col-12 col-md-3">
        <p>Concluídos</p>
        <div className="card text-center bg-dark justify-center p-4">
          <p className="mt-3 text-white">{completedCount}</p>
        </div>
      </div>

      <div className="col-12 col-md-3">
        <p>Cancelados</p>
        <div className="card text-center bg-dark justify-center p-4">
          <p className="mt-3 text-white">{cancelledCount}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectsCount;
