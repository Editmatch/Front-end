import { useEffect, useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../../ui/components/dashboard-header';
import styled from 'styled-components';
import axios from 'axios';
import { useEnvironment } from '../../../data/contexts/enviromentContext';
import { Link } from 'react-router-dom';

function Videos() {

    const { apiUrl } = useEnvironment();
    const CarouselContainer = styled.div`
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
    `;

    const [inProgressOrders, setInProgressOrders] = useState([]);   
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);

    const userId = sessionStorage.getItem('userId');

    const fetchProjects = () => {
        axios.get(`${apiUrl}/orders/editor/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            if (response.data && response.data.inProgressOrders) {
                const { inProgressOrders, completedOrders, cancelledOrders } = response.data;
                setInProgressOrders(inProgressOrders);
                setCompletedOrders(completedOrders);
                setCancelledOrders(cancelledOrders);
            }
        }).catch((error) => {
            console.log(error);
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


    const inProgressChunks = inProgressOrders ? chunkArray(inProgressOrders, 4) : [];
    const completedChunks = completedOrders ? chunkArray(completedOrders, 4) : [];
    const cancelledChunks = cancelledOrders ? chunkArray(cancelledOrders, 4) : [];

    const CardContainer = styled.div`
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 0px 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 20px;
        transition: transform 0.2s ease-in; /* Corrigido */
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

    return (
        <div>
            {/* <Header /> */}
            <DashboardHeader />
            <div className="container">
                {/* Em Andamento */}
                {inProgressOrders.length > 0 ? (
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h5><b>Projetos em andamento</b></h5>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <Link to="/produtores" className="btn btn-dark">Encontrar novo projeto</Link>
                        </div>
                        <div className="col-md-12 mt-5">
                            <CarouselContainer>
                                <Carousel controls={false}>
                                    {inProgressChunks.map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <Row>
                                                {chunk.map((project) => (
                                                    <Col md={3} key={project.orderId}>
                                                        <LinkStyled to={`/pedidoEditor/${project.orderId}`}>
                                                            <div>
                                                                <CardContainer>
                                                                    <CardTitle>{project.title}</CardTitle>
                                                                    <CardDescription>{project.description}</CardDescription>
                                                                    <CardSkills>
                                                                        {project.skills.split(',').map((skill: string, index: number) => (
                                                                            <span key={index}>{skill.trim()}</span>
                                                                        ))}

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
                        <div className="col-md-6">
                            <h5><b>Projetos em andamento</b></h5>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Nenhum projeto encontrado</h5>
                                    <p className="card-text">Não há projetos disponíveis</p>
                                    <Link to="/produtores" className="btn btn-dark">Encontrar novo projeto</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                }

                {completedOrders.length > 0 ? (
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h5><b>Projetos finalizados</b></h5>
                            <CarouselContainer>
                                <Carousel controls={false}>
                                    {completedChunks.map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <Row>
                                                {chunk.map((project) => (
                                                    <Col md={3} key={project.orderId}>
                                                        <LinkStyled to={`/pedidoEditor/${project.orderId}`}>
                                                            <div>
                                                                <CardContainer>
                                                                    <CardTitle>{project.title}</CardTitle>
                                                                    <CardDescription>{project.description}</CardDescription>
                                                                    <CardSkills>
                                                                        {project.skills.split(',').map((skill: string, index: number) => (
                                                                            <span key={index}>{skill.trim()}</span>
                                                                        ))}

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
                            <h5><b>Projetos finalizados</b></h5>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Nenhum projeto finalizado encontrado</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancelados */}
                {cancelledOrders.length > 0 ? (
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <h5><b>Projetos cancelados</b></h5>
                            <CarouselContainer>
                                <Carousel controls={false}slide={true}>
                                    {cancelledChunks.map((chunk, index) => (
                                        <Carousel.Item key={index}>
                                            <Row>
                                                {chunk.map((project) => (
                                                    <Col md={3} key={project.orderId}>
                                                        <LinkStyled to={`/pedidoEditor/${project.orderId}`}>
                                                            <div>
                                                                <CardContainer>
                                                                    <CardTitle>{project.title}</CardTitle>
                                                                    <CardDescription>{project.description}</CardDescription>
                                                                    <CardSkills>
                                                                        {project.skills.split(',').map((skill: string, index: number) => (
                                                                            <span key={index}>{skill.trim()}</span>
                                                                        ))}

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
                            <h5><b>Projetos cancelados</b></h5>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Nenhum projeto cancelado encontrado</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default Videos;
