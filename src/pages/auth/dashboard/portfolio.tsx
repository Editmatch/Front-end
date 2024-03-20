import styled from "styled-components";
import DashboardHeader from "../../../ui/components/dashboard-header";
import Header from "../../../ui/components/header";
import Avaliacao from "../../../ui/components/stars";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEnvironment } from "../../../data/contexts/enviromentContext";

export default function Portfolio() {

    const {apiUrl} = useEnvironment();

    const navigate = useNavigate();
    const [perfil, setPerfil] = useState();
    const [videos, setVideos] = useState([]);
    const { id } = useParams();

    const LinkStyled = styled(Link)`
        color: #000;
        text-decoration: none;
        margin: 10px;
        border-radius: 5px;
        transition: 0.3s;
        &:hover {
            color: blue;
        }
    `

    useEffect(() => {
        axios
            .get(`${apiUrl}/portfolios/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                console.log(response.data);
                setPerfil(response.data);

                // Processa os links dos vídeos do YouTube
                if(response.data.linkYtVideoId){
                    const videoIds = response.data.linkYtVideoId.map((link: string) => {
                        const match = link.match(/(?:\?v=|\/embed\/|\.be\/)([\w-]{11})/);
                        return match ? match[1] : null;
                    }).filter((videoId: string | null) => videoId !== null);
    
                    setVideos(videoIds);
                }
                
            })
            .catch((error) => {
                console.error('Erro ao carregar o portfolio:', error);
                navigate('/editores');
            });
    }, [id, navigate]);


    const Imagem = styled.img`
        border-radius: 50%;
        width: 250px;
        height: 250px;
        margin: 10px;
    `;

    return (
        <div>
            <Header />
            <DashboardHeader />
            <div className="container">
                    <div className="row mt-3 p-4">
                        <div className="col-md-3">
                            <Imagem src="https://via.placeholder.com/250" alt="" />
                        </div>
                        <div className="col-md-4 mt-5  m-3 ">
                            <h5 className="">Fulano de tal</h5>
                            <span>Editor</span>
                            <div className="row mt-5">
                                <Avaliacao />
                            </div>
                            <div className="row mt-5">
                                <span>
                                    Sou o melhor editor do Brasil, com mais de 10 anos de experiência. Trabalhei com grandes empresas e tenho um portfólio incrível. Contrate-me e veja a diferença!
                                </span>
                            </div>
                        </div>
                        <div className="col-md-3 mt-4 align-end">
                            <LinkStyled to="/chat"><b>Enviar mensagem</b></LinkStyled>
                            <LinkStyled to="/pagamento"><b>Contratar</b></LinkStyled>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="h3">
                            <h3>Videos editados</h3>
                        </div>
                        {sessionStorage.getItem('isEditor') === 'true' &&
                            <div className="col-md-12 text-end">
                                <button className="btn btn-dark">Adicionar videos</button>
                            </div>
                        }
                        {videos.length === 0 &&
                            <div className="col-md-12 text-center">
                                <div className="card">
                                <div className="card-body bg-danger text-center">
                                    <h5 className="card-title text-white">Nenhum projeto encontrado</h5>
                                    <p className="card-text text-white">Não há projetos disponíveis</p>
                                </div>
                            </div>
                            </div>
                        }
                        <div className="row">
                            {videos.map(videoId => (
                                <div className="col-md-3" key={videoId}>
                                    <Card style={{ width: '18rem' }}>
                                        <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
                                            <Card.Img variant="top" src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} />
                                        </a>
                                        <Card.Body>
                                            <Card.Title>Video Title</Card.Title>
                                            <Card.Text>
                                                {/* Aqui você pode adicionar uma descrição do vídeo, se desejar */}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body className="text-center">
                                            <Card.Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Assistir</Card.Link>
                                            {/* Aqui está o link de download do vídeo */}
                                            <Card.Link href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Download</Card.Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div >
    )
}
