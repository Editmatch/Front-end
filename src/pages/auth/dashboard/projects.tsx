import { useEffect, useState } from 'react';
import { Modal, Button, Carousel, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../../ui/components/dashboard-header';
import Header from '../../../ui/components/header';
import styled from 'styled-components';
import axios from 'axios';
import Order from '../../../ui/components/order';
import { useEnvironment } from '../../../data/contexts/enviromentContext';

function Projetos() {

    const { apiUrl } = useEnvironment();
    const CarouselContainer = styled.div`
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
    `;

    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const userId = sessionStorage.getItem('userId');

    const fetchProjects = () => {
        axios.get(`${apiUrl}/orders/order-client?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            }
        }).then((response) => {
            setProjects(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchProjects();

        const intervalId = setInterval(() => {
            fetchProjects();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);

    const chunkArray = (arr: any[], chunkSize: number) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const videosChuncks = chunkArray(projects, 4);


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

    const CardImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
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

    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                {projects.length > 0 ? (
                    <>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <h5><b>Projetos de Vídeos</b></h5>
                            </div>

                            <div className="col-md-6 d-flex justify-content-end"> {/* Alteração feita aqui */}
                                <Button onClick={handleModalShow} className="btn btn-dark">Publicar projeto</Button>
                            </div>

                            <div className="col-md-12 mt-5">
                                <CarouselContainer>
                                    <Carousel controls={true}>
                                        {videosChuncks.map((chunk, index) => (
                                            <Carousel.Item key={index}>
                                                <Row>
                                                    {chunk.map((project: any) => (
                                                        <Col md={3} key={project.orderId}>
                                                            <div>
                                                                <CardContainer>
                                                                    <CardTitle>{project.title}</CardTitle>
                                                                    <CardDescription>{project.desc}</CardDescription>
                                                                    <CardSkills>
                                                                        {project.skills.split(',').map((skill: string, index: number) => (
                                                                            <span key={index}>{skill.trim()}</span>
                                                                        ))}
                                                                    </CardSkills>
                                                                </CardContainer>
                                                            </div>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </CarouselContainer>
                            </div>
                        </div>

                    </>
                ) : (
                    <div className="row mt-5">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Nenhum projeto encontrado</h5>
                                    <p className="card-text">Não há projetos disponíveis</p>
                                    <Button onClick={handleModalShow} className="btn btn-dark" >Publicar projeto</Button>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default Projetos;
