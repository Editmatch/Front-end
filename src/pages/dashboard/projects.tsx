import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../ui/components/dashboard-header';
import Header from '../../ui/components/header';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCard from '../../ui/components/video-card';
import ProjectsCount from '../../ui/components/projects-count';

const CarouselContainer = styled.div`
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

const VideoWrapper = styled.div`
    flex: 0 0 auto;
    margin-right: 10px;
`;

function Projetos() {
    const mock_projects = [
        {
            id: 1,
            title: "Video 1",
            price: "R$ 1.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 2,
            title: "Video 2",
            price: "R$ 2.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 3,
            title: "Video 3",
            price: "R$ 3.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 4,
            title: "Video 4",
            price: "R$ 4.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 5,
            title: "Video 5",
            price: "R$ 5.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 6,
            title: "Video 6",
            price: "R$ 6.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        },
        {
            id: 7,
            title: "Video 7",
            price: "R$ 7.00",
            imageUrl: "https://via.placeholder.com/10"
        }
    ];

    const chunkArray = (arr:any, chunkSize:any) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };
    
    const videosChuncks = chunkArray(mock_projects, 4);
    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                <ProjectsCount />

                <div className="row">
                    <p><b>Projetos de Vídeos</b></p>
                    <div className="col-md-12">
                    <Carousel wrap>
                            {videosChuncks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((project:any) => (
                                            <Col md={3} key={project.id}>
                                               <div className="card">
                                                    <img src={project.imageUrl} alt={project.title} />
                                                    <h3>{project.title}</h3>
                                                    <p>{project.price}</p>
                                               </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className="row mt-5">
                    <p><b>Em andamento</b></p>
                    <div className="col-md-12">
                    <Carousel wrap>
                            {videosChuncks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((project:any) => (
                                            <Col md={3} key={project.id}>
                                               <div className="card">
                                                    <img src={project.imageUrl} alt={project.title} />
                                                    <h3>{project.title}</h3>
                                                    <p>{project.price}</p>
                                               </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div className="row mt-5">
                    <p><b>Concluídos</b></p>
                    <div className="col-md-12">
                    <Carousel wrap>
                            {videosChuncks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((project:any) => (
                                            <Col md={3} key={project.id}>
                                               <div className="card">
                                                    <img src={project.imageUrl} alt={project.title} />
                                                    <h3>{project.title}</h3>
                                                    <p>{project.price}</p>
                                               </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>

                {/* Repita o mesmo padrão para os outros carrosséis ("Em andamento" e "Concluídos") */}
            </div>
        </div>
    );
}

export default Projetos;
