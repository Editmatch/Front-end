import React, { useState } from "react";
import { Carousel, Row, Spinner, Button, Modal } from "react-bootstrap";
import DashboardHeader from "../../../ui/components/dashboard-header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProjectsCount from "../../../ui/components/projects-count";
import Order from "../../../ui/components/order";
import useProjects from "../../../data/useProjects"; 
import ProjectCard from "../../../ui/components/ProjectCard";

const CarouselContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: #666666;
`;

function Projects() {
  const userId = sessionStorage.getItem("userId");
  const { loading, inProgressOrders, completedOrders, cancelledOrders, availableOrders } = useProjects(userId ?? "");
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const chunkArray = (arr: any[], chunkSize: number): any[][] => {
    const chunkedArray: any[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const inProgressChunks = chunkArray(inProgressOrders, 4);
  const completedChunks = chunkArray(completedOrders, 4);
  const cancelledChunks = chunkArray(cancelledOrders, 4);
  const availableChunks = chunkArray(availableOrders, 4);

  return (
    <div>
      <DashboardHeader />
      <div className="container">
        {loading && (
          <LoadingMessage>
            <Spinner className="text-center mt-5" variant="primary" />
          </LoadingMessage>
        )}
        {!loading && (
          <>
            <ProjectsCount
              availableCount={availableOrders.length}
              inProgressCount={inProgressOrders.length}
              completedCount={completedOrders.length}
              cancelledCount={cancelledOrders.length}
            />
            {availableOrders.length > 0 ? (
              <div className="row mt-5">
                <div className="d-flex justify-content-end mt-2">
                  <Button onClick={handleModalShow} className="btn btn-dark">
                    Publicar projeto
                  </Button>
                </div>
                <div className="col-md-12">
                  <h5>
                    <b>Projetos disponíveis</b>
                  </h5>
                  <CarouselContainer>
                    <Carousel controls={false}>
                      {availableChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                          <Row>
                            {chunk.map((project) => (
                              <ProjectCard key={project.orderId} project={project} />
                            ))}
                          </Row>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </CarouselContainer>
                </div>
              </div>
            ) : (
              <div className="row mt-5">
                <h5>
                  <b>Projetos disponíveis</b>
                </h5>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">Nenhum projeto encontrado</h5>
                      <p className="card-text">Não há projetos disponíveis</p>
                      <Button onClick={handleModalShow} className="btn btn-dark">
                        Publicar projeto
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {inProgressOrders.length > 0 ? (
              <div className="row mt-5">
                <div className="col-md-6">
                  <h5>
                    <b>Projetos em andamento</b>
                  </h5>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <Link to="/produtores" className="btn btn-dark">
                    Encontrar novo projeto
                  </Link>
                </div>
                <div className="col-md-12 mt-5">
                  <CarouselContainer>
                    <Carousel controls={false}>
                      {inProgressChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                          <Row>
                            {chunk.map((project) => (
                              <ProjectCard key={project.orderId} project={project} />
                            ))}
                          </Row>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </CarouselContainer>
                </div>
              </div>
            ) : (
              <div className="row mt-5">
                <h5>
                  <b>Projetos em andamento</b>
                </h5>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">Nenhum projeto encontrado</h5>
                      <p>Aguarde até que um editor aceite seus projetos</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {completedOrders.length > 0 ? (
              <div className="row mt-5">
                <div className="col-md-12">
                  <h5>
                    <b>Projetos finalizados</b>
                  </h5>
                  <CarouselContainer>
                    <Carousel controls={false}>
                      {completedChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                          <Row>
                            {chunk.map((project) => (
                              <ProjectCard key={project.orderId} project={project} />
                            ))}
                          </Row>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </CarouselContainer>
                </div>
              </div>
            ) : (
              <div className="row mt-5">
                <div className="col-md-12">
                  <h5>
                    <b>Projetos finalizados</b>
                  </h5>
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        Nenhum projeto finalizado encontrado
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cancelledOrders.length > 0 ? (
              <div className="row mt-5">
                <div className="col-md-12">
                  <h5>
                    <b>Projetos cancelados</b>
                  </h5>
                  <CarouselContainer>
                    <Carousel controls={false} slide={true}>
                      {cancelledChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                          <Row>
                            {chunk.map((project) => (
                              <ProjectCard key={project.orderId} project={project} />
                            ))}
                          </Row>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </CarouselContainer>
                </div>
              </div>
            ) : (
              <div className="row mt-5">
                <div className="col-md-12">
                  <h5>
                    <b>Projetos cancelados</b>
                  </h5>
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">
                        Nenhum projeto cancelado encontrado
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Order onClose={handleModalClose} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Projects;
