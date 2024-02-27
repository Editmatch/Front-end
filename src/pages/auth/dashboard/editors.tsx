import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../../ui/components/dashboard-header';
import Header from '../../../ui/components/header';
import ProjectsCount from '../../../ui/components/projects-count';

function Editores() {
    const editorsMock = [{
        id: 1,
        name: "Editor 1",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 1.00"
    },
    {
        id: 2,
        name: "Editor 2",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 2.00"
    },
    {
        id: 3,
        name: "Editor 3",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 3.00"
    },
    {
        id: 4,
        name: "Editor 4",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 4.00"
    },
    {
        id: 5,
        name: "Editor 5",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 5.00"
    },
    {
        id: 6,
        name: "Editor 6",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 6.00"
    },
    {
        id: 7,
        name: "Editor 7",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 7.00"
    },
    {
        id: 7,
        name: "Editor 7",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 7.00"
    },
    {
        id: 7,
        name: "Editor 7",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 7.00"
    },
    {
        id: 7,
        name: "Editor 7",
        ability: "Editor de Vídeo",
        imageUrl: "https://via.placeholder.com/10",
        price: "R$ 7.00"
    }];
    // Função para dividir os editores em grupos de 5
    const chunkArray = (arr:any, chunkSize:any) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const editorsChunks = chunkArray(editorsMock, 4);

    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                <ProjectsCount />
                <div className="row">
                    <p className='font-weight-bold'>Destaques</p>
                    <div className="col-md-12">
                        <Carousel wrap>
                            {editorsChunks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((editor:any) => (
                                            <Col md={3} key={editor.id}>
                                               <div className="card">
                                                    <img src={editor.imageUrl} alt={editor.name} />
                                                    <h3>{editor.name}</h3>
                                                    <p>{editor.ability}</p>
                                                    <p>{editor.price}</p>
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
                    <p className='font-weight-bold'>Destaques</p>
                    <div className="col-md-12">
                        <Carousel wrap>
                            {editorsChunks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((editor:any) => (
                                            <Col md={3} key={editor.id}>
                                               <div className="card">
                                                    <img src={editor.imageUrl} alt={editor.name} />
                                                    <h3>{editor.name}</h3>
                                                    <p>{editor.ability}</p>
                                                    <p>{editor.price}</p>
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
                    <p className='font-weight-bold'>Destaques</p>
                    <div className="col-md-12">
                        <Carousel wrap>
                            {editorsChunks.map((chunk, index) => (
                                <Carousel.Item key={index}>
                                    <Row>
                                        {chunk.map((editor:any) => (
                                            <Col md={3} key={editor.id}>
                                               <div className="card">
                                                    <img src={editor.imageUrl} alt={editor.name} />
                                                    <h3>{editor.name}</h3>
                                                    <p>{editor.ability}</p>
                                                    <p>{editor.price}</p>
                                               </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editores;
