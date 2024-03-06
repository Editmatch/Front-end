import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import DashboardHeader from '../../../ui/components/dashboard-header';
import Header from '../../../ui/components/header';
import ProjectsCount from '../../../ui/components/projects-count';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Editores() {

    const [editors, setEditors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/usuarios/listar-editor",
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
                        'Content-Type': 'application/json',
                    }
                })

            .then((res: any) => {
                console.log(res.data);
                setEditors(res.data);
            })
            .catch((err: Error) => {
                console.log(err);
            });
    }, []);

    const chunkArray = (arr: any, chunkSize: any) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const editorsChunks = chunkArray(editors, 4);


    const CardLink = styled(Link)`
        text-decoration: none;
        color: inherit;
    `;

    const CardContainer = styled.div`
    width: 280px; /* Alteração na largura do card */
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 25px;
    margin: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: 0.3s;
    &:hover {
        transform: scale(1.05);
        border: 1px solid blue;
    }
`;

    const defaultImage = 'https://static.vecteezy.com/system/resources/previews/007/409/979/original/people-icon-design-avatar-icon-person-icons-people-icons-are-set-in-trendy-flat-style-user-icon-set-vector.jpg'

    const ProfileImage = styled.img`
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 10px;
    `;

    const Name = styled.h3`
    margin-bottom: 5px;
    color: #333;
`;

    const Skill = styled.p`
    margin: 5px 0;
    color: #666;
`;



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
                                        {chunk.map((editor: any) => (
                                            <Col md={3} key={editor.id}>
                                                <CardLink to={`/portfolio/${editor.id}`}>
                                                    <CardContainer>
                                                        <ProfileImage src={editor.photoProfileData ? `data:image/jpeg;base64,${editor.photoProfileData}` : defaultImage} />
                                                        <Name>{editor.nome}</Name>
                                                        <Skill>
                                                            {editor.habilidades > 0 ? (
                                                                <ul>
                                                                    {editor.habilidades.map((habilidade: any, index: any) => (
                                                                        <li key={index}>{habilidade}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                'Nenhuma'
                                                            )}
                                                        </Skill>
                                                        <Skill>R$ {editor.valorHora}</Skill>
                                                    </CardContainer>
                                                </CardLink>
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
                                        {chunk.map((editor: any) => (
                                            <Col md={3} key={editor.id}>
                                               <CardLink to={`/portfolio/${editor.id}`}>
                                                    <CardContainer>
                                                        <ProfileImage src={editor.photoProfileData ? `data:image/jpeg;base64,${editor.photoProfileData}` : defaultImage} />
                                                        <Name>{editor.nome}</Name>
                                                        <Skill>
                                                            {editor.habilidades > 0 ? (
                                                                <ul>
                                                                    {editor.habilidades.map((habilidade: any, index: any) => (
                                                                        <li key={index}>{habilidade}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                'Nenhuma'
                                                            )}
                                                        </Skill>
                                                        <Skill>R$ {editor.valorHora}</Skill>
                                                    </CardContainer>
                                                </CardLink>
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
                                        {chunk.map((editor: any) => (
                                            <Col md={3} key={editor.id}>
                                                <CardLink to={`/portfolio/${editor.id}`}>
                                                    <CardContainer>
                                                        <ProfileImage src={editor.photoProfileData ? `data:image/jpeg;base64,${editor.photoProfileData}` : defaultImage} />
                                                        <Name>{editor.nome}</Name>
                                                        <Skill>
                                                            {editor.habilidades > 0 ? (
                                                                <ul>
                                                                    {editor.habilidades.map((habilidade: any, index: any) => (
                                                                        <li key={index}>{habilidade}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                'Nenhuma'
                                                            )}
                                                        </Skill>
                                                        <Skill>R$ {editor.valorHora}</Skill>
                                                    </CardContainer>
                                                </CardLink>
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
