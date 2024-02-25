function ProjectsCount() {
    return (
        <div className="row mt-4 m-5 text-center">
            <div className="col-md-3">

                <p>Projetos publicados</p>
                <div className="card text-center justify-center p-4">
                    <p className="mt-3">10</p>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <p>Em andamento</p>
                <div className="card text-center justify-center p-4">
                    <p className="mt-3">10</p>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <p>Concluidos</p>
                <div className="card text-center bg-dark justify-center p-4">
                    <p className="mt-3 text-white">10</p>
                </div>
            </div>

            <div className="col-12 col-md-3">
                <p>Cancelados</p>
                <div className="card text-center bg-dark justify-center p-4">
                    <p className="mt-3 text-white">10</p>
                </div>
            </div>
        </div>
    )
}
export default ProjectsCount;