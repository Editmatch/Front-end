import { useEffect, useState } from "react";
import { Carousel, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import DashboardHeader from "../../../ui/components/dashboard-header";
import styled from "styled-components";
import axios from "axios";
import { useEnvironment } from "../../../data/contexts/enviromentContext";
import { Link } from "react-router-dom";
import ProjectsCount from "../../../ui/components/projects-count";
import Order from "../../../ui/components/order";

function Videos() {
  const { apiUrl } = useEnvironment();
  const CarouselContainer = styled.div`
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
  `;

  const [loading, setLoading] = useState(true);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userId = sessionStorage.getItem("userId");

  const fetchProjects = () => {
    setLoading(true);
    axios
      .get(`${apiUrl}/orders/order-client?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        const {
          inProgressOrders,
          completedOrders,
          cancelledOrders,
          availableOrders,
        } = response.data;
        setInProgressOrders(inProgressOrders || []);
        setCompletedOrders(completedOrders || []);
        setCancelledOrders(cancelledOrders || []);
        setAvailableOrders(availableOrders || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

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

  const CardContainer = styled.div`
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    transition: transform 0.2s ease-in;
    &:hover {
      transform: scale(1.03);
    }
  `;

  const CardTitle = styled.h3`
    color: #333333;
    font-size: 18px;
    margin-bottom: 10px;
  `;

  const CardDescription = styled.p`
    color: #666666;
    font-size: 14px;
    margin-bottom: 10px;
  `;

  const CardSkills = styled.div`
    color: #999999;
    font-size: 12px;
  `;

  const LinkStyled = styled(Link)`
    text-decoration: none;
    color: black;
  `;

  const LoadingMessage = styled.p`
    text-align: center;
    margin-top: 2rem;
    color: #666666;
  `;

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

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
                              <Col md={3} key={project.orderId}>
                                <LinkStyled
                                  to={`/meu-pedido/${project.orderId}`}
                                >
                                  <div>
                                    <CardContainer>
                                      <CardTitle>{project.title}</CardTitle>
                                      <CardDescription>
                                        {project.description}
                                      </CardDescription>
                                      <CardSkills>
                                        {project.skills
                                          .split(",")
                                          .map(
                                            (skill: string, index: number) => (
                                              <span key={index}>
                                                {skill.trim()}
                                              </span>
                                            )
                                          )}
                                      </CardSkills>
                                    </CardContainer>
                                  </div>
                                </LinkStyled>
                              </Col>
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
                  <b>Projetos disponiveis</b>
                </h5>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body text-center">
                      <h5 className="card-title">Nenhum projeto encontrado</h5>
                      <p className="card-text">Não há projetos disponíveis</p>
                      <Button
                        onClick={handleModalShow}
                        className="btn btn-dark"
                      >
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
                    <b>Projetos em disponiveis</b>
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
                              <Col md={3} key={project.orderId}>
                                <LinkStyled
                                  to={`/meu-pedido/${project.orderId}`}
                                >
                                  <div>
                                    <CardContainer>
                                      <CardTitle>{project.title}</CardTitle>
                                      <CardDescription>
                                        {project.description}
                                      </CardDescription>
                                      <CardSkills>
                                        {project.skills
                                          .split(",")
                                          .map(
                                            (skill: string, index: number) => (
                                              <span key={index}>
                                                {skill.trim()}
                                              </span>
                                            )
                                          )}
                                      </CardSkills>
                                    </CardContainer>
                                  </div>
                                </LinkStyled>
                              </Col>
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
                        Aguarde até que um editor aceite seus projetos
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
                              <Col md={3} key={project.orderId}>
                                <LinkStyled
                                  to={`/meu-pedido/${project.orderId}`}
                                >
                                  <div>
                                    <CardContainer>
                                      <CardTitle>{project.title}</CardTitle>
                                      <CardDescription>
                                        {project.description}
                                      </CardDescription>
                                      <CardSkills>
                                        {project.skills
                                          .split(",")
                                          .map(
                                            (skill: string, index: number) => (
                                              <span key={index}>
                                                {skill.trim()}
                                              </span>
                                            )
                                          )}
                                      </CardSkills>
                                    </CardContainer>
                                  </div>
                                </LinkStyled>
                              </Col>
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
                              <Col md={3} key={project.orderId}>
                                <LinkStyled
                                  to={`/meu-pedido/${project.orderId}`}
                                >
                                  <div>
                                    <CardContainer>
                                      <CardTitle>{project.title}</CardTitle>
                                      <CardDescription>
                                        {project.description}
                                      </CardDescription>
                                      <CardSkills>
                                        {project.skills
                                          .split(",")
                                          .map(
                                            (skill: string, index: number) => (
                                              <span key={index}>
                                                {skill.trim()}
                                              </span>
                                            )
                                          )}
                                      </CardSkills>
                                    </CardContainer>
                                  </div>
                                </LinkStyled>
                              </Col>
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

export default Videos;
